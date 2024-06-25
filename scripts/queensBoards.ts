const { generateBoardAndTestForDeterminism } = require("./index");
const fs = require("fs");

const NUMBER_SEEDS_TO_GENERATE = 100;
const BOARD_SIDE_LENGTHS = [8, 9, 10, 11, 12, 13]; //12, 13, 14, 15, 16, 17, 18, 19, 20];
const TARGETS = BOARD_SIDE_LENGTHS.map(() => 100);

const toNum = (input: string) => {
  let resultChars: string[] = [];
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i).match(/\d/)) {
      resultChars.push(input[i]);
    }
  }
  return Number(resultChars.join(""));
};

const getPreExistingSeeds = (filePath: string) => {
  try {
    const fileInput = fs.readFileSync(filePath, "utf8");
    const seedStrings = fileInput.split("]")[0].split("[")[1].trim().split(",");
    if (seedStrings[seedStrings.length - 1] === "")
      seedStrings.splice(seedStrings.length - 1, 1);
    const seedNums = seedStrings.map((s: string) => toNum(s));
    return seedNums;
  } catch (e) {
    console.log(
      `Couldn't read in existing seeds for filepath ${filePath}  - starting with no seeds`
    );
    return [];
  }
};

type SeedInfo = {
  filePath: string;
  preExistingSeeds: number[];
  newSeeds: number[];
};
const SEED_OBJECT: { [key: number]: SeedInfo } = BOARD_SIDE_LENGTHS.reduce(
  (accum, length) => {
    const path = `../src/domains/Queens/boards/seeds${length}.v2.ts`;
    accum[length] = {
      filePath: path,
      preExistingSeeds: getPreExistingSeeds(path),
      newSeeds: [],
    };
    return accum;
  },
  {} as { [key: number]: SeedInfo }
);

console.log(`Generating seeds for length: ${BOARD_SIDE_LENGTHS}`);
console.log(`Starting with these seeds: `);
console.log(SEED_OBJECT);

const writeSeedsToFile = (seedObject: SeedInfo, newSeeds: number[]) => {
  const content = `export const seeds = ${JSON.stringify([
    ...seedObject.preExistingSeeds,
    ...newSeeds,
  ])};`;

  try {
    fs.writeFileSync(seedObject.filePath, content);
    console.log("Wrote seeds to file! " + seedObject.filePath);
  } catch (err) {
    console.error(
      `An error occurred while writing the seeds to file: ${err.message}`
    );
  }
};

const generateDeterministicSeeds = async (numToGenerate = 100000) => {
  let newSeedsFound = 0;
  let hasReachedAllTargets = false;
  let startTime = new Date().getTime();
  while (newSeedsFound < numToGenerate && !hasReachedAllTargets) {
    let targetsReached = 0;
    for (let i = 0; i < BOARD_SIDE_LENGTHS.length; i++) {
      const length = BOARD_SIDE_LENGTHS[i];
      console.log("Searching for seed of size " + length);
      const target = TARGETS[i];
      const seedInfo = SEED_OBJECT[length];
      const result = seedInfo.newSeeds;
      const totalNumSeeds = result.length + seedInfo.preExistingSeeds.length;

      if (totalNumSeeds >= target) {
        targetsReached++;
        console.log(`Reached target of ${target} seeds for length ${length}`);
        continue;
      }
      const { seed, isDeterministic } =
        await generateBoardAndTestForDeterminism({
          sideLength: length,
        });
      if (isDeterministic) {
        newSeedsFound++;
        result.push(seed);
        console.log(
          `Found ${result.length} seeds for length ${length}; total seeds: ` +
            // add 1 because this total hasn't been updated for the currently found seed yet
            (totalNumSeeds + 1)
        );
        console.log();
        writeSeedsToFile(seedInfo, result);
        console.log(
          `Time taken to seed: ${(new Date().getTime() - startTime) / 1000} s`
        );
        startTime = new Date().getTime();
      } else {
        i--;
        console.log(
          `Time taken so far: ${(new Date().getTime() - startTime) / 1000} s`
        );
      }
    }
    hasReachedAllTargets = targetsReached === BOARD_SIDE_LENGTHS.length;
  }
  if (hasReachedAllTargets) {
    console.log("Reached all targets! stopping there.");
  }

  return newSeedsFound;
};

generateDeterministicSeeds(NUMBER_SEEDS_TO_GENERATE);
