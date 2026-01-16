import { CORS_PROXY_URL } from "domains/MTG/constants";
import { APICardInput } from "../hooks/useCardStocks";

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
export const fetchGameGridStock = async (cards: APICardInput[]) => {
  const response = await fetch(
    `${CORS_PROXY_URL}https://portal.binderpos.com/external/shopify/decklist?storeUrl=game-grid-lehi-store.myshopify.com&type=mtg`,
    {
      body: JSON.stringify(cards),
      headers: {
        "Content-Type": "application/json",
      },
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
