import {
  MOCK_BLANK_BOARD,
  MOCK_BLANK_BOARD_2,
} from "domains/Queens/mocks/mocks";
import React from "react";
import { Card, Stack } from "@mui/material";
import {
  copyBoard,
  createBoardFromBlankBoard,
  eliminateSquares,
  markGuaranteedPlacements,
  narrowDownBoard,
  populateColorCounts,
} from "domains/Queens/helpers/solveBoard";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";
import { PrimaryButton } from "components/Form.elements";

const EMPTY_BOARD = createBoardFromBlankBoard(MOCK_BLANK_BOARD_2);

const SolveBoardPlayground = () => {
  const [board, setBoard] = React.useState(EMPTY_BOARD);

  React.useEffect(() => {
    populateColorCounts(MOCK_BLANK_BOARD);
  }, []);
  const runPlaceQueens = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      markGuaranteedPlacements(newBoard);
      return newBoard;
    });
  };

  const runEliminateSquares = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      eliminateSquares(newBoard);
      console.log({ newBoard });
      return newBoard;
    });
  };

  const runNarrowDownBoard = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      narrowDownBoard(newBoard);

      return newBoard;
    });
  };

  return (
    <Card style={{ padding: "20px", maxWidth: "350px" }}>
      <Stack justifyContent="center" alignItems="center" gap="12px">
        <b>
          <u>Board Playground</u>
        </b>
        <BoardDisplay board={board} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <PrimaryButton onClick={runPlaceQueens}>Place Queens</PrimaryButton>
          <PrimaryButton onClick={runEliminateSquares}>
            Eliminate Squares
          </PrimaryButton>
          <PrimaryButton onClick={runNarrowDownBoard}>
            Narrow down board
          </PrimaryButton>
          <PrimaryButton onClick={() => setBoard(EMPTY_BOARD)}>
            Clear Board
          </PrimaryButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SolveBoardPlayground;
