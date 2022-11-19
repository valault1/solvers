import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import { trapTheCatCheckForWinner } from "domains/TrapTheCat/checkForWinner";
import {
  CAT_BOARD_HEIGHT,
  CAT_BOARD_WIDTH,
  CAT_SYMBOL,
  HexBoard,
} from "domains/TrapTheCat/sharedTypes";

const selectRandomElementFromArray = (arr: any[]) => {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const getCatCoords = ({ board }: { board: HexBoard }): number[] => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === CAT_SYMBOL) {
        return [i, j];
      }
    }
  }
  return [];
};

export const getPossibleCatMoves = ({
  board,
  catCoords,
}: {
  board: HexBoard;
  catCoords: number[];
}) => {
  let cat_i = catCoords[0];
  let cat_j = catCoords[1];
  // If it's an odd row, the cat options are up 1, or up and right 1
  // If it's an even row, the options are up and left, or just up
  let offset = cat_i % 2;
  let allMoves = [
    [cat_i - 1, cat_j + offset],
    [cat_i - 1, cat_j + offset - 1],
    [cat_i + 1, cat_j + offset],
    [cat_i + 1, cat_j + offset - 1],
    [cat_i, cat_j - 1],
    [cat_i, cat_j + 1],
  ];
  return allMoves.filter((move) => board[move[0]]?.[move[1]] === EMPTY_SYMBOL);
};

export const getDistanceToExit = ({
  board,
  coords,
  tilesTried = {},
  coordDistances = {},
}: {
  board: HexBoard;
  coords: number[];
  tilesTried?: any;
  coordDistances?: any;
}) => {
  let tileIndex = JSON.stringify(coords);
  // If we've fully calculated this tile before, return that distance
  if (coordDistances[tileIndex])
    return { pathDistance: coordDistances[tileIndex], tilesTried };
  // If we've tried this tile before without finishing, return some huge number so it won't try that one again
  if (tilesTried[tileIndex]) return { pathDistance: 1001, tilesTried };
  tilesTried[tileIndex] = true;
  if (
    coords[0] === 0 ||
    coords[0] === CAT_BOARD_HEIGHT - 1 ||
    coords[1] === 0 ||
    coords[1] === CAT_BOARD_WIDTH - 1
  )
    return { pathDistance: 0, tilesTried };
  const moves = getPossibleCatMoves({ board, catCoords: coords });
  let min = 1000;
  let minPath: number[][] = [];
  for (let move of moves) {
    let { pathDistance, tilesTried: pathTilesTried } = getDistanceToExit({
      board,
      coords: move,
      tilesTried: { ...tilesTried },
      coordDistances,
    });
    pathDistance += 1;
    if (pathDistance < min) {
      min = pathDistance;
      minPath = pathTilesTried;
    }
  }
  coordDistances[tileIndex] = min;
  return { pathDistance: min, tilesTried: minPath };
};

export const getShortestPathToExit = ({
  board,
  coords,
}: {
  board: HexBoard;
  coords: number[];
}) => {
  const moves = getPossibleCatMoves({ board, catCoords: coords });
  let minDistance = 999;
  let paths: { [key: string]: number[][] } = {};
  let moveDistances: { [key: number]: number[][] } = {};
  for (let move of moves) {
    let { pathDistance, tilesTried } = getDistanceToExit({
      board,
      coords: move,
    });
    if (moveDistances[pathDistance])
      moveDistances[pathDistance] = [...moveDistances[pathDistance], move];
    else moveDistances[pathDistance] = [move];
    if (pathDistance < minDistance) {
      minDistance = pathDistance;
      paths[JSON.stringify(move)] = tilesTried;
    }
  }
  if (minDistance === 999)
    return { moveToTake: selectRandomElementFromArray(moves), tilesTried: [] };
  let minPathMoves = moveDistances[minDistance];
  let moveToTake = selectRandomElementFromArray(minPathMoves);

  return { moveToTake, tilesTried: paths[JSON.stringify(moveToTake)] };
};
export const makeCatMove = ({ board }: { board: HexBoard }) => {
  let catCoords = getCatCoords({ board });
  let possibleMoves = getPossibleCatMoves({ board, catCoords });
  if (possibleMoves.length === 0) return board;
  let moveIndex = Math.floor(Math.random() * possibleMoves.length);
  let newBoard = JSON.parse(JSON.stringify(board));

  let { moveToTake, tilesTried } = getShortestPathToExit({
    board,
    coords: catCoords,
  });

  console.log({ moveToTake, tilesTried });

  newBoard[catCoords[0]][catCoords[1]] = EMPTY_SYMBOL;
  newBoard[moveToTake[0]][moveToTake[1]] = CAT_SYMBOL;
  return newBoard;
};
