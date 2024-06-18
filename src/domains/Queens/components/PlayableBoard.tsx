import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  BoardDisplay,
  OnClickTile,
} from "domains/Queens/components/BoardDisplay";

import SolveBoardPlayground from "domains/Queens/components/SolveBoardPlayground";
import { BOARD_COLORS } from "domains/Queens/constants/constants";
import {
  copyBoard,
  createBoardFromBlankBoard,
} from "domains/Queens/helpers/solveBoard";
import { MOCK_BLANK_BOARD_2 } from "domains/Queens/mocks/mocks";
import {
  BlankBoard,
  Board,
  Token,
  BoardColor,
  Coords,
} from "domains/Queens/sharedTypes";

import * as React from "react";

const EMPTY_BOARD = createBoardFromBlankBoard(MOCK_BLANK_BOARD_2);
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

const checkForVictory = (board: Board): boolean => {
  console.log("Checking for victory");
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
  console.log({ numQueens });
  return numQueens === targetNumQueens;
};
const clearAllConflicts = (board: Board) => {
  for (let row of board) {
    for (let tile of row) {
      tile.isConflicting = false;
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

export const PlayableBoard = ({ blankBoard }: { blankBoard: BlankBoard }) => {
  const [board, setBoard] = React.useState(
    createBoardFromBlankBoard(blankBoard)
  );
  const [movesPlayed, setMovesPlayed] = React.useState<Coords[]>([]);
  const [hasWon, setHasWon] = React.useState(false);

  const onClickTile: OnClickTile = (i, j) => {
    setMovesPlayed((prev) => [...prev, { row: i, col: j }]);
    const newBoard = copyBoard(board);
    const currentTile = newBoard[i][j].token;
    const newTile = getNewTileOnClick(currentTile);
    newBoard[i][j].token = newTile;
    markConflicts(newBoard);
    setHasWon(checkForVictory(newBoard));
    setBoard(newBoard);
  };

  const undoLastMove = () => {};

  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      {hasWon ? <div>You win!</div> : <br />}
      <BoardDisplay board={board} onClickTile={onClickTile} />
      <Stack>
        <PrimaryButton onClick={undoLastMove}>Undo</PrimaryButton>
      </Stack>
    </MainContainer>
  );
};
