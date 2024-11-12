import { saveSeeds } from "../../backend/saveSeeds";
import { promises as fs } from "fs";
import { currentAppSeedsPath } from "../../backend/readNewSeeds";

export default async function handler(req, res) {
  try {
    const { mainPackSeeds } = JSON.parse(req.body);

    const content = `export const allSeeds = ${JSON.stringify(mainPackSeeds)}`;
    //console.log({ currentAppSeedsPath, content });
    await fs.writeFile(currentAppSeedsPath, content);

    await res.status(200).json({});
  } catch (e) {
    console.log("ERROR");
    console.log({ e });
    await res.status(500).json({ error: e });
  }
}
