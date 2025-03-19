import express from "express";
import cors from "cors";
import { getDecks } from "./services/getDecks.js";
import { getCardsFromDeckUrl } from "./services/getCardsFromDeckUrl.js";
import { checkStock } from "./services/checkStock.js";

const server = express();

var whitelist = [
  "https://solvers.valault.com",
  "https://solvers.valault.com/",
  "https://web-wordle-solver-ca3be.web.app/",
  "https://web-wordle-solver-ca3be.web.app",
  "http://localhost:3007",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());
const startServer = () => {
  const app = server.listen(1213, function () {
    const address = app.address();
    const ip = address.address === "::" ? "localhost" : address.address;
    console.log(`server has started listening on ${ip}:${address.port}`);
  });
};

server.get("/getDecks", async (req, res) => {
  const { username } = req.query;
  const decks = await getDecks(username, res);
  res.send({ decks });
});

server.get("/test", async (req, res) => {
  res.send({ result: "hello world!" });
});

server.get("/getCardsFromDecks", async (req, res) => {
  const { decks: rawDeckIds } = req.query;
  const deckIds = rawDeckIds.split(",");
  const allCards = await getCardsFromDeckUrl(deckIds);
  res.send({ decks: allCards });
});

server.post("/checkStock", async (req, res) => {
  // quantity needs to be a string
  const body = req.body;
  const parsedCards = body.cards;
  const uniqueCards = Object.values(
    parsedCards.reduce((acc, { card, quantity }) => {
      acc[card] = acc[card] || { card, quantity: 0 };
      acc[card].quantity += Number(quantity);
      return acc;
    }, {})
  );

  const uniqueCardsFormatted = uniqueCards.map((c) => ({
    card: c.card,
    quantity: c.quantity.toString(),
  }));

  const { storeName } = body;

  const result = await checkStock(uniqueCardsFormatted, storeName);
  res.send({ ...result, storeName });
});

export default startServer;
