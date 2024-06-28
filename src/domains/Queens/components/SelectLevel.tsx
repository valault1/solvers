import { CheckCircle, Circle } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { DEFAULT_SIDE_LENGTH } from "domains/Queens/QueensPlayer";
import { getSeeds } from "domains/Queens/boards/seeds";

import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
import { getStorageTimeObject } from "domains/Queens/helpers/localStorageHelper";
import {
  BOARD_SIZE_PARAM,
  SEED_INDEX_PARAM,
} from "domains/Queens/hooks/useNavigateBoards";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SelectLevel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [boardSize, setBoardSize] = React.useState(
    parseInt(searchParams.get(BOARD_SIZE_PARAM)) || DEFAULT_SIDE_LENGTH
  );

  const levelProgresses = React.useMemo(() => {
    return getSeeds(boardSize).map((seed, i) => {
      return getStorageTimeObject({ seedIndex: i, boardSize });
    });
  }, [boardSize]);

  const seeds = getSeeds(boardSize);
  return (
    <MainContainer gap={12}>
      Level select <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
      <Stack
        direction="row"
        gap={2}
        //maxWidth={"800px"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {seeds.map((seed, i) => {
          const levelNum = i + 1;
          const isFinished = levelProgresses[i]?.isFinished;
          return (
            <PrimaryButton
              variant="text"
              color={isFinished ? "success" : "info"}
              onClick={() => {
                const newPath = `/queensplayer?${SEED_INDEX_PARAM}=${i}&${BOARD_SIZE_PARAM}=${boardSize}`;
                console.log({ newPath });
                navigate(newPath);
              }}
            >
              <Stack direction="column">
                {levelNum}
                {isFinished ? <CheckCircle /> : <Circle />}
              </Stack>
            </PrimaryButton>
          );
        })}
        {/* {seedsMatrix.map((seed, i) => (
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
                  onClick={() => {
                    const newPath = `/queensplayer?${SEED_INDEX_PARAM}=${index}&${BOARD_SIZE_PARAM}=${boardSize}`;
                    console.log({ newPath });
                    navigate(newPath);
                  }}
                >
                  <Stack direction="column">
                    {index + 1}
                    {isFinished ? <CheckCircle /> : <Circle />}
                  </Stack>
                </PrimaryButton>
              );
            })}
          </Stack>
        ))} */}
      </Stack>
    </MainContainer>
  );
};
