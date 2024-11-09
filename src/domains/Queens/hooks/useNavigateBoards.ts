import { getSeeds } from "domains/Queens/boards/seeds";
import { getFirstUnfinishedBoard } from "domains/Queens/helpers/localStorageHelper";

import React from "react";
import { useSearchParams } from "react-router-dom";

export const DEFAULT_SIDE_LENGTH = 8;

export const SEED_INDEX_PARAM = "seedIndex";
export const BOARD_SIZE_PARAM = "boardSize";

export const useNavigateBoards = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const startingBoardSize = React.useMemo(() => {
    const param = parseInt(searchParams.get(BOARD_SIZE_PARAM)) || undefined;
    return param || DEFAULT_SIDE_LENGTH;
  }, [searchParams]);

  const startingIndex = React.useMemo(() => {
    const param = parseInt(searchParams.get(SEED_INDEX_PARAM)) || undefined;
    if (param) return param;
    if (!!startingBoardSize)
      return getFirstUnfinishedBoard({ boardSize: startingBoardSize });
    return 0;
  }, [searchParams, startingBoardSize]);

  const [boardSize, setBoardSize] = React.useState(
    startingBoardSize || DEFAULT_SIDE_LENGTH
  );

  const seeds = React.useMemo(() => {
    return getSeeds(boardSize);
  }, [boardSize]);

  const setSearchParam = React.useCallback(
    ({ key, value }: { key: string; value: string }) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  const handleSetBoardSize = React.useCallback(
    (size: number) => {
      setBoardSize(size);
      // Add the new query param value to the queryString
      setSearchParams({ [BOARD_SIZE_PARAM]: size.toString() });
      setCurrentBoardIndex(getFirstUnfinishedBoard({ boardSize: size }));
    },
    [setBoardSize, setSearchParams]
  );

  const [currentBoardIndex, setCurrentBoardIndex] =
    React.useState(startingIndex);

  const disableNext = currentBoardIndex >= seeds.length - 1;
  const disablePrev = currentBoardIndex <= 0;

  const handleSetCurrentBoardIndex = React.useCallback(
    (index: number) => {
      setCurrentBoardIndex(index);
      setSearchParam({ key: SEED_INDEX_PARAM, value: index.toString() });
    },
    [setCurrentBoardIndex, setSearchParam]
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
