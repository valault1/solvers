import express, { Request, Response } from 'express';
import cors from "cors";
import { getTasks } from "./services/getTasks.js";

const PORT_NUMBER = 1214

const server = express();
server.use(cors());
server.use(express.json());

server.use(cors());
server.use(express.json());
const startServer = () => {
  const app = server.listen(PORT_NUMBER, function () {
    const appAddress = app.address() as any;
    const ip = appAddress.address === "::" ? "localhost" : appAddress.address;
    console.log(`server has started listening on ${ip}:${appAddress?.port ?? ""}`);
  });
};

server.get("/getTasks", async (req: Request, res: Response) => {
  const tasks = await getTasks();
  res.send({ tasks });
});

server.get("/test", async (req, res) => {
  res.send({ result: "hello world!" });
});

// server.get("/getCardsFromDecks", async (req, res) => {
//   const { decks: rawDeckIds } = req.query;
//   const deckIds = rawDeckIds.split(",");
//   const allCards = await getCardsFromDeckUrl(deckIds);
//   res.send({ decks: allCards });
// });

// server.post("/checkStock", async (req, res) => {
//   // quantity needs to be a string
//   const body = req.body;
//   const parsedCards = body.cards;
//   const uniqueCards = Object.values(
//     parsedCards.reduce((acc, { card, quantity }) => {
//       acc[card] = acc[card] || { card, quantity: 0 };
//       acc[card].quantity += Number(quantity);
//       return acc;
//     }, {})
//   );

//   const uniqueCardsFormatted = uniqueCards.map((c) => ({
//     card: c.card,
//     quantity: c.quantity.toString(),
//   }));

//   const { storeName } = body;

//   const result = await checkStock(uniqueCardsFormatted, storeName);
//   res.send({ ...result, storeName });
// });

startServer();
