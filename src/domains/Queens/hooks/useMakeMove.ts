import { OnClickTile } from "domains/Queens/components/BoardDisplay";
import { BOARD_COLORS_HEX } from "domains/Queens/constants/constants";
import { getStarPositions } from "domains/Queens/helpers/localStorageHelper";
import { range } from "domains/Queens/helpers/randomNum";
import {
  copyBoard,
  placeQueen,
  safeCheckBoard,
} from "domains/Queens/helpers/solver/solveBoard";
import { Board, Token, BoardColor, Move } from "domains/Queens/sharedTypes";
import React from "react";

const getNewTileOnClick = (tile: Token): Token => {
  if (tile === "X") return "Q";
  if (tile === "Q") return "";
  return "X";
};

const markConflictingColumns = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    let queenCoords: number[] = [];
    for (let j = 0; j < board.length; j++) {
      if (board[j][i].token === "Q") {
        queenCoords.push(j);
      }
    }

    if (queenCoords.length > 1) {
      for (let coord of queenCoords) {
        board[coord][i].isConflicting = true;
      }
    }
  }
};

const markConflictingRows = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    let queenCoords: number[] = [];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].token === "Q") {
        queenCoords.push(j);
      }
    }

    if (queenCoords.length > 1) {
      for (let coord of queenCoords) {
        board[i][coord].isConflicting = true;
      }
    }
  }
};

const markConflictingColors = (board: Board) => {
  const BOARD_COLOR_NAMES = BOARD_COLORS_HEX;
  //@ts-ignore
  const dict: Record<BoardColor, { row: number; column: number }[]> =
    //@ts-ignore
    BOARD_COLOR_NAMES.reduce((accum, name) => {
      //@ts-ignore
      accum[name] = [];
      return accum;
    }, {});

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const tile = board[i][j];
      if (tile.token === "Q") {
        dict[tile.color].push({ row: i, column: j });
      }
    }
  }
  for (let color of BOARD_COLOR_NAMES) {
    //@ts-ignore
    const queenCoords: { row: number; column: number }[] = dict[color];
    if (queenCoords.length > 1) {
      for (let coord of queenCoords) {
        board[coord.row][coord.column].isConflicting = true;
      }
    }
  }
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
const clearAllConflicts = (board: Board) => {
  for (let row of board) {
    for (let tile of row) {
      tile.isConflicting = false;
    }
  }
};

const markConflictingDiagonals = (board: Board) => {
  const starPositions = getStarPositions(board);
  starPositions.forEach(({ row, col }) => {
    const tile = board[row][col];
    if (safeCheckBoard(board, row + 1, col + 1)?.token === "Q") {
      tile.isConflicting = true;
      board[row + 1][col + 1].isConflicting = true;
    }
    if (safeCheckBoard(board, row + 1, col - 1)?.token === "Q") {
      tile.isConflicting = true;
      board[row + 1][col - 1].isConflicting = true;
    }
    if (safeCheckBoard(board, row - 1, col + 1)?.token === "Q") {
      tile.isConflicting = true;
      board[row - 1][col + 1].isConflicting = true;
    }
    if (safeCheckBoard(board, row - 1, col - 1)?.token === "Q") {
      tile.isConflicting = true;
      board[row - 1][col - 1].isConflicting = true;
    }
  });
};

// after they've clicked a board, validate it.
// returns whether they have won the board or not
// also marks the board with queens that are in conflict.
const markConflicts = (board: Board) => {
  clearAllConflicts(board);
  markConflictingColumns(board);
  markConflictingRows(board);
  markConflictingColors(board);
  markConflictingDiagonals(board);
};

export const undoMove = (board: Board, move: Move) => {
  move.forEach((tileChange) => {
    board[tileChange.row][tileChange.col].token = tileChange.prevToken;
  });
};

export const useMakeMove = ({
  board,
  setBoard,
  onWin,
}: {
  board: Board;
  setBoard: (b: Board) => void;
  onWin?: (board: Board) => void;
}) => {
  const [movesPlayed, setMovesPlayed] = React.useState<Move[]>([]);

  const validateBoard = React.useCallback(
    (newBoard: Board) => {
      markConflicts(newBoard);
      const hasWon = checkForVictory(newBoard);
      if (hasWon) {
        onWin?.(newBoard);
      }
    },
    [onWin]
  );

  const recordMove = React.useCallback(
    (newBoard: Board) => {
      const result: Move = [];
      for (let i of range(board.length)) {
        for (let j of range(board.length)) {
          const newBoardTile = newBoard[i][j].token;
          const oldBoardTile = board[i][j].token;

          if (newBoardTile !== oldBoardTile) {
            result.push({
              prevToken: oldBoardTile,
              newToken: newBoardTile,
              row: i,
              col: j,
            });
          }
        }
      }

      setMovesPlayed((prev) => [...prev, result]);
    },
    [setMovesPlayed, board]
  );

  const undoLastMove = React.useCallback(() => {
    const newBoard = copyBoard(board);
    const moveToUndo = movesPlayed[movesPlayed.length - 1];
    undoMove(newBoard, moveToUndo);
    validateBoard(newBoard);
    setBoard(newBoard);
    setMovesPlayed((prev) => prev.slice(0, prev.length - 1));
  }, [movesPlayed, board, validateBoard, setBoard]);

  // only add x's. This is for ease of dragging.
  const onDragTouchOntoTile: OnClickTile = (i, j) => {
    if (board[i][j].token === "") {
      const newBoard = copyBoard(board);
      newBoard[i][j].token = "X";
      recordMove(newBoard);
      validateBoard(newBoard);
      setBoard(newBoard);
    }
  };

  const onClickTile: OnClickTile = (i, j) => {
    const newBoard = copyBoard(board);
    const currentTile = newBoard[i][j].token;
    const newToken = getNewTileOnClick(currentTile);
    if (newToken === "Q") {
      placeQueen(newBoard, i, j);
    } else if (newToken === "") {
      // this means they removed a queen
      // find the time the queen was placed in movesPlayed, and undo that move as the next move
      let moveThatPlacedQueen: Move | undefined = undefined;
      for (let index = movesPlayed.length - 1; index >= 0; index--) {
        const move = movesPlayed[index];
        const queenTileChange = move.find(
          (tileChange) =>
            tileChange.newToken === "Q" &&
            tileChange.row === i &&
            tileChange.col === j
        );
        if (queenTileChange) {
          moveThatPlacedQueen = move;
          break;
        }
      }

      if (moveThatPlacedQueen) {
        undoMove(newBoard, moveThatPlacedQueen);
      }
      newBoard[i][j].token = newToken;
    } else {
      newBoard[i][j].token = newToken;
    }
    recordMove(newBoard);
    validateBoard(newBoard);

    setBoard(newBoard);
  };

  return { undoLastMove, onClickTile, onDragTouchOntoTile };
};
