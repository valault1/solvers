import { getDecks } from "../../backend/moxfield";

// returns the current levelPacks as defined by the SeedsManager
export default async function handler(req, res) {
  const { username } = req.query;
  const decks = await getDecks(username);
  await res.status(200).json({ decks });
}
