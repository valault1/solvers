import { BlankBoard, Board, Coords } from "domains/Queens/sharedTypes";

// returns the possible guesses left in the preferred order
// excludes any spaces marked X
const getGuessesLeft = (board: Board, guessesTried: Coords[]) => {
  let result: Coords[] = [];
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      const hasGuessedThisTile = guessesTried.some(
        (guess) => guess.row === i && guess.col === j
      );
      if (tile.token === "" && !hasGuessedThisTile) {
        result.push({ row: i, col: j });
      }
    });
  });
  return result;
};

const boardHasWon = (board: Board) => {
  let queenCount = 0;
  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.token === "Q") {
        queenCount++;
      }
    });
  });
  return queenCount === board.length;
};

const getColorCounts = (blankBoard: BlankBoard) => {
  const colorCounts: Record<string, number> = {};
  blankBoard.forEach((row) => {
    row.forEach((color) => {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });
  });
  return colorCounts;
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

const getGuaranteedPlacement = (board: Board): Coords | undefined => {
  // const rowsPlacement = getRowsPlacement(board);
  // const columnsPlacement = getColumnsPlacement(board);
  // const colorsPlacement = getColorsPlacement(board);
  return undefined;
};

const solveBoardRecursive = (board: Board): Board | undefined => {
  const guessesLeft = getGuessesLeft(board, []);
  if (guessesLeft.length === 0) {
    const hasWon = boardHasWon(board);
    if (hasWon) {
      return board;
    } else {
      return undefined;
    }
  }
  for (let guess of guessesLeft) {
    const guessedBoard = JSON.parse(JSON.stringify(board));
    placeQueen(guessedBoard, guess.row, guess.col);
    const solvedBoard = solveBoardRecursive(guessedBoard);
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

  //placeQueen(board, 3, 0);
  const startTime = new Date().getTime();
  const solvedBoard = solveBoardRecursive(board);

  console.log({ solvedBoard, solveTime: new Date().getTime() - startTime });
  return solvedBoard;
};
