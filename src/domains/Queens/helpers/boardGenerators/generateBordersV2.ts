import { range, RNG } from "domains/Queens/helpers/randomNum";
import { copyBoard } from "domains/Queens/helpers/solveBoard";
import {
  Board,
  BoardTile,
  BoardWithBorders,
  BoardWithRegions,
  Coords,
  TileWithBorders,
} from "domains/Queens/sharedTypes";

const createBlankBoard = (sideLength: number) => {
  let result: Board = [];
  for (let i = 0; i < sideLength; i++) {
    let row: BoardTile[] = [];
    for (let j = 0; j < sideLength; j++) {
      row.push({ token: "", region: undefined, color: "brownGray" });
    }
    result.push(row);
  }
  return result;
};

const placeStars = (board: Board, starPositions: Coords[]) => {
  for (let coords of starPositions) {
    board[coords.row][coords.col].token = "Q";
  }
};

export const getBoardWithBorders = (
  board: BoardWithRegions
): BoardWithBorders => {
  const result: BoardWithBorders = board.map((row, i) =>
    row.map((tile, j) => ({ token: "", region: -1 }))
  );

  return result;
};

const getAdjacentSquaresWithRegions = ({
  pos,
  board,
}: {
  pos: Coords;
  board: Board;
}): Coords[] => {
  const result: Coords[] = [];
  if (pos.row > 0 && board[pos.row - 1][pos.col].region !== undefined)
    result.push({ row: pos.row - 1, col: pos.col });
  if (
    pos.row < board.length - 1 &&
    board[pos.row + 1][pos.col].region !== undefined
  )
    result.push({ row: pos.row + 1, col: pos.col });

  if (pos.col > 0 && board[pos.row][pos.col - 1].region !== undefined)
    result.push({ row: pos.row, col: pos.col - 1 });
  if (
    pos.col < board.length - 1 &&
    board[pos.row][pos.col + 1].region !== undefined
  )
    result.push({ row: pos.row, col: pos.col + 1 });

  return result;
};

const getAdjacentRegionlessSquares = ({
  pos,
  board,
}: {
  pos: Coords;
  board: Board;
}): Coords[] => {
  const result: Coords[] = [];
  if (pos.row > 0 && board[pos.row - 1][pos.col].region === undefined)
    result.push({ row: pos.row - 1, col: pos.col });
  if (
    pos.row < board.length - 1 &&
    board[pos.row + 1][pos.col].region === undefined
  )
    result.push({ row: pos.row + 1, col: pos.col });

  if (pos.col > 0 && board[pos.row][pos.col - 1].region === undefined)
    result.push({ row: pos.row, col: pos.col - 1 });
  if (
    pos.col < board.length - 1 &&
    board[pos.row][pos.col + 1].region === undefined
  )
    result.push({ row: pos.row, col: pos.col + 1 });

  return result;
};

// takes in the board, a region number, and the current squares for this region.
const getEmptySquaresAdjacentToRegion = ({
  board,
  region,
  thisRegionSquares,
}: {
  board: Board;
  region: number;
  thisRegionSquares: Coords[];
}) => {
  let result: Coords[] = [];
  for (let square of thisRegionSquares) {
    result.push(...getAdjacentRegionlessSquares({ board, pos: square }));
  }
  return result;
};

const areBoardRegionsFilled = (board: Board): boolean => {
  for (let row of board) {
    for (let tile of row) {
      if (tile.region === undefined) return false;
    }
  }
  return true;
};

// strategy for V1:
// - start at each queen. Fill the spaces outward until the region is the right size.
const fillBoardRegionsV1 = ({
  board,
  regionSizes,
  starPositions,
  rng,
}: {
  board: Board;
  regionSizes: number[];
  starPositions: Coords[];
  rng: RNG;
}) => {
  const sideLength = board.length;
  for (let i of range(sideLength)) {
    // make each region sized like it's number
    let targetRegionSize = regionSizes[i];
    let position = starPositions[i];
    let tile = board[position.row][position.col];
    tile.region = i;
    let regionSize = 1;
    let shouldContinue = true;

    while (regionSize < targetRegionSize && shouldContinue) {
      // ok. We need to expand the region until it is the right size. We start at the star.
      // First, we could get each open square around us. Then pick one at random, and fill it. Then fill from that square.
      const possiblePositions = getAdjacentRegionlessSquares({
        pos: position,
        board,
      });
      if (possiblePositions.length) {
        position = rng.getRandomElementFromArray(possiblePositions);
        let tile = board[position.row][position.col];
        tile.region = i;
      } else shouldContinue = false;
    }
  }
};

const findRegionlessBoardCoords = (board: Board): Coords[] => {
  let result: Coords[] = [];
  board.forEach((row, i) =>
    row.forEach((tile, j) => {
      if (tile.region === undefined) result.push({ row: i, col: j });
    })
  );
  return result;
};

// strategy for V2:
// Starting at each queen, fill one space outward in any available direction.
// Then, fill any empty space with any of the nearby regions.
const fillBoardRegionsV2 = ({
  board,
  regionSizes,
  starPositions,
  rng,
}: {
  board: Board;
  regionSizes: number[];
  starPositions: Coords[];
  rng: RNG;
}) => {
  const sideLength = board.length;
  // regions is 0-9 for a 10 board
  const regions = range(sideLength);

  regions.forEach((region) => {
    let { row, col } = starPositions[region];
    board[row][col].region = region;
  });
  // regionSquares[0] is the list of all coords that currently have region 0
  const regionSquares: Coords[][] = regions.map((region) => [
    starPositions[region],
  ]);
  let didMakeChange = true;
  // if we ever don't make any change going through all regions, skip to the next part
  while (didMakeChange) {
    didMakeChange = false;
    for (let region of regions) {
      if (regionSquares[region].length >= regionSizes[region]) continue;
      const possibleSquares = getEmptySquaresAdjacentToRegion({
        board,
        region,
        thisRegionSquares: regionSquares[region],
      });
      if (possibleSquares.length) {
        let { row, col } = rng.getRandomElementFromArray(possibleSquares);
        board[row][col].region = region;
        regionSquares[region].push({ row, col });
        didMakeChange = true;
      }
    }
  }

  const emptySquares = findRegionlessBoardCoords(board);
  // fill in empty squares from the ones around them
  while (emptySquares.length) {
    for (let i = emptySquares.length - 1; i >= 0; i--) {
      let { row, col } = emptySquares[i];
      let adjacentColoredSquares = getAdjacentSquaresWithRegions({
        pos: { row, col },
        board,
      });

      if (adjacentColoredSquares.length) {
        const regionTileCoords = rng.getRandomElementFromArray(
          adjacentColoredSquares
        );
        const newRegion =
          board[regionTileCoords.row][regionTileCoords.col].region;
        board[row][col].region = newRegion;
        emptySquares.splice(i, 1);
      }
    }
  }
};

export const generateRegionsV2 = ({
  starPositions,
  regionSizes,
  rng,
}: {
  starPositions: Coords[];
  regionSizes: number[];
  rng: RNG;
}): Board => {
  const sideLength = starPositions.length;

  // go region by region, based on each queen
  let attemptCounter = 0;
  const MAX_ATTEMPTS = 1;
  const regionlessBoard = createBlankBoard(sideLength);
  placeStars(regionlessBoard, starPositions);

  // console.log(
  //   "Attempting to fill regions. will try " + MAX_ATTEMPTS + " times."
  // );
  const startTime = new Date().getTime();

  let board = regionlessBoard;

  while (!areBoardRegionsFilled(board) && attemptCounter < MAX_ATTEMPTS) {
    attemptCounter++;

    board = copyBoard(regionlessBoard);
    fillBoardRegionsV2({ board, regionSizes, starPositions, rng });
  }

  const timeTaken = new Date().getTime() - startTime;
  //console.log("Filled regions in  " + timeTaken / 1000 + " seconds");
  // console.log("used " + attemptCounter + " attempts");

  return board;
};
