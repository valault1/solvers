const { generateBoardAndTestForDeterminism } = require("./index");
const fs = require("fs");

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
    const fileInput = fs.readFileSync(FILE_PATH, "utf8");
    const seedStrings = fileInput.split("]")[0].split("[")[1].trim().split(",");
    if (seedStrings[seedStrings.length - 1] === "")
      seedStrings.splice(seedStrings.length - 1, 1);
    const seedNums = seedStrings.map((s: string) => toNum(s));
    console.log(`Starting with these seeds: ${seedNums}`);
    return seedNums;
  } catch (e) {
    console.log("Couldn't read in existing seeds - starting with no seeds");
    return [];
  }
};

const NUMBER_SEEDS_TO_GENERATE = 1000;
const BOARD_SIDE_LENGTH = 11;
const FILE_PATH = `../src/domains/Queens/boards/seeds${BOARD_SIDE_LENGTH}.ts`;
const PRE_EXISTING_SEEDS = getPreExistingSeeds(FILE_PATH);

const writeSeedsToFile = (newSeeds: number[], filePath: string) => {
  const content = `export const seeds = ${JSON.stringify([
    ...PRE_EXISTING_SEEDS,
    ...newSeeds,
  ])};`;

  try {
    fs.writeFileSync(filePath, content);
    console.log("File has been created and content written successfully!");
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
  }
};

const generateDeterministicSeeds = async (
  numToGenerate = 100000,
  sideLength = 10
) => {
  let result: number[] = [];

  while (result.length < numToGenerate) {
    const { seed, isDeterministic } = await generateBoardAndTestForDeterminism({
      sideLength,
    });
    if (isDeterministic) {
      result.push(seed);
      console.log(`Found ${result.length} seeds`);
      console.log();
      writeSeedsToFile(result, FILE_PATH);
    }
  }
  return result;
};

generateDeterministicSeeds(NUMBER_SEEDS_TO_GENERATE, BOARD_SIDE_LENGTH);
