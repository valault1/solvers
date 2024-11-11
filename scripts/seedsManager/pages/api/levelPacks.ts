import { getLevelPacks } from "../../backend/levelPacks";

// returns the current levelPacks as defined by the SeedsManager
export default async function handler(req, res) {
  const levelPacks = await getLevelPacks();
  await res.status(200).json({ levelPacks });
}
