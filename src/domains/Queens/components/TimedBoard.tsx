import { Card, Stack } from "@mui/material";

import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";

import * as React from "react";
import { TimerDisplay } from "domains/Queens/components/TimerDisplay";
import { WinTime } from "domains/Queens/components/Time";

import { Board } from "domains/Queens/sharedTypes";

import { useNavigate } from "react-router-dom";
import { TimerDisplayV2 } from "domains/Queens/components/TimerDisplayV2";
import usePageVisibility from "domains/Queens/hooks/usePageVisibility";

export const TimedBoard = ({
  initialBoard,
  finishTime,
  saveBoard,
  onWin,
}: {
  initialBoard?: Board;
  finishTime?: number;
  saveBoard: ({
    board,
    timeTaken,
  }: {
    board: Board;
    timeTaken: number;
  }) => void;
  onWin: (timeTaken: number) => void;
}) => {
  const { isVisible, isFocused } = usePageVisibility({});
  console.log({ finishTime, initialBoard });
  const [startTime] = React.useState(new Date().getTime());
  const [hasWon, setHasWon] = React.useState(finishTime !== undefined);
  const [timeTaken, setTimeTaken] = React.useState(finishTime ?? 0);

  const handleWin = React.useCallback(
    (board: Board) => {
      const newTimeTaken = new Date().getTime() - startTime;
      setHasWon(true);
      saveBoard?.({ board, timeTaken: newTimeTaken });
      setTimeTaken(newTimeTaken);
      onWin?.(newTimeTaken);
    },
    [setHasWon, startTime, saveBoard]
  );

  return (
    <Stack justifyContent="center" alignItems={"center"} gap={1}>
      {!hasWon || true ? <TimerDisplayV2 /> : <WinTime timeTaken={timeTaken} />}
      {isFocused && (
        <PlayableBoard
          initialBoard={initialBoard}
          onWin={handleWin}
          hasWon={hasWon}
        />
      )}
    </Stack>
  );
};
