import express, { Request, Response } from "express";
import cors from "cors";
import { promises as fs } from "fs";

import { getDecks } from "./services/getDecks";
import { checkStock } from "./services/checkStock";
import { getTasks } from "./services/getTasks";
import { runTest } from "./services/runTest";

const server = express();

var prod_whitelist = [
  "https://solvers.valault.com",
  "https://solvers.valault.com/",
  "https://web-wordle-solver-ca3be.web.app/",
  "https://web-wordle-solver-ca3be.web.app",
];

var corsOptions = {
  origin: function (origin: any, callback: any) {
    return callback(null, true);
    if (prod_whitelist.indexOf(origin) !== -1) {
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
    const address = app.address() as any;
    const ip = address.address === "::" ? "localhost" : address.address;
    console.log(`server has started listening on ${ip}:${address.port}`);
  });
};

// these endpoints should only serve on local;
if (process.env.NODE_ENV !== "production") {
  server.get("/getTasks", async (req: Request, res: Response) => {
    const result = getTasks();
    res.send(result);
  });
}

server.get("/getDecks", async (req: Request, res: Response) => {
  const { username } = req.query;
  const decks = await getDecks(username as string);
  res.send({ decks });
});

server.get("/test", async (req, res) => {
  const { numOperations } = req.query;
  const asNum = Number(numOperations);
  const num = isNaN(asNum) ? 100 : asNum;

  console.log(`got test for ${num} operations`);

  const result = await runTest(num);

  res.send(result);
});

server.get("/getCardsFromDecks", async (req, res) => {
  const { decks: rawDeckIds } = req.query;
  const deckIds = (rawDeckIds as any).split(",");
  const allCards = await getCardsFromDeckUrl(deckIds);
  res.send({ decks: allCards });
});

server.post("/checkStock", async (req, res) => {
  // quantity needs to be a string
  const body = req.body;
  const parsedCards = body.cards;
  const uniqueCards = Object.values(
    parsedCards.reduce((acc: Record<string, any>, { card, quantity }: any) => {
      acc[card] = acc[card] || { card, quantity: 0 };
      acc[card].quantity += Number(quantity);
      return acc;
    }, {})
  );

  const uniqueCardsFormatted = uniqueCards.map((c: any) => ({
    card: c.card,
    quantity: c.quantity.toString(),
  }));

  const { storeName } = body;

  const result = await checkStock(uniqueCardsFormatted, storeName);
  res.send({ ...result, storeName });
});

startServer();
function getCardsFromDeckUrl(deckIds: any) {
  throw new Error("Function not implemented.");
}
