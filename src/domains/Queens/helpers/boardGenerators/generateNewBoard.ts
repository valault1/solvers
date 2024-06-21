import { BOARD_COLOR_NAMES } from "domains/Queens/constants/constants";
import { generateBorders } from "domains/Queens/helpers/boardGenerators/generateBorders";
import { generateRegionsV2 } from "domains/Queens/helpers/boardGenerators/generateBordersV2";
import { range, RNG } from "domains/Queens/helpers/randomNum";
import {
  Board,
  BoardColor,
  BoardWithBorders,
  Coords,
} from "domains/Queens/sharedTypes";

const areValidRowPlacements = (
  rowPlacements: number[],
  colPlacements: number[]
): boolean => {
  let coords = range(rowPlacements.length).map((i) => {
    return { row: rowPlacements[i], col: colPlacements[i] };
  });

  for (let i = 1; i < coords.length; i++) {
    // check for conflict between this and the previous star
    let currentStar = coords[i];
    let prevStar = coords[i - 1];
    if (
      currentStar.col <= prevStar.col + 1 &&
      currentStar.col >= prevStar.col - 1
    ) {
      return false;
    }
  }
  return true;
};

const getStarPositions = (sideLength: number, rng: RNG): Coords[] => {
  let isValid = false;
  let counter = 0;
  let rowPlacements = range(sideLength);
  let colPlacements: number[] = [];
  while (!isValid && counter < 50) {
    colPlacements = rng.getNumbersInRangeInRandomOrder(sideLength);
    isValid = true; //areValidRowPlacements(rowPlacements, colPlacements);
    counter++;
  }
  //console.log("got star positions - iterations: " + counter);

  let positions: Coords[] = [];
  for (let i = 0; i < sideLength; i++) {
    positions.push({ row: rowPlacements[i], col: colPlacements[i] });
  }
  return positions;
};

const getColorSizes = (sideLength: number, rng: RNG): number[] => {
  // each number is between 2 and 3x the max
  // So for each number, generate a random number between 2 and min(3x max, rest of the sum)
  // for a 10x10:
  // pick 20. Make sure to leave enough space for each one after that 20 to be size 4.
  // pick 5. Then the number has to be between 2 and min(30, 75 - 16)

  const hardMax = sideLength * 3;
  const minSize = 2;
  const spaceToLeaveForEachRemainingColor = 5;
  let remainingSquares = sideLength * sideLength;
  const sizes = range(sideLength).map((i) => {
    const numRemainingColors = sideLength - (i + 1);
    const maxSize = Math.min(
      remainingSquares - spaceToLeaveForEachRemainingColor * numRemainingColors,
      hardMax
    );
    const num = rng.getRandomNumInRangeInclusive(minSize, maxSize);
    remainingSquares -= num;
    return num;
  });
  return sizes;
};

export const colorsToRegions = (board: Board): Board => {
  return board.map((row, i) =>
    row.map((tile, j) => ({
      token: "",
      color: BOARD_COLOR_NAMES[tile.region] as BoardColor,
    }))
  );
};

export const generateBoardFromSeed = (
  sideLength: number,
  seed: number
): Board => {
  const rng = new RNG(seed);

  const starPositions = getStarPositions(10, rng);
  const regionSizes = getColorSizes(sideLength, rng);

  // const board: BoardWithBorders = generateBorders({
  //   starPositions,
  //   regionSizes,
  //   rng,
  // });

  const board = generateRegionsV2({
    starPositions,
    regionSizes,
    rng,
  });

  const coloredBoard = colorsToRegions(board);

  return coloredBoard;
};
