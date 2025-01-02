import { getSeeds } from "domains/Queens/boards/seeds";
import {
  runClearOldLevelsMigration,
  runFixSavedStarsMigration,
  runRemoveSavedStarsMigration,
} from "domains/Queens/helpers/localStorageMigrations";
import { Board, Stats, Token } from "domains/Queens/sharedTypes";

const TIMES_STORAGE_KEY = "queensTimes";
const DAILY_STORAGE_KEY = "dailyQueens";
const STATS_STORAGE_KEY = "queensStats";

export const getStorageKey = ({
  seedIndex,
  boardSize,
}: {
  seedIndex: number;
  boardSize: number;
}) => {
  return `${TIMES_STORAGE_KEY}-${seedIndex}-${boardSize}`;
};

export const boardToTokens = (board: Board) => {
  return board.map((row) => row.map((tile) => tile.token));
};

export const tokensToBoard = ({
  board,
  tokens,
}: {
  board: Board;
  tokens: Token[][];
}) => {
  return board.map((row) => row.map((tile) => tile.token));
};

export type TimeStorageObject =
  | {
      time?: number;
      isFinished?: boolean;
      // boardState will exist if they have started but haven't finished
      boardState?: Token[][];
    }
  | undefined;

export const saveDailyBoardProgress = ({
  newTimeStorageObject,
  dayIndex,
}: {
  newTimeStorageObject: TimeStorageObject;
  dayIndex: number;
}) => {
  const key = getDailyBoardKey({ dayIndex });
  localStorage.setItem(
    key,
    JSON.stringify({
      ...(newTimeStorageObject || {}),
    })
  );
};

export const saveBoardProgress = ({
  newTimeStorageObject,
  seedIndex,
  boardSize,
  overrideExisting,
}: {
  newTimeStorageObject: TimeStorageObject;
  seedIndex: number;
  boardSize: number;
  overrideExisting?: boolean;
}) => {
  const currentTimeObject = getStorageTimeObject({ seedIndex, boardSize });

  const key = getStorageKey({ seedIndex, boardSize });

  const newObject = overrideExisting
    ? newTimeStorageObject
    : {
        ...(currentTimeObject || {}),
        ...(newTimeStorageObject || {}),
      };
  localStorage.setItem(key, JSON.stringify(newObject));
};

export const getStorageTimeObject = ({
  seedIndex,
  boardSize,
}: {
  seedIndex: number;
  boardSize: number;
}): TimeStorageObject => {
  const key = getStorageKey({ seedIndex, boardSize });
  const currentTimeObject = JSON.parse(localStorage.getItem(key) || "{}");
  return currentTimeObject;
};

export const getDailyBoardKey = ({ dayIndex }: { dayIndex: number }) => {
  return `${DAILY_STORAGE_KEY}-${dayIndex}`;
};

export const getDailyBoardProgressFromIndex = ({
  dayIndex,
}: {
  dayIndex: number;
}): TimeStorageObject => {
  const key = getDailyBoardKey({ dayIndex });
  const currentTimeObject = JSON.parse(localStorage.getItem(key) || "{}");
  return currentTimeObject;
};

export const getTime = ({
  seedIndex,
  boardSize,
}: {
  seedIndex: number;
  boardSize: number;
}): number | undefined => {
  const currentTimeObject = getStorageTimeObject({ seedIndex, boardSize });
  return currentTimeObject.time;
};

export const getFirstUnfinishedBoard = ({
  boardSize,
}: {
  boardSize: number;
}) => {
  for (let i = 0; i < getSeeds(boardSize).length; i++) {
    const currentTimeObject = getStorageTimeObject({ seedIndex: i, boardSize });
    if (!currentTimeObject.isFinished) {
      return i;
    }
  }
  return 0;
};

export const getHasFinishedAllBoards = ({
  boardSize,
}: {
  boardSize: number;
}) => {
  for (let i = getSeeds(boardSize).length - 1; i >= 0; i--) {
    const currentTimeObject = getStorageTimeObject({ seedIndex: i, boardSize });
    if (!currentTimeObject.isFinished) {
      return false;
    }
  }
  return true;
};

// removes local storage for a given board size, and adds the numbers to
// that data is stored in 2 arrays, and accessed by size
export const resetBoards = ({ boardSize }: { boardSize: number }) => {
  const allStats = JSON.parse(
    localStorage.getItem(STATS_STORAGE_KEY) || "{}"
  ) as Stats;
  const stats = allStats[boardSize.toString()] || { seeds: [], times: [] };
  allStats[boardSize.toString()] = stats;
  for (let i = 0; i < getSeeds(boardSize).length; i++) {
    const currentTimeObject = getStorageTimeObject({ seedIndex: i, boardSize });
    if (currentTimeObject.isFinished) {
      stats.seeds.push(getSeeds(boardSize)[i]);
      stats.times.push(currentTimeObject.time);
    }
    const key = getStorageKey({ seedIndex: i, boardSize });
    localStorage.removeItem(key);
  }
  console.log({ allStats });
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(allStats));
};

// runs the migrations
if (!!localStorage) {
  runClearOldLevelsMigration();
  runFixSavedStarsMigration();
  runRemoveSavedStarsMigration();
}
