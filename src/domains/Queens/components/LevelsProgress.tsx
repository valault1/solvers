import { Box, LinearProgress } from "@mui/material";

import { getSeeds } from "domains/Queens/boards/seeds";

import { getStorageTimeObject } from "domains/Queens/helpers/localStorageHelper";
import * as React from "react";

export const LevelsProgress = ({
  boardSize,
  width,
}: {
  boardSize: number;
  width?: number;
}) => {
  const levelsFinished = React.useMemo(() => {
    return getSeeds(boardSize)
      .map((seed, i) => {
        return getStorageTimeObject({ seedIndex: i, boardSize });
      })
      .filter((obj) => obj.isFinished).length;
  }, [boardSize]);

  const totalLevels = getSeeds(boardSize).length;
  const value = (levelsFinished / totalLevels) * 100;
  return (
    <Box sx={{ width, justifyContent: "center", alignItems: "center" }} gap={2}>
      Completed {levelsFinished} / {totalLevels} {boardSize}x{boardSize} boards
      <br />
      <br />
      <LinearProgress variant="determinate" color="secondary" value={value} />
    </Box>
  );
};
