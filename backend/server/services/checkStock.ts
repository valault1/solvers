// takes in results as the current results and cards as the original request
const addNumRequested = (results, cards) => {
  const dict = cards.reduce((acc, card) => {
    acc[card.card] = card.quantity;
    return acc;
  }, {});

  const newResults = results.map((r) => ({
    ...r,
    numRequested: Number(dict[r.name]),
  }));
  return newResults;
};

// takes in a list of cards like {quantity: "1", card: "Whispersilk Cloak"}
export const getGameGridStock = async (cards) => {
  const response = await fetch(
    "https://portal.binderpos.com/external/shopify/decklist?storeUrl=game-grid-lehi-store.myshopify.com&type=mtg",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json; charset=UTF-8",
        priority: "u=1, i",
        "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://store.gglehi.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify(cards),
      method: "POST",
    }
  );
  const responseObj = await response.json();
  const getQuantities = (cardResult) => {
    const { products } = cardResult;
    const quantities = products.map((p) => ({
      setName: p.setName,
      variation: p.variants[0].title,
      maxQtyAvailable: Number(p.variants[0].quantity),
      price: Number(p.variants[0].price),
    }));
    return quantities;
  };
  let results = responseObj.map((r) => ({
    name: r.searchName,
    ...(r.found === 0 && !r.imageUrl ? { notFound: true } : {}),
    quantities: getQuantities(r),
  }));

  results = [
    ...results.filter((r) => !r.notFound),
    ...results.filter((r) => r.notFound),
  ];

  results = addNumRequested(results, cards);
  return {
    results,
    rawResponse: responseObj,
    responseResults: responseObj.rawResponse?.results,
    responseList: responseObj.rawResponse?.list,
  };
};

export const getCardKingdomStock = async (cards) => {
  const cardData = cards.map((c) => `${c.quantity} ${c.card}`).join("\r\n");
  const response = await fetch("https://www.cardkingdom.com/api/builder", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json;charset=UTF-8",
      priority: "u=1, i",
      "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
      "sec-ch-ua-arch": '"arm"',
      "sec-ch-ua-bitness": '"64"',
      "sec-ch-ua-full-version": '"132.0.6834.111"',
      "sec-ch-ua-full-version-list":
        '"Not A(Brand";v="8.0.0.0", "Chromium";v="132.0.6834.111"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"macOS"',
      "sec-ch-ua-platform-version": '"14.6.1"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-xsrf-token":
        "eyJpdiI6ImZTTktLcVpzRmN6SmFWNW1JNGxLdXc9PSIsInZhbHVlIjoiUGRYL3hvK3hBaHQwVmNMS0JTYVRxM1UwSXgxT3hVMnRWd1N1V1VQVUU5VHhKcW9kaGlObkxiOXJ1Um1aYUplWGR2dy9uWTRNTTVPQ3pYbUd5NnV6M3U0MDltODlwcWI5Zy9EOENyZGYzZHVtU3lYZVZZU05oSGJ6aXpJa014RnoiLCJtYWMiOiI3ZTYxMDEzMjg3NDU2YTFjMWY5ODAzNWE2ODY4MGE5YjhkZGJkN2JkNzRhMjdkYWI0ZmVkM2U0OTFkNDViZTE4IiwidGFnIjoiIn0=",
      Referer: "https://www.cardkingdom.com/builder",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify({
      cardData,
      submit: 1,
      // autofill lowest price
      autofill_lp: "1",
      // acceptable conditions: Near Mint, EX (light play), VG (moderate play), G (heavy play)
      NM: "1",
      EX: "1",
      VG: "1",
      G: "1",
    }),
    method: "POST",
  });
  let responseObj = {};
  try {
    responseObj = await response.json();
  } catch (e) {
    console.log("ERROR on card: ");
    console.log({ cards, e, response });
  }
  const getQuantities = (cardResult) => {
    // each result is an array of editions, each with style_qty
    const variations = cardResult.map((r) => ({
      style_qty: r.style_qty,
      name: r.edition.name,
      variation: r.variation,
    }));
    let quantities = variations.flatMap((v) =>
      v.style_qty.map((s) => ({
        setName: v.name,
        variation: v.variation,
        maxQtyAvailable: Number(s.maxQtyAvailable),
        price: Number(s.price),
      }))
    );
    quantities = quantities.filter((q) => q.maxQtyAvailable > 0);
    quantities.sort((a, b) => Number(a.price) - Number(b.price));
    return quantities;
  };

  const foundCards = responseObj.results.map((r, idx) => ({
    // this logic looks strange, but we have to do this because the title returned
    // has to match the name we provided. Occasionally, like with Lim-Dûl's Vault,
    // the name returned of the card is different (Lim-Dul's Vault),
    // and it doesn't show in our list because it doesn't match the name we provided.
    name: responseObj.list[idx].title,
    quantities: getQuantities(r),
  }));
  const notFoundCards = responseObj.not_found
    .map((n) => {
      // some cards in this not_found list are... actually found...
      // if so, don't add them again
      const cardIsAlreadyFound = !!foundCards.find((f) => f.name === n);
      return cardIsAlreadyFound
        ? undefined
        : {
            name: n,
            notFound: true,
            quantities: [],
          };
    })
    .filter((a) => !!a);

  let results = [...foundCards, ...notFoundCards];

  results = addNumRequested(results, cards);

  // responseObj has:
  // list - the requested cards
  // results - lists of editions, each edition having .style_qty with 4 options. each option has .maxQtyAvailable and .price.
  // not_found - cards that were not found
  return { results, rawResponse: responseObj };
};

// calls getCardKingdomStock in parallel with one card each
export const getCardKingdomStockParallel = async (cards, numChunks = 12) => {
  console.log("running in parallel");

  const chunkSize = Math.ceil(cards.length / numChunks);
  const chunks = Array.from({ length: numChunks }, (_, i) =>
    cards.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  const promises = chunks.map((c) => getCardKingdomStock(c));
  const resolvedPromises = await Promise.all(promises);

  const results = resolvedPromises.reduce((accum, p) => {
    accum.push(...p.results);
    return accum;
  }, []);

  resolvedPromises.forEach((r) => {
    const { list, results } = r.rawResponse;
  });

  const response = {
    results,
    rawResponse: resolvedPromises?.[0]?.rawResponse,
  };

  return response;
};

// eslint-disable-next-line import/prefer-default-export
export const checkStock = async (cards, storeName) => {
  let result;
  const startTime = Date.now();
  if (storeName === "Gamegrid") {
    result = await getGameGridStock(cards);
  }
  if (storeName === "Card Kingdom") {
    result = await getCardKingdomStockParallel(cards);
  }

  if (result) {
    result = { ...result, time: Date.now() - startTime };
  }
  return result;
};
