// we want to categorize the boards by hardness
import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import fs from "fs";

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

const BOARD_SIZE_OPTIONS = Object.keys(allSeeds).map((key) => parseInt(key));

const getDifficulties = async () => {
  for (const boardSize of BOARD_SIZE_OPTIONS) {
    const seeds: number[] = allSeeds[boardSize];

    let seedsByDifficulty: {
      seed: number;
      difficulty: number;
      index: number;
    }[] = [];
    for (let i = 0; i < seeds.length; i++) {
      if (i % 10000 === 0) console.log("solving board " + i);
      const seed = seeds[i];
      const { board, isDeterministic } =
        await generateBoardAndTestForDeterminism({
          startingSeed: seed,
          sideLength: Number(boardSize),
        });

      const difficulty = getBoardDifficulty(board);
      seedsByDifficulty.push({ seed, difficulty, index: i });
    }
    seedsByDifficulty.sort((a, b) => a.difficulty - b.difficulty);
    allSeeds[boardSize] = { seeds, seedsByDifficulty };

    console.log("finished generating boards for size " + boardSize);
  }
  const content = `export const allSeedsByDifficulty = ${JSON.stringify(
    allSeeds
  )}`;
  try {
    fs.writeFileSync(
      "../src/domains/Queens/boards/allSeedsByDifficulty.ts",
      content
    );
    console.log("Wrote to file!");
  } catch (err) {
    console.log(
      "An error occurred while writing the seeds to file: " + err.message
    );
  }
};

getDifficulties();
