import { Stack } from "@mui/material";

import * as React from "react";

export const WinTime = ({ timeTaken }: { timeTaken: number }) => {
  const seconds = React.useMemo(
    () => twoDigits((timeTaken / 1000) % 60),
    [timeTaken]
  );
  const minutes = React.useMemo(
    () => twoDigits(Math.floor(timeTaken / 1000 / 60)),
    [timeTaken]
  );

  return (
    <Stack direction="column">
      You finished in {minutes}:{seconds}
    </Stack>
  );
};

const twoDigits = (num: number) => String(num).padStart(2, "0");
