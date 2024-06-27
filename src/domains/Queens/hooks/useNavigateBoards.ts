import { SEED_INDEX_PARAM } from "domains/Queens/QueensPlayer";
import { getSeeds } from "domains/Queens/boards/seeds";
import { getFirstUnfinishedBoard } from "domains/Queens/helpers/localStorageHelper";

import React from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_SEED_INDEX = getFirstUnfinishedBoard({
  boardSize: 8,
});

export const useNavigateBoards = ({ sideLength }: { sideLength: number }) => {
  const [searchParams] = useSearchParams();

  const startingIndex =
    parseInt(searchParams.get(SEED_INDEX_PARAM)) || undefined;
  console.log({ startingIndex, searchParams });
  const seeds = React.useMemo(() => {
    return getSeeds(sideLength);
  }, [sideLength]);

  console.log({ startingIndex, DEFAULT_SEED_INDEX });

  const [currentBoardIndex, setCurrentBoardIndex] = React.useState(
    startingIndex || DEFAULT_SEED_INDEX
  );

  const disableNext = currentBoardIndex >= seeds.length - 1;
  const disablePrev = currentBoardIndex <= 0;

  React.useEffect(() => {
    setCurrentBoardIndex(getFirstUnfinishedBoard({ boardSize: sideLength }));
  }, [sideLength]);

  const nextBoard = React.useCallback(() => {
    setCurrentBoardIndex((prev) => prev + 1);
  }, [setCurrentBoardIndex]);

  const prevBoard = React.useCallback(() => {
    setCurrentBoardIndex((prev) => prev - 1);
  }, [setCurrentBoardIndex]);
  return {
    nextBoard,
    prevBoard,
    disableNext,
    disablePrev,
    currentBoardIndex,
    maxBoardIndex: seeds.length,
  };
};
