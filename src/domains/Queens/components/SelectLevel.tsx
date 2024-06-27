import { CheckCircle, Circle } from "@mui/icons-material";
import { Stack } from "@mui/material";
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

export const SelectLevel = () => {
  const navigate = useNavigate();
  const [boardSize, setBoardSize] = React.useState(8);
  const seedsMatrix = React.useMemo(() => {
    const seeds = getSeeds(boardSize);

    return sliceArrayIntoRows(seeds, LEVELS_PER_ROW);
  }, [boardSize]);

  const levelProgresses = React.useMemo(() => {
    return getSeeds(boardSize).map((seed, i) => {
      return getStorageTimeObject({ seedIndex: i, boardSize });
    });
  }, [boardSize]);
  return (
    <MainContainer gap={12}>
      Level select <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
      <Stack
        direction="column"
        gap={2}
        width="100%"
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {seedsMatrix.map((seed, i) => (
          <Stack
            direction="row"
            gap={0}
            justifyContent={"start"}
            // paddingLeft={12}
            // paddingRight={12}
          >
            {seed.map((s, j) => {
              const index = i * LEVELS_PER_ROW + j;
              const isFinished = levelProgresses[index]?.isFinished;
              return (
                <PrimaryButton
                  variant="text"
                  color={isFinished ? "success" : "info"}
                  onClick={() =>
                    navigate(
                      `/queensplayer?seedIndex=${index}&boardSize=${boardSize}`
                    )
                  }
                >
                  <Stack direction="column">
                    {index + 1}
                    {isFinished ? <CheckCircle /> : <Circle />}
                  </Stack>
                </PrimaryButton>
              );
            })}
          </Stack>
        ))}
      </Stack>
    </MainContainer>
  );
};
