import { SIDE_LENGTH_OPTIONS, getSeeds } from "domains/Queens/boards/seeds";
import { getFirstUnfinishedBoard } from "domains/Queens/helpers/localStorageHelper";

import React from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_SEED_INDEX = getFirstUnfinishedBoard({
  boardSize: 8,
});

export const SEED_INDEX_PARAM = "seedIndex";
export const BOARD_SIZE_PARAM = "boardSize";

export const useNavigateBoards = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const startingIndex =
    parseInt(searchParams.get(SEED_INDEX_PARAM)) || undefined;
  const startingBoardSize =
    parseInt(searchParams.get(BOARD_SIZE_PARAM)) || undefined;

  const [boardSize, setBoardSize] = React.useState(
    startingBoardSize || SIDE_LENGTH_OPTIONS[0]
  );

  const seeds = React.useMemo(() => {
    return getSeeds(boardSize);
  }, [boardSize]);

  const handleSetBoardSize = React.useCallback(
    (size: number) => {
      setBoardSize(size);
      setSearchParams({ [BOARD_SIZE_PARAM]: size.toString() });
      setCurrentBoardIndex(getFirstUnfinishedBoard({ boardSize: size }));
    },
    [setBoardSize, setSearchParams]
  );

  const [currentBoardIndex, setCurrentBoardIndex] = React.useState(
    startingIndex || DEFAULT_SEED_INDEX
  );

  const disableNext = currentBoardIndex >= seeds.length - 1;
  const disablePrev = currentBoardIndex <= 0;

  const handleSetCurrentBoardIndex = React.useCallback(
    (index: number) => {
      setCurrentBoardIndex(index);
      setSearchParams({ [SEED_INDEX_PARAM]: index.toString() });
    },
    [setCurrentBoardIndex, setSearchParams]
  );

  const nextBoard = React.useCallback(() => {
    const newIndex = currentBoardIndex + 1;
    handleSetCurrentBoardIndex(newIndex);
  }, [currentBoardIndex, handleSetCurrentBoardIndex]);

  const prevBoard = React.useCallback(() => {
    const newIndex = currentBoardIndex - 1;
    handleSetCurrentBoardIndex(newIndex);
  }, [currentBoardIndex, handleSetCurrentBoardIndex]);

  // const numBoardsCompleted = React.useMemo(() => {
  //   return getSeeds(boardSize)
  //     .map((seed, i) => {
  //       return getStorageTimeObject({ seedIndex: i, boardSize });
  //     })
  //     .filter((obj) => obj.isFinished).length;
  // }, [boardSize]);
  return {
    nextBoard,
    prevBoard,
    disableNext,
    disablePrev,
    currentBoardIndex,
    maxBoardIndex: seeds.length,
    boardSize,
    setBoardSize: handleSetBoardSize,
  };
};
