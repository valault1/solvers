import { CheckCircle, Circle } from "@mui/icons-material";
import { Box, LinearProgress, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { getSeeds } from "domains/Queens/boards/seeds";

import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
import { getStorageTimeObject } from "domains/Queens/helpers/localStorageHelper";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const LEVELS_PER_ROW = 10;
const sliceArrayIntoRows = (arr: any[], rowLength: number) => {
  const rows = [];
  for (let i = 0; i < arr.length; i += rowLength) {
    rows.push(arr.slice(i, i + rowLength));
  }
  return rows;
};

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
