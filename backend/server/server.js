import express from 'express';
import cors from 'cors';
import { getDecks } from './services/getDecks.js';
import { getCardsFromDeckUrl } from './services/getCardsFromDeckUrl.js';
import { checkStock } from './services/checkStock.js';

const server = express();
server.use(cors());
server.use(express.json());
const startServer = () => {
  const app = server.listen(1213, function () {
    const address = app.address();
    const ip = address.address === '::' ? 'localhost' : address.address;
    console.log(`server has started listening on ${ip}:${address.port}`);
  });
};

server.get('/getDecks', async (req, res) => {
  const { username } = req.query;
  const decks = await getDecks(username, res);
  res.send({ decks });
});

server.get('/getCardsFromDecks', async (req, res) => {
  const { decks: rawDeckIds } = req.query;
  const deckIds = rawDeckIds.split(',');
  const allCards = await getCardsFromDeckUrl(deckIds);
  res.send({ decks: allCards });
});

server.post('/checkStock', async (req, res) => {
  // quantity needs to be a string
  const body = req.body;
  const parsedCards = body.cards;
  const uniqueCards = Object.values(
    parsedCards.reduce((acc, { card, quantity }) => {
      acc[card] = acc[card] || { card, quantity: 0 };
      acc[card].quantity += Number(quantity);
      return acc;
    }, {}),
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
