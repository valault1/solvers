import { getStocks } from "../../backend/shops";

// returns the stock of each inputted card
export default async function handler(req, res) {
  // quantity needs to be a string
  const body = JSON.parse(req.body);
  const parsedCards = body.cards;

  console.log({ parsedCards });

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

  const storeName = body.storeName;

  const result = await getStocks(uniqueCardsFormatted, storeName);
  await res.status(200).json({ ...result, storeName });
}
