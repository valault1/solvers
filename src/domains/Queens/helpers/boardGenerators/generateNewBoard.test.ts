import { checkForVictory } from "domains/Queens/hooks/useMakeMove";
import { pollEventLoop } from "domains/Queens/constants/constants";
import { RNG } from "domains/Queens/helpers/randomNum";
import {
  boardsAreEqual,
  copyBoard,
  narrowDownBoard,
} from "domains/Queens/helpers/solver/solveBoard";
import { Board } from "domains/Queens/sharedTypes";
import { clearAllTokens } from "domains/Queens/components/PlayableBoard";
import { generateBoardFromSeedStatic } from "domains/Queens/helpers/boardGenerators/generateNewBoard";

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
  seed,
  sideLength,
}: {
  seed?: number;
  sideLength?: number;
} = {}) => {
  const rng = new RNG(seed);
  let hasFoundDeterministicBoard = false;
  const MAX_ATTEMPTS = 100;
  let isDeterministic, board, boardSeed;
  let counter = 0;

  while (!hasFoundDeterministicBoard && counter < MAX_ATTEMPTS) {
    await pollEventLoop(timerTime, setTimerTime);
    counter++;
    boardSeed = rng.getRandomNewSeed();
    board = generateBoardFromSeedStatic(sideLength ?? 10, boardSeed);
    isDeterministic = solveBoardDeterministically(board);
    hasFoundDeterministicBoard = isDeterministic;
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

export default generateBoardAndTestForDeterminism;
