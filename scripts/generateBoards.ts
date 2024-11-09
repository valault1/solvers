import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import { Seeds } from "./Seeds";
import { Stopwatch } from "./Stopwatch";
import { getConfig } from "./getConfig";
import { readSeedsFromFile } from "./saveSeeds";

const generateBoardAndTestForDeterminism =
  //@ts-ignore
  boardGenerator.generateBoardAndTestForDeterminism;

const DEFAULT_SIDE_LENGTHS = [8, 9, 10, 11, 12, 13];
const DEFAULT_TARGET_SEEDS = 100;
const DEFAULT_INTERVAL_TO_WRITE_TO_FILE_SECONDS = 10;

const { TARGETS, BOARD_SIDE_LENGTHS } = getConfig({
  DEFAULT_SIDE_LENGTHS,
  DEFAULT_TARGET_SEEDS,
});

const INTERVAL_TO_WRITE_TO_FILE_SECONDS =
  BOARD_SIDE_LENGTHS.length > 1 ? 0 : DEFAULT_INTERVAL_TO_WRITE_TO_FILE_SECONDS;

const SEEDS: Seeds[] = BOARD_SIDE_LENGTHS.map((boardSize) => {
  return readSeedsFromFile(boardSize);
});

console.log(`Starting with these seeds: `);
console.log({ SEEDS });

const generateDeterministicSeeds = async (numToGenerate = 1000000) => {
  let newSeedsFound = 0;
  let hasReachedAllTargets = false;
  const fileWriteTimer = new Stopwatch();

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
      const seedAttemptTimer = new Stopwatch();
      const { seed, isDeterministic, boardsGenerated } =
        await generateBoardAndTestForDeterminism({
          sideLength: length,
          startingSeed: seeds.getNextSeed(),
        });
      seedAttemptTimer.stopTimer();
      seeds.addSeedAttemp({
        seed: isDeterministic ? seed : undefined,
        timeTakenSeconds: seedAttemptTimer.getSeconds(),
        boardsGenerated,
      });
      seeds.lastSeedTried = seed;

      if (!isDeterministic) {
        console.log(
          "10,000 attempts made; no board found yet, so moving on for now."
        );
      } else console.log(`Found good seed! used ${boardsGenerated} attempts`);
      console.log(`time taken: ${seedAttemptTimer.getSeconds()} seconds`);
      console.log(`new seeds: ${seeds.newSeeds()}`);
      console.log(`Total seeds: ${seeds.seeds.length}`);
      if (fileWriteTimer.getSeconds() > INTERVAL_TO_WRITE_TO_FILE_SECONDS) {
        fileWriteTimer.reset();
        seeds.save();
      }

      console.log("\n");
    }
    hasReachedAllTargets = targetsReached === BOARD_SIDE_LENGTHS.length;
  }
  if (hasReachedAllTargets) {
    console.log("Reached all targets! stopping there.");
    SEEDS.forEach((seeds) => seeds.save());
  }

  return newSeedsFound;
};

//timeBoardGeneration();
generateDeterministicSeeds();

// const t = new Stopwatch();
// var deflated = zlib.deflateSync(SEEDS[0].seeds.toString()).toString("base64");

// console.log(t.getSeconds());
// var inflated = zlib.inflateSync(Buffer.from(deflated, "base64")).toString();
// console.log(t.getSeconds());

// console.log({
//   inflated: inflated.length,
//   deflated: deflated.length,
// });
// console.log(`Max seed: ${Math.max(...SEEDS[0].seeds)}`);
// compress the seeds
// technically I could store these as 24 bit numbers - each of them is
/*
  RESULTS
  - space to leave = 4 made a big difference! for size 7,  ~100 boards per seed to 66 boards per seed.
  - 3 is even better
  - Then, I removed the random region sizes at all, and just expanded to fill empty spaces. It worked super fast! But, it was generating regions with 1 square...
  
  Questions
  - Currently, most of the time, the final region counts are not equal to the region sizes. If I fix that, would it help?
  - These are all variations on how to randomly fill a board. What if I fill a board with rules? Like I use the existing positions to determine the new ones?


*/
