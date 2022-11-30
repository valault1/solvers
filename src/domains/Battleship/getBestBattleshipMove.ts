import { arrToString } from "domains/Battleship/getBestBattleshipMove.test";
import {
  BattleshipBoard,
  BEST_GUESS_SYMBOL,
  EMPTY_SYMBOL,
  HIT_SYMBOL,
  SetOfShipArrangements,
} from "domains/Battleship/sharedTypes";

const copyBattleshipBoard = (board: BattleshipBoard) => {
  return board.map((row) => [...row]);
};

const findCurrentBestGuess = (board: BattleshipBoard) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === BEST_GUESS_SYMBOL) return [i, j];
    }
  }
  return [];
};

// returns an array containing lists of all coordinates to be filled
// Each list of coordinates to be filled is one arrangement.
export const getAllArrangementsOfShip = (
  board: BattleshipBoard,
  shipLength: number
) => {
  // horizontal - starts at the end of a row, going backwards, placing the ship left to right.
  // For example, for a ship of length 3, start at square 6. Check 6, 7, 8. If they're all empty, it's valid.
  // Then check square 5. If square 5 is an x, you can skip to square 2, because there'll be no valid positions.
  let result: number[][][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      let currentSymbol = board[i][j];
      if (currentSymbol !== EMPTY_SYMBOL) {
        let counter = shipLength - 1;
        while (counter > 0 && j >= 0) {
          j--;
          counter--;
          if (board[i][j] !== EMPTY_SYMBOL) counter = shipLength - 1;
        }
        continue;
      }
      // If board length of 8, and ship length of three, can't place a ship past square 5.
      let lastSquareAShipCanBePlaced = board[i].length - shipLength;
      if (j <= lastSquareAShipCanBePlaced) {
        // Is a valid placement. add all coordinates of the ship to be colored in.
        let shipCoords: number[][] = [];
        for (let index = 0; index < shipLength; index++) {
          shipCoords.push([i, j + index]);
        }
        result.push(shipCoords);
      }
    }
  }

  // vertical
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      let currentSymbol = board[j][i];
      if (currentSymbol !== EMPTY_SYMBOL) {
        let counter = shipLength - 1;
        while (counter > 0 && j > 0) {
          j--;
          counter--;
          if (board[j][i] !== EMPTY_SYMBOL) counter = shipLength - 1;
        }
        continue;
      }
      // If board length of 8, and ship length of three, can't place a ship past square 5.
      let lastSquareAShipCanBePlaced = board.length - shipLength;
      if (j <= lastSquareAShipCanBePlaced) {
        // Is a valid placement. add all coordinates of the ship to be colored in.
        let shipCoords: number[][] = [];
        for (let index = 0; index < shipLength; index++) {
          shipCoords.push([j + index, i]);
        }
        result.push(shipCoords);
      }
    }
  }

  return result;
};

// Returns the number of arrangements
// Updates tileScores to show each tile's score
export const getAllPossibleArrangements = (
  board: BattleshipBoard,
  remainingShips: number[]
): SetOfShipArrangements => {
  if (remainingShips.length === 0) return [];

  // Get all arrangements of first ship. Then, for each arrangement of the first ship, get each arrangement of the next ship. Then, for each arrangement of
  // An arrangement is given by an array of every square to be filled.
  let arrangements = getAllArrangementsOfShip(board, remainingShips[0]);
  if (arrangements.length === 0) return [];
  if (remainingShips.length === 1) return arrangements;
  let result: SetOfShipArrangements = [];

  arrangements.forEach((arrangement) => {
    let newBoard = copyBattleshipBoard(board);
    // Fill in the spots for the current ship, so they don't get done again.
    arrangement.forEach((coordinate) => {
      newBoard[coordinate[0]][coordinate[1]] = HIT_SYMBOL;
    });

    let newArrangements = getAllPossibleArrangements(
      newBoard,
      remainingShips.slice(1)
    );

    const newArrangementsConsolidated = newArrangements.map((a) => [
      ...arrangement,
      ...a,
    ]);
    result.push(...newArrangementsConsolidated);
  });
  return result;

  // for each arrangement of this ship, get all possible arrangements of the other ships.
};

const SPLIT_CHAR = ",";
export const getStringFromCoords = (coords: number[]) => {
  return coords.join(SPLIT_CHAR);
};

const getCoordsFromStringKey = (key: string) => {
  return key.split(SPLIT_CHAR).map((strNum) => parseInt(strNum));
};

const initializeTileScores = (board: BattleshipBoard) => {
  let tileScores: { [key: string]: number } = {};
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      tileScores[getStringFromCoords([i, j])] = 0;
    });
  });
  return tileScores;
};

export const getBestBattleshipMove = (
  board: BattleshipBoard,
  shipsLeft: number[]
) => {
  let startTime = new Date();
  let newBoard = JSON.parse(JSON.stringify(board));
  // first, clear the last best guess
  let currentBestGuess = findCurrentBestGuess(board);
  if (currentBestGuess.length)
    newBoard[currentBestGuess[0]][currentBestGuess[1]] = EMPTY_SYMBOL;

  // tileScores holds the number of times each tile was a hit
  let tileScores = initializeTileScores(board);
  let totalNumPossibleArrangements = getAllPossibleArrangements(
    board,
    shipsLeft
  );
  totalNumPossibleArrangements.forEach((arrangement) => {
    arrangement.forEach((coords) => {
      tileScores[getStringFromCoords(coords)] += 1;
    });
  });

  let tileKeys = Object.keys(tileScores).sort(
    (a, b) => tileScores[b] - tileScores[a]
  );
  let maxValue = tileScores[tileKeys[0]];
  let highestTileKeys = tileKeys.filter((key) => tileScores[key] === maxValue);
  console.log(
    `ran getBestBattleshipMove in ${
      new Date().getTime() - startTime.getTime()
    } ms`
  );
  console.log({ tileScores, tileKeys });
  return highestTileKeys;
};
