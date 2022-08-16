import { CurrentBoard } from "domains/Rummikub/components/CurrentBoard";
import { TileData as Tile } from "domains/Rummikub/sharedTypes";

import nextId from "react-id-generator";

export type GuessState = {
  possibleMoves: Tile[][];
  currentBoard: Tile[][];
  currentTiles: Tile[];
  indexOfTileGuessingOn: number;
  // id of key to access last guessState
  stateBeforeLastGuess: null | string;
  guessTaken: number;
  id: string;
};

const getPossibleMoves = (
  currentBoard: Tile[][],
  yourTiles: Tile[],
  tileGuessingOn: Tile
): Tile[][] => {
  var most_tiles_used = 0;
  const cleanedBoard = cleanBoard(currentBoard);

  return [];
};

const countTilesUsed = (currentBoard: Tile[][]) =>
  currentBoard.reduce((accum, set) => accum + set.length, 0);

const getInitialGuessState = (allTiles: Tile[]): GuessState => {
  return {
    possibleMoves: getPossibleMoves([], allTiles, allTiles[0]),
    currentBoard: [],
    currentTiles: allTiles,
    indexOfTileGuessingOn: 0,
    stateBeforeLastGuess: null,
    guessTaken: 0,
    id: nextId(),
  };
};

// Assumes there are possible moves
const getNextGuessState = (lastGuessState: GuessState): GuessState | null => {
  const lastGuessTaken =
    lastGuessState.possibleMoves[lastGuessState.guessTaken];
  const nextBoard = [...lastGuessState.currentBoard, lastGuessTaken];
  const nextTiles = lastGuessState.currentTiles.filter(
    (tile) => lastGuessTaken.find((t) => t.id === tile.id) === undefined
  );

  const nextPossibleMoves = getPossibleMoves(
    nextBoard,
    nextTiles,
    lastGuessState.currentTiles[lastGuessState.indexOfTileGuessingOn]
  );
  // Case: there are still possible moves
  if (nextPossibleMoves.length === 0) {
    var nextGuessTaken = lastGuessState.guessTaken + 1;
    if (nextGuessTaken === lastGuessState.possibleMoves.length) {
      var nextTileToGuessOn = lastGuessState.indexOfTileGuessingOn + 1;
      if (nextTileToGuessOn === lastGuessState.currentTiles.length) {
        // look up last state and increment guess
      }
      return {};
    }
  } // Case: there are no possible moves
  else {
    return {
      possibleMoves: getPossibleMoves(nextBoard, nextTiles, nextTileGuessingOn),
      currentBoard: nextBoard,
      currentTiles: nextTiles,
      indexOfTileGuessingOn: 0,
      stateBeforeLastGuess: lastGuessState.id,
      guessTaken: 0,
      id: nextId(),
    };
  }
};

const cleanBoard = (board: Tile[][]) => {
  var cleanedBoard = [];
  for (let row of board) {
    cleanedBoard.push(row);
  }
  return cleanedBoard;
};

const findValidSolutions = (allTiles: Tile[]): Array<Tile[][]> => {
  var nextGuess = getInitialGuessState(allTiles);
  var guessStateRecord: Record<string, GuessState> = {};
  guessStateRecord[nextGuess.id] = nextGuess;

  var notPossible = false;
  while (nextGuess.currentTiles.length > 0 && !notPossible) {
    if (nextGuess.currentTiles.length === 0) return [nextGuess.currentBoard];
    // If they've guessed all possible moves, move to the next tile.
    if (
      nextGuess.indexOfTileGuessingOn ===
      nextGuess.possibleMoves.length - 1
    ) {
    }
  }
  return [];
};

// This is the entry point
export const getSolutions = (currentBoard: Tile[][], yourTiles: Tile[]) => {
  var allTiles = [...currentBoard, yourTiles].reduce(
    (accum, set) => [...set],
    []
  );

  // Find if they can use all tiles
  return findValidSolutions(allTiles);
};
