import { BlankBoard, Board, Coords } from "domains/Queens/sharedTypes";

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

const markColors = (board: Board) => {};

const markGuaranteedPlacements = (board: Board): Coords | undefined => {
  markRows(board);
  markColumns(board);
  markColors(board);
  return undefined;
};

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

const getGuessesLeftV2 = (board: Board, guessesTried: Coords[]) => {
  let result: Coords[] = [];
  const colorCounts = getColorCounts(board);

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

const getColorCounts = (blankBoard: Board) => {
  const colorCounts: Record<string, number> = {};
  blankBoard.forEach((row) => {
    row.forEach(({ color }) => {
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

const solveBoardRecursive = (
  board: Board,
  recursionCount: number = 0
): Board | undefined => {
  //console.log({ recursionCount, board });
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
