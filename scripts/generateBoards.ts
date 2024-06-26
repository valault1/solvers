import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import { Seeds } from "./Seeds";
import { getConfig } from "./getConfig";
import { readSeedsFromFile } from "./saveSeeds";

const generateBoardAndTestForDeterminism =
  //@ts-ignore
  boardGenerator.generateBoardAndTestForDeterminism;

const DEFAULT_SIDE_LENGTHS = [8, 9, 10, 11, 12, 13];
const DEFAULT_TARGET_SEEDS = 100;

const { TARGETS, BOARD_SIDE_LENGTHS } = getConfig({
  DEFAULT_SIDE_LENGTHS,
  DEFAULT_TARGET_SEEDS,
});

const SEEDS: Seeds[] = BOARD_SIDE_LENGTHS.map((boardSize) => {
  return readSeedsFromFile(boardSize);
});

console.log(`Starting with these seeds: `);
console.log({ SEEDS });

const generateDeterministicSeeds = async (numToGenerate = 1000000) => {
  let newSeedsFound = 0;
  let hasReachedAllTargets = false;

  while (newSeedsFound < numToGenerate && !hasReachedAllTargets) {
    let targetsReached = 0;
    for (let i = 0; i < BOARD_SIDE_LENGTHS.length; i++) {
      const length = BOARD_SIDE_LENGTHS[i];
      console.log("Searching for seed of size " + length);
      const seeds = SEEDS[i];
      const target = TARGETS[i];

      if (seeds.seeds.length >= target) {
        targetsReached++;
        console.log(`Reached target of ${target} seeds for length ${length}`);
        continue;
      }
      const startTime = new Date().getTime();
      const { seed, isDeterministic, boardsGenerated } =
        await generateBoardAndTestForDeterminism({
          sideLength: length,
        });
      const timeTaken = new Date().getTime() - startTime;
      seeds.addSeedAttemp({
        seed: isDeterministic ? seed : undefined,
        timeTakenSeconds: timeTaken / 1000,
        boardsGenerated,
      });
      seeds.save();
      if (!isDeterministic) {
        console.log(
          "10,000 attempts made; no board found yet, so moving on for now."
        );
      } else console.log(`Found good seed! used ${boardsGenerated} attempts`);
      console.log(`time taken: ${timeTaken / 1000} seconds`);
      console.log(`new seeds: ${seeds.newSeeds()}`);
      console.log(`Total seeds: ${seeds.seeds.length}`);

      console.log("\n");
    }
    hasReachedAllTargets = targetsReached === BOARD_SIDE_LENGTHS.length;
  }
  if (hasReachedAllTargets) {
    console.log("Reached all targets! stopping there.");
  }

  return newSeedsFound;
};

generateDeterministicSeeds();
