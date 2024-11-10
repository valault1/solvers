import styled from "@emotion/styled";
import { CheckCircle, Circle } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { theme } from "components/theme/theme";
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

const successGreen = "#66bb6a";
export const Level = styled.div<{ isFinished?: boolean }>(({ isFinished }) => ({
  color: isFinished ? successGreen : theme.colors.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  cursor: "pointer",
  //"&:hover": { backgroundColor: "rgba(102,187,106,.1)" },

  "&:hover": {
    backgroundColor:
      // add an opacity of 20 (out of FF) to the green
      `${successGreen}20`,
  },
  paddingBottom: "10px",
  borderRadius: "5px",
}));

const PAGE_SIZE = 100;
export const SelectLevel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [boardSize, setBoardSize] = React.useState(
    parseInt(searchParams.get(BOARD_SIZE_PARAM)) || DEFAULT_SIDE_LENGTH
  );
  const [pageIndex, setPageIndex] = React.useState(0);
  const totalOffset = React.useMemo(() => {
    return PAGE_SIZE * pageIndex;
  }, [pageIndex]);

  const seeds = React.useMemo(() => getSeeds(boardSize), [boardSize]);

  const levelProgresses = React.useMemo(() => {
    return seeds.map((seed, i) => {
      return getStorageTimeObject({ seedIndex: i, boardSize });
    });
  }, [seeds, boardSize]);

  const paginatedSeeds = React.useMemo(() => {
    const result = seeds.slice(totalOffset, totalOffset + PAGE_SIZE);
    return result;
  }, [seeds, totalOffset]);

  const { disableNextPage, disablePrevPage, numPages } = React.useMemo(() => {
    const numPages = Math.ceil(seeds.length / PAGE_SIZE);
    return {
      numPages,
      disableNextPage: pageIndex >= numPages - 1,
      disablePrevPage: pageIndex <= 0,
    };
  }, [pageIndex, seeds]);

  return (
    <MainContainer gap={12}>
      Level select <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
      <Stack
        gap={2}
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PrimaryButton
          variant={"outlined"}
          onClick={() => {
            setPageIndex((prev) => prev - 1);
          }}
          disabled={disablePrevPage}
        >
          Prev
        </PrimaryButton>
        Page {pageIndex + 1} of {numPages}
        <PrimaryButton
          variant={"outlined"}
          onClick={() => {
            setPageIndex((prev) => prev + 1);
          }}
          disabled={disableNextPage}
        >
          Next
        </PrimaryButton>
      </Stack>
      <Stack
        direction="row"
        gap={2}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {paginatedSeeds.map((seed, i) => {
          const levelIndex = i + totalOffset;
          const isFinished = levelProgresses[levelIndex]?.isFinished;
          return (
            <>
              {/* <Level
                onClick={() => {
                  const newPath = `/queensplayer?${SEED_INDEX_PARAM}=${i}&${BOARD_SIZE_PARAM}=${boardSize}`;
                  console.log({ newPath });
                  navigate(newPath);
                }}
                isFinished={isFinished}
              >
                <Stack direction="column">
                  {levelNum}
                  {isFinished ? <CheckCircle /> : <Circle />}
                </Stack>
              </Level> */}
              <PrimaryButton
                variant="text"
                color={isFinished ? "success" : "info"}
                onClick={() => {
                  const newPath = `/queensplayer?${SEED_INDEX_PARAM}=${levelIndex}&${BOARD_SIZE_PARAM}=${boardSize}`;
                  console.log({ newPath });
                  navigate(newPath);
                }}
                key={i}
              >
                <Stack direction="column">
                  {levelIndex + 1}
                  {isFinished ? <CheckCircle /> : <Circle />}
                </Stack>
              </PrimaryButton>
            </>
          );
        })}
      </Stack>
    </MainContainer>
  );
};
