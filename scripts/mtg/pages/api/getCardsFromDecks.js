import { getCardsFromDeckUrl } from "../../backend/moxfield";

// returns the current levelPacks as defined by the SeedsManager
export default async function handler(req, res) {
  const { decks: rawDeckIds } = req.query;
  const deckIds = rawDeckIds.split(",");
  const allCards = await getCardsFromDeckUrl(deckIds);
  await res.status(200).json({ decks: allCards });
}
