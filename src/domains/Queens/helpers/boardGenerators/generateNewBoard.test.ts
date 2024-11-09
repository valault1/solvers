import { pollEventLoop } from "domains/Queens/constants/constants";
import { RNG } from "domains/Queens/helpers/randomNum";
import {
  boardsAreEqual,
  checkForVictory,
  copyBoard,
  narrowDownBoard,
  solveBoardAndReportDifficulty,
} from "domains/Queens/helpers/solver/solveBoard";
import { Board } from "domains/Queens/sharedTypes";
import { clearAllTokens } from "domains/Queens/components/PlayableBoard";
import { generateBoardFromSeedStatic } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { SIDE_LENGTH_OPTIONS, getSeeds } from "domains/Queens/boards/seeds";

let timerTime = new Date().getTime();
const setTimerTime = (newTime: number) => {
  timerTime = newTime;
};

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

export const generateBoardAndTestForDeterminism = async ({
  startingSeed,
  sideLength,
  generatorFunction,
}: {
  startingSeed?: number;
  sideLength?: number;
  // if passed in, we use this generator function. Otherwise, we use  generateBoardFromSeedStatic
  generatorFunction?: (sideLength: number, seed: number) => Board;
} = {}) => {
  const rng = new RNG();
  let hasFoundDeterministicBoard = false;
  const MAX_ATTEMPTS = 10000;
  let isDeterministic, board, boardSeed;
  let counter = 0;

  while (!hasFoundDeterministicBoard && counter < MAX_ATTEMPTS) {
    await pollEventLoop(timerTime, setTimerTime);

    boardSeed =
      startingSeed !== undefined
        ? counter + startingSeed
        : rng.getRandomNewSeed();
    board = generatorFunction
      ? generatorFunction(sideLength ?? 10, boardSeed)
      : generateBoardFromSeedStatic(sideLength ?? 10, boardSeed);
    isDeterministic = solveBoardDeterministically(board);
    hasFoundDeterministicBoard = isDeterministic;
    counter++;
  }
  clearAllTokens(board);
  return { board, isDeterministic, seed: boardSeed, boardsGenerated: counter };
};

export const getTextToCopy = (arr: number[]) => {
  return `export const DETERMINISTIC_SEEDS: number[] = [${[...arr].join(
    ", "
  )}];`;
};

export const generateDeterministicSeeds = async (numToGenerate = 100000) => {
  let result: number[] = [];
  while (result.length < numToGenerate) {
    const { seed, isDeterministic } = await generateBoardAndTestForDeterminism({
      sideLength: 10,
    });
    if (isDeterministic) {
      result.push(seed);
      console.log(getTextToCopy(result));
      console.log(`Found ${result.length} seeds`);
    }
  }
  return result;
};

export const allSeeds = SIDE_LENGTH_OPTIONS.reduce((accum, sideLength) => {
  accum[sideLength] = getSeeds(sideLength);
  return accum;
}, {} as any);

export const getBoardDifficulty = solveBoardAndReportDifficulty;

export default generateBoardAndTestForDeterminism;
