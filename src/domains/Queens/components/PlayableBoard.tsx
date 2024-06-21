import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  BoardDisplay,
  OnClickTile,
} from "domains/Queens/components/BoardDisplay";
import { BOARD_COLORS } from "domains/Queens/constants/constants";
import { generateBoardFromSeed } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { range, RNG } from "domains/Queens/helpers/randomNum";
import { DETERMINISTIC_SEEDS } from "domains/Queens/helpers/seedsToUse";
import { copyBoard, placeQueen } from "domains/Queens/helpers/solveBoard";

import {
  Board,
  Token,
  BoardColor,
  Coords,
  Move,
} from "domains/Queens/sharedTypes";

import * as React from "react";

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
  const BOARD_COLOR_NAMES = Object.keys(BOARD_COLORS);
  //@ts-ignore
  const dict: Record<BoardColor, { row: number; column: number }[]> =
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

export const clearAllTokens = (board: Board) => {
  for (let row of board) {
    for (let tile of row) {
      tile.token = "";
    }
  }
};

// after they've clicked a board, validate it.
// returns whether they have won the board or not
// also marks the board with queens that are in conflict.
const markConflicts = (board: Board) => {
  clearAllConflicts(board);
  markConflictingColumns(board);
  markConflictingRows(board);
  markConflictingColors(board);
};

const undoMove = (board: Board, move: Move) => {
  move.forEach((tileChange) => {
    board[tileChange.row][tileChange.col].token = tileChange.prevToken;
  });
};

const SEED = new RNG().getRandomElementFromArray(DETERMINISTIC_SEEDS);
const USE_STANDARD_SEED = false;
const rng = new RNG(USE_STANDARD_SEED ? SEED : new Date().getTime());
const INITIAL_SEED = rng.getRandomNewSeed();
const SIDE_LENGTH = 10;
const INITIAL_BOARD = generateBoardFromSeed(SIDE_LENGTH, INITIAL_SEED);

export const PlayableBoard = ({ initialBoard }: { initialBoard?: Board }) => {
  const [board, setBoard] = React.useState(initialBoard ?? INITIAL_BOARD);
  const [currentBoardIndex, setCurrentBoardIndex] = React.useState(0);
  React.useEffect(() => {
    const currentBoard = generateBoardFromSeed(
      10,
      DETERMINISTIC_SEEDS[currentBoardIndex]
    );
    setBoard(currentBoard);
  }, [currentBoardIndex]);
  const [movesPlayed, setMovesPlayed] = React.useState<Move[]>([]);
  const [hasWon, setHasWon] = React.useState(false);
  const [seed, setSeed] = React.useState(INITIAL_SEED);

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

  const validateBoard = React.useCallback(
    (newBoard: Board) => {
      markConflicts(newBoard);
      setHasWon(checkForVictory(newBoard));
    },
    [setHasWon]
  );

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

  const onClickGenerateBoard = React.useCallback(() => {
    const newSeed = new RNG().getRandomElementFromArray(DETERMINISTIC_SEEDS);
    setSeed(newSeed);
    const newBoard = generateBoardFromSeed(SIDE_LENGTH, newSeed);
    setBoard(newBoard);
  }, []);

  const undoLastMove = React.useCallback(() => {
    const newBoard = copyBoard(board);
    const moveToUndo = movesPlayed[movesPlayed.length - 1];
    undoMove(newBoard, moveToUndo);
    validateBoard(newBoard);
    setBoard(newBoard);
    setMovesPlayed((prev) => prev.slice(0, prev.length - 1));
  }, [movesPlayed, board, validateBoard]);

  const clearBoard = React.useCallback(() => {
    const newBoard = copyBoard(board);
    clearAllTokens(newBoard);
    setBoard(newBoard);
  }, [board, setBoard]);

  const disableNext = currentBoardIndex >= DETERMINISTIC_SEEDS.length - 1;
  const disablePrev = currentBoardIndex <= 0;

  const nextBoard = React.useCallback(() => {
    setCurrentBoardIndex((prev) => prev + 1);
  }, [setCurrentBoardIndex]);

  const prevBoard = React.useCallback(() => {
    setCurrentBoardIndex((prev) => prev - 1);
  }, [setCurrentBoardIndex]);

  return (
    <Stack direction={"column"} gap={2}>
      {hasWon ? <div>You win!</div> : <br />}
      <PrimaryButton onClick={clearBoard}>Clear board</PrimaryButton>
      <BoardDisplay board={board} onClickTile={onClickTile} />
      <Stack gap={2}>
        <PrimaryButton onClick={undoLastMove}>Undo last move</PrimaryButton>
      </Stack>
      {/* <PrimaryButton onClick={onClickGenerateBoard}>New board</PrimaryButton> */}
      <Stack gap={2} direction="row">
        <PrimaryButton fullWidth onClick={prevBoard} disabled={disablePrev}>
          Previous board
        </PrimaryButton>
        <PrimaryButton fullWidth onClick={nextBoard} disabled={disableNext}>
          Next board
        </PrimaryButton>
      </Stack>
      board {currentBoardIndex + 1} of {DETERMINISTIC_SEEDS.length}
    </Stack>
  );
};
