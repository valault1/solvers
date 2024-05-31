import { BOARD_COLORS } from "domains/Queens/constants/constants";
import { BlankBoard, Board, Coords } from "domains/Queens/sharedTypes";

const copyBoard = (board: Board) => {
  return board.map((row) => row.map((tile) => ({ ...tile })));
};

const markRows = (board: Board) => {
  board.forEach((row, i) => {
    let xCount = 0;
    let blankCount = 0;
    let blankIndex = 0;
    row.forEach((tile, j) => {
      if (tile.token === "X") {
        xCount++;
      } else if (tile.token === "") {
        blankCount++;
        blankIndex = j;
      }
    });

    if (xCount === row.length - 1 && blankCount === 1) {
      placeQueen(board, i, blankIndex);
    }
  });
};

const markColumns = (board: Board) => {
  for (let i = 0; i < board[0].length; i++) {
    let column = board.map((row) => row[i]);
    let xCount = 0;
    let blankCount = 0;
    let blankIndex = 0;
    column.forEach((tile, j) => {
      if (tile.token === "X") {
        xCount++;
      } else if (tile.token === "") {
        blankCount++;
        blankIndex = j;
      }
    });

    if (xCount === column.length - 1 && blankCount === 1) {
      placeQueen(board, blankIndex, i);
    }
  }
};

const safeCheckBoard = (board: Board, row: number, col: number) => {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
    return undefined;
  }
  return board[row][col];
};

const squareHasNoQueenConflict = (
  board: Board,
  row: number,
  col: number
): boolean => {
  const hasQueenInRow = board[row].some((tile) => tile.token === "Q");
  if (hasQueenInRow) return false;
  const hasQueenInCol = board.some((row) => row[col].token === "Q");
  if (hasQueenInCol) return false;

  const hasQueenInAdjacentDiagonals =
    safeCheckBoard(board, row + 1, col + 1)?.token === "Q" ||
    safeCheckBoard(board, row + 1, col - 1)?.token === "Q" ||
    safeCheckBoard(board, row - 1, col + 1)?.token === "Q" ||
    safeCheckBoard(board, row - 1, col - 1)?.token === "Q";
  if (hasQueenInAdjacentDiagonals) return false;
  return true;
};
const markColors = (board: Board) => {
  let colorCounts: Record<
    string,
    {
      xCount: number;
      blankCount: number;
      totalCount: number;
      lastBlankCoord: Coords | undefined;
    }
  > = {};
  Object.keys(BOARD_COLORS).forEach((colorName) => {
    colorCounts[colorName] = {
      xCount: 0,
      blankCount: 0,
      totalCount: 0,
      lastBlankCoord: undefined,
    };
  });

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const tile = row[j];
      let countsObj = colorCounts[tile.color];
      countsObj.totalCount++;
      if (tile.token === "X") {
        countsObj.xCount++;
      } else if (tile.token === "") {
        countsObj.blankCount++;
        countsObj.lastBlankCoord = { row: i, col: j };
      }
    }
  }
  Object.keys(colorCounts).forEach((colorName) => {
    const countsObj = colorCounts[colorName];
    const isOnlyOpenSquareOfThisColor =
      countsObj.xCount === countsObj.totalCount - 1 &&
      countsObj.blankCount === 1;

    const r = countsObj.lastBlankCoord?.row;
    const c = countsObj.lastBlankCoord?.col;

    if (isOnlyOpenSquareOfThisColor) {
      const squareCanBeQueen = squareHasNoQueenConflict(board, r, c);
      if (squareCanBeQueen)
        placeQueen(
          board,
          countsObj.lastBlankCoord!.row,
          countsObj.lastBlankCoord!.col
        );
    }
  });
};

const markGuaranteedPlacements = (board: Board) => {
  markRows(board);
  markColumns(board);
  markColors(board);
};

// returns the possible guesses left in the preferred order
// excludes any spaces marked X
const getGuessesLeft = (board: Board) => {
  let result: Coords[] = [];

  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile.token === "") {
        result.push({ row: i, col: j });
      }
    });
  });
  return result;
};

const boardHasWon = (board: Board) => {
  let queenJCoords: number[] = [];
  let queenICoords: number[] = [];
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile.token === "Q") {
        queenJCoords.push(j);
        queenICoords.push(i);
      }
    });
  });

  // check columns
  // queenJCoords.sort();
  // queenICoords.sort();
  // if (!queenJCoords.some((coord, index) => coord !== index)) return false;
  // if (!queenICoords.every((coord, index) => coord !== index)) return false;
  const hasRightNumberOfQueens = queenJCoords.length === board.length;
  if (hasRightNumberOfQueens) {
    console.log({ hasRightNumberOfQueens, queenJCoords, queenICoords, board });
  }
  return hasRightNumberOfQueens;
};

const placeX = (board: Board, r: number, c: number) => {
  if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
  if (board[r][c].token === "") {
    board[r][c].token = "X";
  }
};

const markDiagonalXs = (board: Board, row: number, col: number) => {
  placeX(board, row + 1, col + 1);
  placeX(board, row - 1, col + 1);
  placeX(board, row + 1, col - 1);
  placeX(board, row - 1, col - 1);
};

const markColorXs = (board: Board, color: string) => {
  for (let row of board) {
    for (let tile of row) {
      if (tile.color === color && tile.token === "") {
        tile.token = "X";
      }
    }
  }
};

const markXsAfterQueen = (board: Board, row: number, col: number) => {
  for (let i = 0; i < board.length; i++) {
    placeX(board, i, col);
    placeX(board, row, i);
  }
  markColorXs(board, board[row][col].color);
  markDiagonalXs(board, row, col);
};

const placeQueen = (board: Board, row: number, col: number) => {
  board[row][col].token = "Q";
  markXsAfterQueen(board, row, col);
};

const solveBoardRecursive = (
  board: Board,
  recursionCount: number = 0
): Board | undefined => {
  const guessesLeft = getGuessesLeft(board);
  if (guessesLeft.length === 0) {
    const hasWon = boardHasWon(board);
    if (hasWon) {
      return board;
    } else {
      return undefined;
    }
  }
  for (let guess of guessesLeft) {
    const guessedBoard = copyBoard(board);
    placeQueen(guessedBoard, guess.row, guess.col);
    markGuaranteedPlacements(guessedBoard);
    const solvedBoard = solveBoardRecursive(guessedBoard, recursionCount + 1);
    if (solvedBoard) {
      return solvedBoard;
    }
  }
};

export const solveBoard = (blankBoard: BlankBoard): Board => {
  if (!blankBoard.length) return [];
  const board: Board = blankBoard.map((row) =>
    row.map((color) => ({ token: "", color }))
  );

  const startTime = new Date().getTime();

  const solvedBoard: Board = solveBoardRecursive(board);

  console.log({ solveTime: new Date().getTime() - startTime, solvedBoard });
  return solvedBoard;
};
