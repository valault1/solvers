import { range, RNG } from "domains/Queens/helpers/randomNum";
import {
  BoardWithBorders,
  BoardWithRegions,
  Coords,
  TileWithBorders,
} from "domains/Queens/sharedTypes";

const getBlankBoardWithBorders = (sideLength: number) => {
  let result: BoardWithBorders = [];
  for (let i = 0; i < sideLength; i++) {
    let row: TileWithBorders[] = [];
    for (let j = 0; j < sideLength; j++) {
      row.push({ token: "", region: undefined });
    }
    result.push(row);
  }
  return result;
};

export const getBoardWithBorders = (
  board: BoardWithRegions
): BoardWithBorders => {
  const result: BoardWithBorders = board.map((row, i) =>
    row.map((tile, j) => ({ token: "", region: -1 }))
  );

  return result;
};

const getNextPossibleRegionSquares = ({
  pos,
  board,
}: {
  pos: Coords;
  board: BoardWithBorders;
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

const areBoardRegionsFilled = (board: BoardWithBorders): boolean => {
  for (let row of board) {
    for (let tile of row) {
      if (tile.region === undefined) return false;
    }
  }
  return true;
};

export const generateBorders = ({
  starPositions,
  regionSizes,
  rng,
}: {
  starPositions: Coords[];
  regionSizes: number[];
  rng: RNG;
}): BoardWithBorders => {
  const sideLength = starPositions.length;
  let attemptCounter = 0;
  const MAX_ATTEMPTS = 1000000;
  let board = getBlankBoardWithBorders(sideLength);
  console.log(
    "Attempting to fill regions. will try " + MAX_ATTEMPTS + " times."
  );
  const startTime = new Date().getTime();

  while (!areBoardRegionsFilled(board) && attemptCounter < MAX_ATTEMPTS) {
    attemptCounter++;
    board = getBlankBoardWithBorders(sideLength);

    for (let i of range(sideLength)) {
      // make each region sized like it's number
      let targetRegionSize = regionSizes[i];
      let position = starPositions[i];
      let tile = board[position.row][position.col];
      tile.token = "Q";
      tile.region = i;

      let regionSize = 1;
      let shouldContinue = true;

      while (regionSize < targetRegionSize && shouldContinue) {
        // ok. We need to expand the region until it is the right size. We start at the star.
        // First, we could get each open square around us. Then pick one at random, and fill it. Then fill from that square.
        const possiblePositions = getNextPossibleRegionSquares({
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
  }

  const timeTaken = new Date().getTime() - startTime;
  console.log(
    "finished attempting to fill regions in " + timeTaken / 1000 + " seconds"
  );
  console.log("used " + attemptCounter + " attempts");

  return board;
};
