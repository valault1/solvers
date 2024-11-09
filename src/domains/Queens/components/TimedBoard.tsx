import { Stack } from "@mui/material";

import { PlayableBoard } from "domains/Queens/components/PlayableBoard";

import * as React from "react";
import { WinTime } from "domains/Queens/components/Time";

import { Board } from "domains/Queens/sharedTypes";

import { TimerDisplayV2 } from "domains/Queens/components/TimerDisplayV2";
import usePageVisibility from "domains/Queens/hooks/usePageVisibility";
import { Timer } from "shared/helpers/Timer";

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
  const { current: timer } = React.useRef(new Timer());
  const [board, setBoard] = React.useState(initialBoard ?? []);

  React.useEffect(() => {
    setBoard(initialBoard ?? []);
  }, [initialBoard]);
  const { isFocused } = usePageVisibility({});
  console.log({ finishTime, initialBoard });
  const [startTime] = React.useState(new Date().getTime());
  const [hasWon, setHasWon] = React.useState(!!finishTime);

  const handleWin = React.useCallback(
    (board: Board) => {
      const newTimeTaken = new Date().getTime() - startTime;
      setHasWon(true);
      saveBoard?.({ board, timeTaken: newTimeTaken });
      onWin?.(newTimeTaken);
    },
    [setHasWon, startTime, saveBoard, onWin]
  );

  return (
    <Stack justifyContent="center" alignItems={"center"} gap={1}>
      {!hasWon || true ? (
        <TimerDisplayV2 hasWon={hasWon} timer={timer} />
      ) : (
        <WinTime timeTaken={10} />
      )}

      {isFocused && (
        <PlayableBoard
          board={board}
          setBoard={setBoard}
          onWin={handleWin}
          hasWon={hasWon}
        />
      )}
    </Stack>
  );
};
