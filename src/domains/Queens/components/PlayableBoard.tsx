import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { DETERMINISTIC_SEEDS } from "domains/Queens/boards/seeds";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";
import { generateBoardFromSeed } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { RNG } from "domains/Queens/helpers/randomNum";
import { copyBoard } from "domains/Queens/helpers/solver/solveBoard";
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

export const PlayableBoard = ({ initialBoard }: { initialBoard?: Board }) => {
  const [board, setBoard] = React.useState(initialBoard ?? []);

  React.useEffect(() => {
    setBoard(initialBoard ?? []);
  }, [initialBoard]);

  const { hasWon, undoLastMove, onClickTile } = useMakeMove({
    board,
    setBoard,
  });

  const clearBoard = React.useCallback(() => {
    const newBoard = copyBoard(board);
    clearAllTokens(newBoard);
    setBoard(newBoard);
  }, [board, setBoard]);

  if (!board?.length) return null;

  return (
    <Stack direction={"column"} gap={2}>
      {hasWon ? <div>You win!</div> : <br />}
      <PrimaryButton onClick={clearBoard}>Clear board</PrimaryButton>
      <BoardDisplay board={board} onClickTile={onClickTile} />
      <Stack gap={2}>
        <PrimaryButton onClick={undoLastMove}>Undo last move</PrimaryButton>
      </Stack>
    </Stack>
  );
};
