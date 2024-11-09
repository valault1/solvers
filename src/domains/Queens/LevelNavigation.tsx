import * as React from "react";
import { Menu, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { BOARD_SIZE_PARAM } from "domains/Queens/hooks/useNavigateBoards";
import { PATHS } from "shared/helpers/paths";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftOutlined,
  East,
  KeyboardBackspace,
  List,
  MenuBook,
  TurnLeft,
  West,
} from "@mui/icons-material";
import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
export const LevelNavigation = ({
  prevBoard,
  disablePrev,
  nextBoard,
  disableNext,
  currentBoardIndex,
  maxBoardIndex,
  boardSize,
}: {
  prevBoard: VoidFunction;
  disablePrev: boolean;
  nextBoard: VoidFunction;
  disableNext: boolean;
  currentBoardIndex: number;
  maxBoardIndex: number;
  boardSize: number;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack gap={2} direction="row" alignItems="center">
        <PrimaryButton onClick={prevBoard} disabled={disablePrev}>
          <West />
        </PrimaryButton>
        {currentBoardIndex + 1} of {maxBoardIndex}
        <PrimaryButton onClick={nextBoard} disabled={disableNext}>
          <East />
        </PrimaryButton>
        {/* <BoardSizeSelect onChange={() => {}} value={8} /> */}
        <PrimaryButton
          onClick={() =>
            navigate(`${PATHS.levelSelect}?${BOARD_SIZE_PARAM}=${boardSize}`)
          }
        >
          <List />
        </PrimaryButton>
      </Stack>
    </>
  );
};
