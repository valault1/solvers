import {
  ORIGINAL_BOARD_COLORS,
  CONSTANT_BLANK_ARRAY,
  pollEventLoop,
  BOARD_COLORS_HEX,
} from "domains/Queens/constants/constants";

import {
  BlankBoard,
  Board,
  BoardColor,
  Coords,
  RowOrColGroup,
  TileWithCoords,
} from "domains/Queens/sharedTypes";

const useGetGuessesLeftV2 = false;

let timerTime = new Date().getTime();
const setTimerTime = (newTime: number) => {
  timerTime = newTime;
};

let colorCounts: Record<BoardColor, number> = Object.keys(
  ORIGINAL_BOARD_COLORS
).reduce((acc, colorName) => {
  acc[colorName as BoardColor] = 0;
  return acc;
}, {} as Record<BoardColor, number>);

export const populateColorCounts = (board: BlankBoard) => {
  for (let row of board) {
    for (let color of row) {
      colorCounts[color]++;
    }
  }
};

export const copyBoard = (board: Board) => {
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

export const getStarPositions = (board: Board) => {
  let starPositions: Coords[] = [];
  board.forEach((row, i) =>
    row.forEach((tile, j) => {
      if (tile.token === "Q") starPositions.push({ row: i, col: j });
    })
  );
  return starPositions;
};

export const checkForVictory = (board: Board): boolean => {
  const targetNumQueens = board.length;
  let numQueens = 0;
  for (let row of board) {
    for (let tile of row) {
      if (tile.token === "Q") {
        numQueens++;
        if (numQueens > targetNumQueens || tile.isConflicting) return false;
      }
    }
  }
  return numQueens === targetNumQueens;
};

export const safeCheckBoard = (board: Board, row: number, col: number) => {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
    return undefined;
  }
  return board[row][col];
};

export const squareHasNoQueenConflict = (
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

  BOARD_COLORS_HEX.forEach((colorName) => {
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

export const markGuaranteedPlacements = (board: Board) => {
  markRows(board);
  markColumns(board);
  markColors(board);
};

// returns the possible guesses left in the preferred order
// excludes any spaces marked X
const getGuessesLeft = (board: Board) => {
  let result: Coords[] = [];
  const rowCounts: Record<number, number> = {};
  const colCounts: Record<number, number> = {};

  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile.token === "") {
        rowCounts[i] = (rowCounts[i] || 0) + 1;
        colCounts[i] = (colCounts[j] || 0) + 1;
        result.push({ row: i, col: j });
      }
    });
  });

  //note: You only need to consider one row. So, look for the smallest row, and only look for queens in that.

  const rowMinCount = Math.min(...Object.values(rowCounts));
  const rowWithMinCount =
    Number(
      Object.keys(rowCounts).find(
        (row) => rowCounts[Number(row)] === rowMinCount
      )
    ) || undefined;

  if (rowWithMinCount === undefined) {
    return result;
  }

  const minRowResult = result.filter((coord) => coord.row === rowWithMinCount);

  return minRowResult;
};
// chooses colors with most number of squares first
const getGuessesLeftV2 = (board: Board) => {
  let result: (Coords & { color: BoardColor })[] = [];

  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile.token === "") {
        result.push({ row: i, col: j, color: tile.color });
      }
    });
  });
  result.sort((a, b) => {
    return colorCounts[a.color] - colorCounts[b.color];
  });
  return result.map((coord) => ({ row: coord.row, col: coord.col }));
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

  return hasRightNumberOfQueens;
};

const placeX = (board: Board, r: number, c: number) => {
  if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
  if (board[r][c].token === "") {
    board[r][c].token = "X";
  }
};

const getDiagonalXsToMark = (
  board: Board,
  row: number,
  col: number
): Coords[] => {
  return [
    { row: row + 1, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row - 1, col: col + 1 },
    { row: row - 1, col: col - 1 },
  ];
};

const getColorXsToMark = (board: Board, color: string): Coords[] => {
  let coords = [];
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    for (let j = 0; j < board.length; j++) {
      let tile = row[j];
      if (tile.color === color && tile.token === "") {
        coords.push({ row: i, col: j });
      }
    }
  }
  return coords;
};

const getXCoordsToMarkAfterQueen = (
  board: Board,
  row: number,
  col: number
): Coords[] => {
  let coords = [];
  for (let i = 0; i < board.length; i++) {
    coords.push({ row: i, col });
    coords.push({ row, col: i });
  }
  coords.push(...getColorXsToMark(board, board[row][col].color));
  coords.push(...getDiagonalXsToMark(board, row, col));
  coords = coords.filter((coord) => !(coord.row === row && coord.col === col));
  return coords;
};

const markXsAfterQueen = (board: Board, row: number, col: number) => {
  const coordsToMark = getXCoordsToMarkAfterQueen(board, row, col);
  for (let coords of coordsToMark) {
    placeX(board, coords.row, coords.col);
  }
};

// the strategy is to place all queens in a color, and see what x's are common to that color.
// for example: The top left 3 squares are the same color. Place a queen in all 3 squares; if any of the same squares get turned to x's, mark those as x's.
export const eliminateSquares = (board: Board) => {
  const colorCoordsInOrder = getGuessesLeftV2(board);
  if (!colorCoordsInOrder?.length) return;
  let tilesByColor: Record<BoardColor, Coords[]> = colorCoordsInOrder.reduce(
    (acc, coords) => {
      const tile = board[coords.row][coords.col];
      acc[tile.color] = [...(acc[tile.color] || []), coords];
      return acc;
    },
    {} as Record<BoardColor, Coords[]>
  );

  for (let allCoordsOfColor of Object.values(tilesByColor)) {
    if (!allCoordsOfColor?.length) continue;
    // place a queen on the tileCoords. See what x's are placed.
    let tile = board[allCoordsOfColor[0].row][allCoordsOfColor[0].col];
    let commonSquares = [
      ...getXCoordsToMarkAfterQueen(
        board,
        allCoordsOfColor[0].row,
        allCoordsOfColor[0].col
      ),
    ];
    for (let coords of allCoordsOfColor) {
      const marksForThisQueen = getXCoordsToMarkAfterQueen(
        board,
        coords.row,
        coords.col
      );
      commonSquares = commonSquares.filter((commonSquare) =>
        marksForThisQueen.some(
          (mark) =>
            mark.row === commonSquare.row && mark.col === commonSquare.col
        )
      );
    }

    for (let commonSquare of commonSquares) {
      placeX(board, commonSquare.row, commonSquare.col);
    }
  }
};

export const placeQueen = (board: Board, row: number, col: number) => {
  board[row][col].token = "Q";
  markXsAfterQueen(board, row, col);
};

const solveBoardRecursive = async (
  board: Board,
  guessesLeft: Coords[],
  recursionCount: number = 0
): Promise<Board | undefined> => {
  if (guessesLeft.length === 0) {
    const hasWon = boardHasWon(board);
    if (hasWon) {
      return board;
    } else {
      return undefined;
    }
  }

  const boards: Board[] = [];
  for (let guess of guessesLeft) {
    const guessedBoard = copyBoard(board);
    placeQueen(guessedBoard, guess.row, guess.col);
    // markGuaranteedPlacements(guessedBoard);
    // eliminateSquares(guessedBoard);
    narrowDownBoard(guessedBoard);
    boards.push(guessedBoard);

    await pollEventLoop(timerTime, setTimerTime);

    const solvedBoard = await solveBoardRecursive(
      guessedBoard,
      useGetGuessesLeftV2
        ? getGuessesLeftV2(guessedBoard)
        : getGuessesLeft(guessedBoard),
      recursionCount + 1
    );
    if (recursionCount <= 0) {
      // console.log({
      //   msg: "knocked out a guess! recursionCount: ",
      //   recursionCount,
      //   guessesLeft,
      //   guessedBoard,
      // });
    }

    if (solvedBoard) {
      return solvedBoard;
    }
  }
};

export const createBoardFromBlankBoard = (blankBoard: BlankBoard): Board => {
  return blankBoard.map((row) => row.map((color) => ({ token: "", color })));
};

export const boardsAreEqual = (board1: Board, board2: Board) => {
  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1[i].length; j++) {
      if (board1[i][j].token !== board2[i][j].token) return false;
    }
  }
  return true;
};

const eliminateSquaresInRowColGroup = ({
  board,
  group,
  returnAfterFirstElimination = false,
}: {
  board: Board;
  group: RowOrColGroup;
  returnAfterFirstElimination?: boolean;
}) => {
  const colorsInGroup = new Set(
    group.squares.map((square) => square.tile.color)
  );

  // rule 1: check for a group that completely contains n colors
  //  get colors in group
  //  check if those colors exist outside of the group
  const colorsOutsideGroup = new Set(
    group.squaresOutsideGroup.map((square) => square.tile.color)
  );

  const colorsInGroupArr = Array.from(colorsInGroup);
  const colorsContainedInGroup = new Set(
    colorsInGroupArr.filter((color) => !colorsOutsideGroup.has(color))
  );

  if (colorsContainedInGroup.size === group.groupSize) {
    group.squares.forEach((square) => {
      if (!colorsContainedInGroup.has(square.tile.color)) {
        board[square.row][square.col].token = "X";
      }
    });
    if (returnAfterFirstElimination) return;
  }

  // rule 2: check for a group that contains only n colors
  //  count the number of colors in the group
  //  if it equals n, eliminate other instances of those colors on the board.
  if (colorsInGroup.size === group.groupSize) {
    group.squaresOutsideGroup.forEach((square) => {
      if (colorsInGroup.has(square.tile.color)) {
        board[square.row][square.col].token = "X";
      }
      if (returnAfterFirstElimination) return;
    });
  }
};

// returns
const getRowGroups = (board: Board): RowOrColGroup[] => {
  const groups: RowOrColGroup[] = [];
  for (let rowBegin = 0; rowBegin < board.length - 2; rowBegin++) {
    for (let rowEnd = rowBegin; rowEnd < board.length; rowEnd++) {
      const groupSize = rowEnd - rowBegin + 1;
      //if (groupSize > Math.floor(board.length / 2) + 1) continue;
      const squares: TileWithCoords[] = [];
      const squaresOutsideGroup: TileWithCoords[] = [];
      board.forEach((row, i) => {
        row.forEach((tile, j) => {
          if (tile.token !== "X") {
            const newSquare = { tile, row: i, col: j };
            if (rowBegin <= i && i <= rowEnd) {
              squares.push(newSquare);
            } else {
              squaresOutsideGroup.push(newSquare);
            }
          }
        });
      });
      groups.push({
        squares,
        squaresOutsideGroup,
        groupSize,
      });
    }
  }
  return groups;
};

const getColGroups = (board: Board): RowOrColGroup[] => {
  const groups: RowOrColGroup[] = [];
  for (let colBegin = 0; colBegin < board.length - 2; colBegin++) {
    for (let colEnd = colBegin; colEnd < board.length; colEnd++) {
      const squares: TileWithCoords[] = [];
      const squaresOutsideGroup: TileWithCoords[] = [];
      board.forEach((row, i) => {
        row.forEach((tile, j) => {
          if (tile.token !== "X") {
            const newSquare = { tile, row: i, col: j };
            if (colBegin <= j && j <= colEnd) {
              squares.push(newSquare);
            } else {
              squaresOutsideGroup.push(newSquare);
            }
          }
        });
      });
      groups.push({
        squares,
        squaresOutsideGroup,
        groupSize: colEnd - colBegin + 1,
      });
    }
  }
  return groups;
};

export const eliminateRowColGroups = ({
  board,
  returnAfterFirstElimination,
}: {
  board: Board;
  returnAfterFirstElimination?: boolean;
}) => {
  const rowGroups = getRowGroups(board);
  const colGroups: RowOrColGroup[] = getColGroups(board);

  [...rowGroups, ...colGroups].forEach((group) =>
    eliminateSquaresInRowColGroup({ board, group, returnAfterFirstElimination })
  );
  //const colGroups = getColGroups(board);
};

export const runSolveRules = (board: Board) => {
  markGuaranteedPlacements(board);
  eliminateSquares(board);
  eliminateRowColGroups({ board });
};

export const solveBoardAndReportDifficulty = (board: Board) => {
  let difficulty = 0;
  const DIFFICULTY_POINTS_GUARANTEED_PLACEMENTS = 1;
  const DIFFICULTY_POINTS_ELIMINATE_SQUARES = 2;
  const DIFFICULTY_POINTS_ROW_COL_GROUPS = 3;
  let boardCopy = copyBoard(board);
  let boardsAreNotEqual = true;

  while (boardsAreNotEqual) {
    //console.log("Boards still not equal, try again");
    boardCopy = copyBoard(board);
    markGuaranteedPlacements(board);
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
    if (boardsAreNotEqual) continue;
    else {
      const numStarsPlaced =
        getStarPositions(board).length - getStarPositions(boardCopy).length;
      difficulty += numStarsPlaced + DIFFICULTY_POINTS_GUARANTEED_PLACEMENTS;
    }

    eliminateSquares(board);
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
    if (boardsAreNotEqual) continue;
    else difficulty += DIFFICULTY_POINTS_ELIMINATE_SQUARES;

    eliminateRowColGroups({ board, returnAfterFirstElimination: true });
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
    if (boardsAreNotEqual) continue;
    else difficulty += DIFFICULTY_POINTS_ROW_COL_GROUPS;
  }
  return difficulty;
};

export const narrowDownBoard = (board: Board) => {
  let boardCopy = copyBoard(board);
  let boardsAreNotEqual = true;

  while (boardsAreNotEqual) {
    //console.log("Boards still not equal, try again");
    boardCopy = copyBoard(board);
    markGuaranteedPlacements(board);
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
    if (!boardsAreNotEqual) {
      eliminateSquares(board);
    }
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
    if (!boardsAreNotEqual) {
      eliminateRowColGroups({ board });
    }
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
  }
};

export const narrowDownBoardOld = (board: Board) => {
  let boardCopy = copyBoard(board);
  let boardsAreNotEqual = true;

  while (boardsAreNotEqual) {
    //console.log("Boards still not equal, try again");
    boardCopy = copyBoard(board);
    runSolveRules(board);
    boardsAreNotEqual = !boardsAreEqual(board, boardCopy);
  }
};

export const solveBoard = async (blankBoard: BlankBoard): Promise<Board> => {
  if (!blankBoard.length) return CONSTANT_BLANK_ARRAY;
  const board: Board = createBoardFromBlankBoard(blankBoard);

  populateColorCounts(blankBoard);

  const startTime = new Date().getTime();

  narrowDownBoard(board);
  const solvedBoard: Board = await solveBoardRecursive(
    board,
    useGetGuessesLeftV2 ? getGuessesLeftV2(board) : getGuessesLeft(board)
  );

  console.log({ solveTime: new Date().getTime() - startTime, solvedBoard });
  return solvedBoard;
};

export const solveBoardSync = (board: Board) => {
  board.forEach((row) => row.forEach((tile) => (tile.token = "")));
  solveBoardAndReportDifficulty(board);
};

/**
 * Solve times
 * v1
 *   board1: 478
 *   board2: 7
 *   board3: 31
 * v2 (prioritizing by largest color first)
 *   board1: 490
 *   board2: 4651
 *   board3: 3091
 * v3 (prioritizing by smallest color first)
 *   board1: 25
 *   board2: 66
 *   board3: 3024
 * v4 (using v1 getGuessesLeft, 100ms event loop polling)
 *   board1: 703
 *   board2: 66
 *   board3: 103
 */
