import {
  HourglassBottomRounded,
  HourglassEmpty,
  HourglassFull,
  HourglassFullOutlined,
  LockClock,
  PunchClock,
  Timer3,
  Watch,
} from "@mui/icons-material";
import { Badge, Card, Paper, Stack } from "@mui/material";
import { WinTime } from "domains/Queens/components/Time";
import { useBoardTimerDisplay } from "domains/Queens/hooks/useBoardTimer";

import * as React from "react";
import { Timer } from "shared/helpers/Timer";

export const millisecondsToTimeFormat = (ms: number) => {
  return `${twoDigits(Math.floor(ms / 1000 / 60))}:${twoDigits(
    Math.floor(ms / 1000) % 60
  )}`;
};

export const TimerDisplayV2 = ({
  hasWon,
  timer,
}: {
  hasWon: boolean;
  timer: Timer;
}) => {
  const { timeTaken } = useBoardTimerDisplay({ timer });
  const seconds = React.useMemo(
    () => twoDigits(Math.floor(timeTaken / 1000) % 60),
    [timeTaken]
  );
  const minutes = React.useMemo(
    () => twoDigits(Math.floor(timeTaken / 1000 / 60)),
    [timeTaken]
  );

  if (hasWon) return <WinTime timeTaken={timeTaken} />;

  return (
    <Stack direction="column">
      <Card
        style={{
          borderRadius: "15px",
          padding: "8px",
          width: "70px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HourglassEmpty />
          {millisecondsToTimeFormat(timeTaken)}
        </Paper>
      </Card>
    </Stack>
  );
};

const twoDigits = (num: number) => String(num).padStart(2, "0");
