import { getSeeds } from "domains/Queens/boards/seeds";
import {
  runClearOldLevelsMigration,
  runFixSavedStarsMigration,
} from "domains/Queens/helpers/localStorageMigrations";
import { Board, BoardType, Coords, Token } from "domains/Queens/sharedTypes";

const TIMES_STORAGE_KEY = "queensTimes";
const DAILY_STORAGE_KEY = "dailyQueens";

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
      // starPositions will exist if they are finished.
      starPositions?: Coords[];
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
}: {
  newTimeStorageObject: TimeStorageObject;
  seedIndex: number;
  boardSize: number;
}) => {
  const currentTimeObject = getStorageTimeObject({ seedIndex, boardSize });

  const key = getStorageKey({ seedIndex, boardSize });
  localStorage.setItem(
    key,
    JSON.stringify({
      ...(currentTimeObject || {}),
      ...(newTimeStorageObject || {}),
    })
  );
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

// runs the migrations
if (!!localStorage) {
  runClearOldLevelsMigration();
  runFixSavedStarsMigration();
}
