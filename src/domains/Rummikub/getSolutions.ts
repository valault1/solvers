import { CurrentBoard } from "domains/Rummikub/components/CurrentBoard";
import { TileData as Tile } from "domains/Rummikub/sharedTypes";

export type GuessState = {
  possibleMoves: Tile[][];
  currentBoard: Tile[][];
  currentTiles: Tile[];
  tileGuessingOn: Tile;
  // id of key to access last guessState
  stateBeforeLastGuess: null | string;
  guessTaken: number;
  id?: string;
};

const getPossibleMoves = (
  currentBoard: Tile[][],
  currentTiles: Tile[],
  tileGuessingOn: Tile
): Tile[][] => {
  return [];
};

// Assumes there are possible moves
const getNextGuessState = (lastGuessState: GuessState): GuessState => {
  const lastGuessTaken =
    lastGuessState.possibleMoves[lastGuessState.guessTaken];
  const nextBoard = [...lastGuessState.currentBoard, lastGuessTaken];
  const nextTiles = lastGuessState.currentTiles.filter(
    (tile) => lastGuessTaken.find((t) => t.id === tile.id) === undefined
  );
  const nextTileGuessingOn = nextTiles[0];
  return {
    possibleMoves: getPossibleMoves(nextBoard, nextTiles, nextTileGuessingOn),
    currentBoard: nextBoard,
    currentTiles: nextTiles,
    tileGuessingOn: nextTileGuessingOn,
    stateBeforeLastGuess: lastGuessState.id,
    guessTaken: 0,
  };
};

const cleanBoard = (board: Tile[][]) => {
  var cleanedBoard = [];
  for (let row of board) {
    cleanedBoard.push(row);
  }
  return cleanedBoard;
};
