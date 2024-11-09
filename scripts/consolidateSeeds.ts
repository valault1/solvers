// Ok, we have a ton of seeds. We need to consolidate them and have a way to add them to different packs and stuff.
import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import fs from "fs";

const allSeeds =
  //@ts-ignore
  boardGenerator.allSeeds;

const filePath = "./allSeeds.ts";

allSeeds["12"] = allSeeds["12"].slice(0, 500);

const content = `export const allSeeds = ${JSON.stringify(allSeeds)}`;
fs.writeFileSync(filePath, content);
