import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import {
  CAT_BOARD_HEIGHT,
  CAT_BOARD_WIDTH,
  CAT_SYMBOL,
  HexBoard,
  USER_SYMBOL,
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
  return allMoves.filter((move) => board[move[0]]?.[move[1]] !== USER_SYMBOL);
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

const isWinningMove = ({ move }: { move: number[] }) => {
  return (
    move[0] === 0 ||
    move[0] === CAT_BOARD_HEIGHT - 1 ||
    move[1] === 0 ||
    move[1] === CAT_BOARD_WIDTH - 1
  );
};

const getCheckmateMove = ({
  board,
  catCoords,
  possibleMoves,
}: {
  board: HexBoard;
  catCoords: number[];
  possibleMoves: number[][];
}) => {
  let winningMoves = possibleMoves.filter((move) => isWinningMove({ move }));
  if (winningMoves.length > 0)
    return selectRandomElementFromArray(winningMoves);
  for (let move of possibleMoves) {
    let newMoves = getPossibleCatMoves({ board, catCoords: move });
    if (newMoves.filter((move) => isWinningMove({ move })).length > 1)
      return move;
  }
  return [];
};

export const makeCatMove = ({ board }: { board: HexBoard }) => {
  let catCoords = getCatCoords({ board });
  let possibleMoves = getPossibleCatMoves({ board, catCoords });
  if (possibleMoves.length === 0) return board;
  let startTime = new Date();
  let newBoard = JSON.parse(JSON.stringify(board));

  let checkMateMove = getCheckmateMove({ board, catCoords, possibleMoves });

  newBoard[catCoords[0]][catCoords[1]] = EMPTY_SYMBOL;
  if (checkMateMove.length > 0) {
    newBoard[checkMateMove[0]][checkMateMove[1]] = CAT_SYMBOL;
  } else {
    let { moveToTake: shortestPathMove } = getShortestPathToExit({
      board,
      coords: catCoords,
    });
    newBoard[shortestPathMove[0]][shortestPathMove[1]] = CAT_SYMBOL;
  }

  let timeElapsed = new Date().getTime() - startTime.getTime();
  console.log(`time to calculate cat move: ${timeElapsed} ms`);
  return newBoard;
};
