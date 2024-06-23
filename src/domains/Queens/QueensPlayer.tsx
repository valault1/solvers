import { Card, MenuItem, Select, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { useNavigateBoards } from "domains/Queens/hooks/useNavigateBoards";
import { SIDE_LENGTH_OPTIONS } from "domains/Queens/boards/seeds";

import * as React from "react";

export const QueensPlayer = () => {
  const [sideLength, setSideLength] = React.useState(SIDE_LENGTH_OPTIONS[0]);
  const {
    board,
    prevBoard,
    disablePrev,
    nextBoard,
    disableNext,
    currentBoardIndex,
    maxBoardIndex,
  } = useNavigateBoards({ sideLength });

  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Play Queens!</h1>
      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        These boards are randomly generated. They are guaranteed to be solvable
        without guessing!
      </Card>
      <Stack direction="column" gap={2}>
        Select board size:
        <Select
          value={sideLength}
          native={false}
          onChange={(e) => {
            const val = e.target.value;
            // @ts-ignore
            setSideLength(val);
          }}
          fullWidth
        >
          {SIDE_LENGTH_OPTIONS.map((length) => (
            <MenuItem value={length}>
              {length}x{length}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <PlayableBoard initialBoard={board} />
      <Stack gap={2} direction="row">
        <PrimaryButton fullWidth onClick={prevBoard} disabled={disablePrev}>
          Previous board
        </PrimaryButton>
        <PrimaryButton fullWidth onClick={nextBoard} disabled={disableNext}>
          Next board
        </PrimaryButton>
      </Stack>
      board {currentBoardIndex + 1} of {maxBoardIndex}
    </MainContainer>
  );
};
