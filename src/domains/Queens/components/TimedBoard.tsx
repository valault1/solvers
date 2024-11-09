import { Stack } from "@mui/material";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import * as React from "react";
import { Timer } from "domains/Queens/components/Timer";
import { WinTime } from "domains/Queens/components/Time";
import { Board } from "domains/Queens/sharedTypes";

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
      {!hasWon ? (
        <Timer startTime={startTime} />
      ) : (
        <WinTime timeTaken={timeTaken} />
      )}
      <PlayableBoard
        initialBoard={initialBoard}
        onWin={handleWin}
        hasWon={hasWon}
      />
    </Stack>
  );
};
