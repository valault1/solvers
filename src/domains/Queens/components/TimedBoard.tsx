import { Stack } from "@mui/material";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import * as React from "react";
import { WinTime } from "domains/Queens/components/Time";
import { Board } from "domains/Queens/sharedTypes";
import { TimerDisplayV2 } from "domains/Queens/components/TimerDisplayV2";
import usePageVisibility from "domains/Queens/hooks/usePageVisibility";
import { Timer } from "shared/helpers/Timer";
import { TimerDisplay } from "domains/Queens/components/TimerDisplay";

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
      {!hasWon ? (
        <TimerDisplay startTime={startTime} />
      ) : (
        <WinTime timeTaken={finishTime} />
      )}
      {/* todo: make this only show when focused */}
      {(isFocused || true) && (
        <PlayableBoard
          // TODO: this component expects to control board, but currently PlayableBoard controls board
          initialBoard={board}
          onWin={handleWin}
          hasWon={hasWon}
        />
      )}
    </Stack>
  );
};
