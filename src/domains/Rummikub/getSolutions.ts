import { CurrentBoard } from "domains/Rummikub/components/CurrentBoard";
import { TileData as Tile } from "domains/Rummikub/sharedTypes";
import { Combination } from "ts-combinatorics";

import nextId from "react-id-generator";

export type BoardState = {
  board: Tile[][];
  tiles: Tile[];
  possibleMoves: Array<Tile[]>;
};

export type GuessState = {
  tileIndex: number;
  moveTaken: number;
  newBoardState: BoardState | null;
  lastBoardState: BoardState;
};

const cleanBoard = (board: Tile[][]) => {
  var cleanedBoard = [];
  for (let row of board) {
    cleanedBoard.push(row);
  }
  return cleanedBoard;
};

// Must return empty if no moves are possible
const getPossibleMoves = (tiles: Tile[], tileGuessingOn: number): Tile[][] => {
  const tile = tiles[tileGuessingOn];
  var useableTiles = tiles.filter((t) => t.id !== tile.id);
  const sameNumberTiles = [
    ...useableTiles.filter(
      (t) => t.number === tile.number && t.number !== tile.number
    ),
  ];
  const sameColorTiles = [
    ...useableTiles.filter((t) => t.color === tile.color),
  ];

  // Find possible groups of same numbers
  var sameNumberTilesResults = [...Combination.of(sameNumberTiles, 2)].map((com) => [
    ...com,
    tile,
  ]);
  sameNumberTilesResults = [...sameNumberTilesResults, ...Combination.of(sameNumberTiles, 3)];
  sameNumberTilesResults.filter((move) => {
    if (
      move[0].color === move[1].color ||
      move[0].color === move[2].color ||
      move[0].color === move[3]?.color
    )
      return false;
    if (move[1].color === move[2].color || move[1].color === move[3]?.color)
      return false;
    if (move[2].color === move[3]?.color) return false;
    return true;
  });

  // find possible straights
  function isValidStraight(set: Tile[], requiredTile: Tile): boolean {
    const sortedSet = [...set].sort();
    for (let i=0; i<sortedSet.length-1; i++) {
      if (sortedSet[0] != )
    }
  }


  return [...sameNumberTilesResults, ...sameColorTilesResults;
};

const getInitialBoardState = (allTiles: Tile[]): BoardState => {
  return {
    possibleMoves: getPossibleMoves(allTiles, 0),
    board: [],
    tiles: allTiles,
  };
};

const performMove = (
  oldState: BoardState,
  tileIndex: number,
  moveTaken: number
): BoardState => {
  const tilesInMoveTaken: Tile[] = oldState.possibleMoves[moveTaken];
  const newBoard = [...oldState.board, tilesInMoveTaken];
  // newTiles is all tiles, minus any tiles from the move taken
  const newTiles = oldState.tiles.filter(
    (tileFromTiles) =>
      tilesInMoveTaken.find(
        (tileFromMove) => tileFromTiles.id === tileFromMove.id
      ) !== undefined
  );

  const newPossibleMoves = getPossibleMoves(newTiles, tileIndex);
  return { board: newBoard, tiles: newTiles, possibleMoves: newPossibleMoves };
};

const solveBoardState = (
  state: BoardState,
  currentSolutions: Array<Tile[][]>
): Array<Tile[][]> => {
  const { board, tiles, possibleMoves } = state;

  console.log("Attempting to solve board state:");
  console.log({ currentBoardState: state, currentSolutions });
  // Base case: if we have no possible moves, it just continues
  tiles.forEach((tile, tileIndex) => {
    const newPossibleMoves = getPossibleMoves(tiles, tileIndex);
    newPossibleMoves.forEach((move, moveIndex) => {
      const stateAfterMove = performMove(state, tileIndex, moveIndex);
      if (stateAfterMove.tiles.length === 0)
        currentSolutions.push(stateAfterMove.board);
      else {
        solveBoardState(stateAfterMove, currentSolutions);
      }
    });
  });

  return [];
};

const findValidSolutions = (allTiles: Tile[]): Array<Tile[][]> => {
  var initialBoard = getInitialBoardState(allTiles);
  console.log("initial board state: ");
  console.log({ initialBoard });
  return solveBoardState(initialBoard, []);
};

// This is the entry point
export const getSolutions = (currentBoard: Tile[][], yourTiles: Tile[]) => {
  const cleanedBoard = cleanBoard(currentBoard);
  var allTiles: Tile[] = [];
  [...cleanedBoard, yourTiles].forEach((set) => {
    allTiles = [...allTiles, ...set];
  });

  // Find if they can use all tiles
  return findValidSolutions(allTiles);
};
