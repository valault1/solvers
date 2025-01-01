// we want to categorize the boards by hardness
import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import allSeedsByDifficulty from "./allSeedsByDifficulty";

import fs from "fs";
import { RNG } from "./randomNum";
const solveBoardDeterministically =
  //@ts-ignore
  boardGenerator.solveBoardDeterministically;

const generateBoardAndTestForDeterminism =
  //@ts-ignore
  boardGenerator.generateBoardAndTestForDeterminism;

const allSeeds =
  //@ts-ignore
  boardGenerator.allSeeds;

const getBoardDifficulty =
  //@ts-ignore
  boardGenerator.getBoardDifficulty;

const BOARD_SIZE_OPTIONS = [12]; //Object.keys(allSeeds).map((key) => parseInt(key));
const TARGET_DIFFICULT_SEEDS = Infinity;
const TARGET_DIFFICULTY = 17;

const allCategorizedSeeds: Record<number, any> = {};

const writeToFile = () => {
  const content = `export const allSeedsByDifficulty = ${JSON.stringify(
    allCategorizedSeeds
  )}`;
  try {
    fs.writeFileSync("allSeedsByDifficultyV2.ts", content);
    console.log("Wrote to file!");
  } catch (err) {
    console.log(
      "An error occurred while writing the seeds to file: " + err.message
    );
  }
};
const getDifficulties = async () => {
  for (const boardSize of BOARD_SIZE_OPTIONS) {
    const seeds: number[] = allSeeds[boardSize];

    let seedsByDifficulty: {
      seed: number;
      difficulty: number;
      index: number;
    }[] = [];
    for (let i = 0; i < seeds.length; i++) {
      if (i % 10000 === 0) {
        console.log("solving board " + i);
        seedsByDifficulty.sort((a, b) => a.difficulty - b.difficulty);
        const seedsInRandomOrder = new RNG().getElementsInArrayInRandomOrder(
          seedsByDifficulty.map((s) => ({ seed: s.seed, size: 12 }))
        );

        allCategorizedSeeds[boardSize] = {
          seeds: seedsInRandomOrder,
          seedsByDifficulty,
        };
        writeToFile();
        console.log(`currently found ${seedsByDifficulty.length} seeds`);
      }
      const seed = seeds[i];
      const { board, isDeterministic } =
        await generateBoardAndTestForDeterminism({
          startingSeed: seed,
          sideLength: Number(boardSize),
        });
      if (!isDeterministic) console.log("FAILED BOARD - " + seed);

      const difficulty = getBoardDifficulty(board);
      if (difficulty >= TARGET_DIFFICULTY) {
        seedsByDifficulty.push({ seed, difficulty, index: i });
      }
      if (seedsByDifficulty.length > TARGET_DIFFICULT_SEEDS) break;
    }

    console.log("finished generating boards for size " + boardSize);
  }
  writeToFile();
};

getDifficulties();
