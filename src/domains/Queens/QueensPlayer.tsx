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
import { Timer } from "domains/Queens/components/Timer";
import { WinTime } from "domains/Queens/components/Time";
import {
  getStarPositions,
  getStorageTimeObject,
  saveBoardProgress,
} from "domains/Queens/helpers/localStorageHelper";
import { Board } from "domains/Queens/sharedTypes";

export const QueensPlayer = () => {
  const [sideLength, setSideLength] = React.useState(SIDE_LENGTH_OPTIONS[0]);
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [endTime, setEndTime] = React.useState<number | undefined>();

  const {
    board,
    prevBoard,
    disablePrev,
    nextBoard,
    disableNext,
    currentBoardIndex,
    maxBoardIndex,
  } = useNavigateBoards({ sideLength });

  const onWin = React.useCallback(
    (board: Board) => {
      setEndTime(new Date().getTime());
      const timeTaken = new Date().getTime() - startTime;
      saveBoardProgress({
        newTimeStorageObject: {
          time: timeTaken,
          isFinished: true,
          starPositions: getStarPositions(board),
        },
        boardSize: sideLength,
        seedIndex: currentBoardIndex,
      });
    },
    [setEndTime, currentBoardIndex, sideLength, startTime]
  );

  React.useEffect(() => {
    setStartTime(new Date().getTime());
    setEndTime(undefined);
  }, [currentBoardIndex, sideLength]);

  const timeTaken = React.useMemo(() => {
    const time = getStorageTimeObject({
      boardSize: sideLength,
      seedIndex: currentBoardIndex,
    })?.time;
    if (time !== undefined) {
      console.log("found time in storage! " + time);
      setEndTime(1);
      return time * 1000;
    }
    if (endTime !== undefined) {
      return endTime - startTime;
    }
    return new Date().getTime() - startTime;
  }, [startTime, endTime, sideLength, currentBoardIndex]);

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
      {endTime === undefined ? (
        <Timer startTime={startTime} />
      ) : (
        <WinTime timeTaken={timeTaken} />
      )}
      <PlayableBoard initialBoard={board} onWin={onWin} />
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
