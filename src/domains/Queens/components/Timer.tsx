import { Stack } from "@mui/material";

import * as React from "react";

const TIMER_UPDATE_INTERVAL_MS = 200;

export const Timer = ({ startTime }: { startTime: number }) => {
  React.useEffect(() => {
    setTimeTaken(0);
    const interval = setInterval(
      () => setTimeTaken(new Date().getTime() - startTime),
      TIMER_UPDATE_INTERVAL_MS
    );

    return () => clearInterval(interval);
  }, [startTime]);

  const [timeTaken, setTimeTaken] = React.useState<number>(
    new Date().getTime() - startTime
  );

  const seconds = React.useMemo(
    () => twoDigits(Math.floor(timeTaken / 1000) % 60),
    [timeTaken]
  );
  const minutes = React.useMemo(
    () => twoDigits(Math.floor(timeTaken / 1000 / 60)),
    [timeTaken]
  );

  return (
    <Stack direction="column">
      {minutes}:{seconds}
    </Stack>
  );
};

const twoDigits = (num: number) => String(num).padStart(2, "0");
