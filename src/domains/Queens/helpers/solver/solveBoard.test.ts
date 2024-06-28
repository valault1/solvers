import { getSeeds } from "domains/Queens/boards/seeds";
import { solveBoardDeterministically } from "domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import { generateBoardFromSeedV1 } from "domains/Queens/helpers/boardGenerators/generateNewBoardV1-static";

const SIZES_TO_TEST = [8, 9, 10, 11, 12];

const run = () => {
  let timeSpentSolving = 0;
  let timeSpentGenerating = 0;
  let failedBoards: { size: number; seedIndex: number }[] = [];
  let maxSolveTime = 0;
  let boardsSolved = 0;
  SIZES_TO_TEST.forEach((size) => {
    const seeds = getSeeds(size);
    seeds.forEach((seed, i) => {
      let startTime = new Date().getTime();
      //const board = generateBoardFromSeed(size, seed);
      const board = generateBoardFromSeedV1(size, seed);
      timeSpentGenerating += new Date().getTime() - startTime;
      startTime = new Date().getTime();
      const didSolveBoard = solveBoardDeterministically(board);
      const solveTime = new Date().getTime() - startTime;
      if (solveTime > maxSolveTime) maxSolveTime = solveTime;
      timeSpentSolving += solveTime;
      if (!didSolveBoard) {
        failedBoards.push({ size, seedIndex: i });
      } else boardsSolved++;
    });
  });

  console.log("total time spent solving: ", timeSpentSolving);
  console.log("total time spent generating: ", timeSpentGenerating);
  console.log("boards solved: ", boardsSolved);
  //console.log("max solve  time: ", maxSolveTime);
  if (failedBoards.length > 0) {
    console.log("FAILED SOME BOARDS");
    console.log(failedBoards);
  } else {
    console.log("Successfully solved all boards!");
  }
};

run();
