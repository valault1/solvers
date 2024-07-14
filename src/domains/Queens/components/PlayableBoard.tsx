import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";
import { addBordersToBoard } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { rotateBoard } from "domains/Queens/helpers/solver/parseBoard";
import {
  copyBoard,
  runSolveRules,
} from "domains/Queens/helpers/solver/solveBoard";
import { useMakeMove } from "domains/Queens/hooks/useMakeMove";

import { Board } from "domains/Queens/sharedTypes";

import * as React from "react";

export const clearAllTokens = (board: Board) => {
  for (let row of board) {
    for (let tile of row) {
      tile.token = "";
    }
  }
};

export const PlayableBoard = ({
  initialBoard,
  onWin,
  hasWon,
}: {
  initialBoard?: Board;
  onWin?: (board: Board) => void;
  hasWon?: boolean;
}) => {
  const [board, setBoard] = React.useState(initialBoard ?? []);

  React.useEffect(() => {
    setBoard(initialBoard ?? []);
  }, [initialBoard]);

  const { undoLastMove, onClickTile, onDragTouchOntoTile } = useMakeMove({
    board,
    setBoard,
    onWin,
  });

  const clearBoard = React.useCallback(() => {
    const newBoard = copyBoard(board);
    clearAllTokens(newBoard);
    setBoard(newBoard);
  }, [board, setBoard]);

  const solveBoard = React.useCallback(() => {
    const newBoard = copyBoard(board);
    runSolveRules(newBoard);
    console.log("finished narrowing down board");
    setBoard(newBoard);
  }, [board, setBoard]);

  const runRotateBoard = React.useCallback(() => {
    const newBoard = rotateBoard(board);
    addBordersToBoard(newBoard);
    console.log("finished narrowing down board");
    setBoard(newBoard);
  }, [board, setBoard]);

  if (!board?.length) return null;

  return (
    <Stack direction={"column"} gap={2}>
      <PrimaryButton onClick={clearBoard} disabled={hasWon}>
        Clear board
      </PrimaryButton>
      <BoardDisplay
        board={board}
        onClickTile={onClickTile}
        hasWon={hasWon}
        onDragTouchOntoTile={onDragTouchOntoTile}
      />
      <Stack gap={2}>
        <PrimaryButton onClick={undoLastMove} disabled={hasWon}>
          Undo last move
        </PrimaryButton>
        {false && (
          <PrimaryButton onClick={solveBoard}>
            Solve some of the board
          </PrimaryButton>
        )}
        {false && (
          <PrimaryButton onClick={runRotateBoard}>rotate board</PrimaryButton>
        )}
      </Stack>
    </Stack>
  );
};
