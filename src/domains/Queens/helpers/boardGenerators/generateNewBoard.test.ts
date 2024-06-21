import {
  checkForVictory,
  clearAllTokens,
} from "domains/Queens/components/PlayableBoard";
import { generateBoardFromSeed } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { RNG } from "domains/Queens/helpers/randomNum";
import { DETERMINISTIC_SEEDS } from "domains/Queens/helpers/seedsToUse";
import {
  boardsAreEqual,
  copyBoard,
  narrowDownBoard,
} from "domains/Queens/helpers/solveBoard";
import { Board } from "domains/Queens/sharedTypes";

export const solveBoardDeterministically = (board: Board) => {
  let boardDidChange = true;
  const COUNTER_MAX = 10000;
  let counter = 0;
  while (boardDidChange && counter < COUNTER_MAX) {
    const oldBoard = copyBoard(board);
    narrowDownBoard(board);
    boardDidChange = !boardsAreEqual(oldBoard, board);
  }
  return checkForVictory(board);
};

export const generateBoardAndTestForDeterminism = (seed?: number) => {
  const rng = new RNG(seed);
  let hasFoundDeterministicBoard = false;
  const MAX_ATTEMPTS = 10000;
  let isDeterministic, board, boardSeed;
  let counter = 0;
  while (!hasFoundDeterministicBoard && counter < MAX_ATTEMPTS) {
    counter++;
    boardSeed = rng.getRandomNewSeed();
    board = generateBoardFromSeed(10, boardSeed);
    isDeterministic = solveBoardDeterministically(board);
    hasFoundDeterministicBoard = isDeterministic;
  }
  console.log(`Attempted ${counter} times`);
  clearAllTokens(board);
  console.log({ boardSeed });
  return { board, isDeterministic, seed: boardSeed };
};

export const getTextToCopy = (arr: number[]) => {
  return `export const DETERMINISTIC_SEEDS: number[] = [${[
    ...DETERMINISTIC_SEEDS,
    ...arr,
  ].join(", ")}];`;
};
export const generateDeterministicSeeds = () => {
  const NUM_TO_GENERATE = 50;
  let result: number[] = [];
  while (result.length < NUM_TO_GENERATE) {
    const { seed, isDeterministic } = generateBoardAndTestForDeterminism();
    if (isDeterministic) {
      result.push(seed);
      console.log(getTextToCopy(result));
      console.log(`Found ${result.length} seeds`);
    }
  }
  return result;
};
