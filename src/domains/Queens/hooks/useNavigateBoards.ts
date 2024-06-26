import { getSeeds } from "domains/Queens/boards/seeds";
import { getFirstUnfinishedBoard } from "domains/Queens/helpers/localStorageHelper";

import React from "react";

const DEFAULT_SEED_INDEX = 0;

export const useNavigateBoards = ({ sideLength }: { sideLength: number }) => {
  const seeds = React.useMemo(() => {
    return getSeeds(sideLength);
  }, [sideLength]);

  const [currentBoardIndex, setCurrentBoardIndex] =
    React.useState(DEFAULT_SEED_INDEX);

  // React.useEffect(() => {
  //   const newBoard = generateBoardFromSeed(
  //     sideLength,
  //     seeds[currentBoardIndex]
  //   );

  //   const { isFinished, time, starPositions }: TimeStorageObject =
  //     getStorageTimeObject({
  //       boardSize: sideLength,
  //       seedIndex: currentBoardIndex,
  //     });

  //   if (isFinished) {
  //     starPositions.forEach(({ row, col }) => placeQueen(newBoard, row, col));
  //   }

  //   addBordersToBoard(newBoard);
  //   console.log({ newBoard });
  //   setBoard(newBoard);
  // }, [currentBoardIndex, seeds, sideLength]);

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
