import fs from "fs";
import clipboardy from "clipboardy";

const url =
  "https://portal.binderpos.com/external/shopify/decklist?storeUrl=game-grid-lehi-store.myshopify.com&type=mtg";
// cards will be of format {quantity: string, card: string}
let cards = [];
const filePath = "./cardsToCheck.txt";

const decks = [
  {
    name: "mana ramp deck",
    url: "https://moxfield.com/decks/efLIOcuNuE-COisKPWlv4Q",
  },
  {
    name: "Token Deck (v2)",
    url: "https://moxfield.com/decks/_f33lmqE20eoW-pIyBoI1w",
  },
];

const readFromFile = false;

const writeToFile = (content, filePath = "./output.txt") => {
  try {
    fs.writeFileSync(filePath, content);
    console.log("Wrote to file!");
  } catch (err) {
    console.log(
      "An error occurred while writing the seeds to file: " + err.message
    );
  }
};

let fileContent = "";

const main = async () => {
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
    const cardsSeen = {};
    for (const line of fileContent.split("\n")) {
      if (line) {
        const quantity = line.split(" ")[0];
        const cardName = line
          .split(" ")
          .slice(1)
          .join(" ")
          // add two slashes for every slash. For cards like Repudiate/Replicate
          .split("/")
          .join(" // ");

        if (cardsSeen[cardName]) cardsSeen[cardName] += Number(quantity);
        else cardsSeen[cardName] = Number(quantity);
      }
    }
    Object.keys(cardsSeen).forEach((card) => {
      cards.push({ quantity: cardsSeen[card], card });
    });
    console.log({ cards });
  } catch (e) {
    console.log(`Couldn't read in cards. error: ${e}`);
  }

  let responseObj = {};

  if (readFromFile) {
    console.log("reading from file");
    const data = fs.readFileSync("./output.txt", "utf8");
    responseObj = JSON.parse(data);
  } else {
    console.log("fetching....");
    try {
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
      responseObj = await response.json();

      writeToFile(JSON.stringify(responseObj));
    } catch (error) {
      console.log("there was an error while fetching:");
      console.log(error);
    }
  }

  const foundCards = responseObj.filter((c) => c.found >= 1);
  const cardsWithPrices = foundCards.map((c) => {
    const allPrices = c.products.reduce((acc, p) => {
      return acc.concat(p.variants.map((v) => v.price));
    }, []);
    const price = Math.min(...allPrices);
    return { quantity: c.requested, card: c.searchName, price, allPrices };
  });
  const totalPrice = cardsWithPrices.reduce((acc, c) => {
    return acc + c.price * c.quantity;
  }, 0);
  console.log({ totalPrice });
  const cardsListString = cardsWithPrices
    .map((c) => {
      return `${c.quantity} x ${c.card} = $${c.price * Number(c.quantity)}`;
    })
    .join("\n");
  const cardsListMTGO = cardsWithPrices
    .map((c) => {
      return `${c.quantity} ${c.card}`;
    })
    .join("\n");

  const totalCards = cardsWithPrices.reduce((acc, c) => {
    return acc + c.quantity;
  }, 0);

  console.log(cardsListMTGO);
  console.log(`total price: $${totalPrice}`);
  console.log(`total cards: ${totalCards}`);
  //clipboardy.writeSync(cardsListMTGO);
  console.log(`copied ${cardsWithPrices.length} unique items to clipboard!`);
  // find items not taken to gamegrid
  const notFoundCards = cards.filter(
    (c) =>
      !cardsWithPrices.find((cardWithPrice) => cardWithPrice.card === c.card)
  );

  console.log("items not found at gamegrid: ");
  const notFoundCardsString = notFoundCards
    .map((c) => `${c.quantity} ${c.card}`)
    .join("\n");
  console.log(notFoundCardsString);
  clipboardy.writeSync(notFoundCardsString);
  console.log(
    `pasted the other ${notFoundCards.length} cards to your clipboard. Go to https://www.cardkingdom.com/builder and enter them.`
  );
};

main();
