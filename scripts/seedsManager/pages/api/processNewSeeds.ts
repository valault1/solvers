import { processNewSeeds } from "../../backend/readNewSeeds";

export default async function handler(req, res) {
  try {
    const seeds = await processNewSeeds();

    await res.status(200).json({ seeds });
  } catch (e) {
    console.log("ERROR");
    await res.status(500).json({ error: e });
  }
}
