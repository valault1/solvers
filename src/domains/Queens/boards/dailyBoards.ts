import { generateBoardFromSeedStatic } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import {
  getDailyBoardProgressFromIndex,
  getStorageTimeObject,
} from "domains/Queens/helpers/localStorageHelper";
import { placeQueen } from "domains/Queens/helpers/solver/solveBoard";

export const START_DATE = "07/02/24";

export const getDayIndex = () => {
  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(START_DATE).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  // mod it by the length of daily boards. This way if we run out, it doesn't error.
  const index = daysSinceStart % DAILY_BOARDS.length;
  return index;
};

export const getDailyBoard = () => {
  // this is a rough estimate. todo when I have internet: make this a subtract function between the dates.
  const index = getDayIndex();
  const { size, seed }: DailyBoard = DAILY_BOARDS[index];
  const board = generateBoardFromSeedStatic(
    size || DEFAULT_DAILY_BOARD_SIZE,
    seed
  );

  const progress = getDailyBoardProgress();
  if (progress.isFinished) {
    progress.starPositions?.forEach(({ row, col }) =>
      placeQueen(board, row, col)
    );
  }

  return board;
};

export const getDailyBoardProgress = () => {
  return getDailyBoardProgressFromIndex({ dayIndex: getDayIndex() });
};

export const hasFinishedDailyBoard = () => {
  const obj = getDailyBoardProgress();
  return obj?.isFinished;
};

export const DEFAULT_DAILY_BOARD_SIZE = 10;
export type DailyBoard = { seed: number; size?: number };
export const DAILY_BOARDS: DailyBoard[] = [
  { seed: 7593202 },
  { seed: 2149748 },
  { seed: 3686519 },
  { seed: 2109389 },
  { seed: 4478942 },
  { seed: 7957770 },
  { seed: 4575896 },
];
