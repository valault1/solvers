import { BOARD_COLOR_NAMES } from "domains/Queens/constants/constants";
import { generateRegionsV2 } from "domains/Queens/helpers/boardGenerators/generateBordersV2";
import { generateBoardFromSeedV2 } from "domains/Queens/helpers/boardGenerators/generateNewBoardV2-static";
import { generateBoardFromSeedV3 } from "domains/Queens/helpers/boardGenerators/generateNewBoardV3-static";
import { range, RNG } from "domains/Queens/helpers/randomNum";
import { Board, BoardColor, Coords } from "domains/Queens/sharedTypes";

const addBordersToTile = (board: Board, row: number, col: number) => {
  const max = board.length - 1;
  const currentRegion = board[row][col].region;

  if (row > 0 && currentRegion !== board[row - 1][col].region) {
    board[row][col].top = true;
  } else {
    board[row][col].top = false;
  }
  if (row < max && currentRegion !== board[row + 1][col].region) {
    board[row][col].bottom = true;
  } else {
    board[row][col].bottom = false;
  }
  if (col > 0 && currentRegion !== board[row][col - 1].region) {
    board[row][col].left = true;
  } else {
    board[row][col].left = false;
  }
  if (col < max && currentRegion !== board[row][col + 1].region) {
    board[row][col].right = true;
  } else {
    board[row][col].right = false;
  }
};

export const addBordersToBoard = (board: Board) => {
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      addBordersToTile(board, i, j);
    });
  });
};

// const areValidRowPlacements = (
//   rowPlacements: number[],
//   colPlacements: number[]
// ): boolean => {
//   let coords = range(rowPlacements.length).map((i) => {
//     return { row: rowPlacements[i], col: colPlacements[i] };
//   });

//   for (let i = 1; i < coords.length; i++) {
//     // check for conflict between this and the previous star
//     let currentStar = coords[i];
//     let prevStar = coords[i - 1];
//     if (
//       currentStar.col <= prevStar.col + 1 &&
//       currentStar.col >= prevStar.col - 1
//     ) {
//       return false;
//     }
//   }
//   return true;
// };

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
      region: tile.region,
    }))
  );
};

export const generateBoardFromSeed = (
  sideLength: number,
  seed: number,
  shouldColorBoard = true
): Board => {
  const rng = new RNG(seed);

  const starPositions = getStarPositions(sideLength, rng);
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

  const coloredBoard = shouldColorBoard ? colorsToRegions(board) : board;

  return coloredBoard;
};

export const generateBoardFromSeedStatic = (
  sideLength: number,
  seed: number,
  shouldColorBoard = true
): Board => {
  return generateBoardFromSeedV2(sideLength, seed, shouldColorBoard);
};
