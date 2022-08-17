import { TileData as Tile } from "domains/Rummikub/sharedTypes";
import { Combination } from "ts-combinatorics";
var movesTried: Record<string, boolean> = {};
export type BoardState = {
  board: Tile[][];
  tiles: Tile[];
};

export type GuessState = {
  tileIndex: number;
  moveTaken: number;
  newBoardState: BoardState | null;
  lastBoardState: BoardState;
};

export const tileToString = (tile: Tile) => {
  var colorString = "";
  if (tile.color === "blue") colorString = "bl";
  if (tile.color === "orange") colorString = "or";
  if (tile.color === "black") colorString = "bk";
  if (tile.color === "red") colorString = "rd";
  return `${colorString}${tile.number}`;
};

export const tileSetToString = (tileSet: Tile[]) => {
  var result = "";
  tileSet.forEach((tile) => (result += tileToString(tile) + " "));
  return result;
};

export const boardToString = (board: Tile[][]) => {
  var result = "";
  board.forEach((set) => (result += "[" + tileSetToString(set) + "],"));
  return result;
};

const cleanBoard = (board: Tile[][]) => {
  var cleanedBoard = [];
  for (let row of board) {
    cleanedBoard.push(row);
  }
  return cleanedBoard;
};

const getPossibleStraights = (useableTiles: Tile[], tile: Tile) => {
  // find possible straights
  var sameColorTiles = useableTiles.filter((t) => t.color === tile.color);

  if (sameColorTiles.length < 2) return [];

  // Remove ones with duplicate number and color
  sameColorTiles = sameColorTiles.filter((t) => {
    return sameColorTiles.find((t1) => t.number === t1.number).id === t.id;
  });
  if (sameColorTiles.length < 2) return [];

  sameColorTiles = sameColorTiles.filter((t) => tile.number !== t.number);
  sameColorTiles = [...sameColorTiles, tile].sort(
    (a, b) => a.number - b.number
  );
  const indexOfTileInSameColorTiles = sameColorTiles.findIndex(
    (t) => t.id === tile.id
  );
  var lastIndex = indexOfTileInSameColorTiles;
  while (
    lastIndex < sameColorTiles.length - 1 &&
    sameColorTiles[lastIndex].number + 1 ===
      sameColorTiles[lastIndex + 1].number
  ) {
    lastIndex++;
  }
  var firstIndex = indexOfTileInSameColorTiles;
  while (
    firstIndex > 0 &&
    sameColorTiles[firstIndex].number - 1 ===
      sameColorTiles[firstIndex - 1].number
  ) {
    firstIndex--;
  }
  var runResults: Tile[][] = [];
  const largestRun = sameColorTiles.slice(firstIndex, lastIndex + 1);
  for (let i = 3; i <= largestRun.length; i++) {
    for (let j = 0; j <= largestRun.length - i; j++) {
      const slice = largestRun.slice(j, j + i);
      if (slice.find((t) => t.id === tile.id) !== undefined)
        runResults.push(slice);
    }
  }
  return runResults;
};

const getPossibleSets = (useableTiles: Tile[], tile: Tile) => {
  // Find possible groups of same numbers
  const sameNumberTiles = [
    ...useableTiles.filter(
      (t) => t.number === tile.number && t.color !== tile.color
    ),
  ];
  var setResults3 = [...Combination.of(sameNumberTiles, 2)].map((com) => [
    ...com,
    tile,
  ]);
  var setResults4 = [...Combination.of(sameNumberTiles, 3)].map((com) => [
    ...com,
    tile,
  ]);
  var setResults = setResults3.concat(setResults4);

  setResults.filter((move) => {
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
  return setResults;
};

// Must return empty if no moves are possible
export const getPossibleMoves = (
  tiles: Tile[],
  tileGuessingOn: number
): Tile[][] => {
  const tile = tiles[tileGuessingOn];
  var useableTiles = tiles.filter((t) => t.id !== tile.id);

  const setResults = getPossibleSets(useableTiles, tile);
  const straightResults = getPossibleStraights(useableTiles, tile);
  return [...setResults, ...straightResults];
};

const getInitialBoardState = (allTiles: Tile[]): BoardState => {
  return {
    board: [],
    tiles: allTiles,
  };
};

export const performMove = (
  oldState: BoardState,
  moveTaken: Tile[]
): BoardState => {
  const newBoard = [...oldState.board, moveTaken];
  // newTiles is all tiles, minus any tiles from the move taken
  const newTiles = oldState.tiles.filter(
    (tileFromTiles) =>
      moveTaken.find((tileFromMove) => tileFromTiles.id === tileFromMove.id) ===
      undefined
  );
  return { board: newBoard, tiles: newTiles };
};

const getMoveAndBoardHash = (move: Tile[], board: Tile[][]) => {
  const getMoveHash = (m: Tile[]) =>
    m
      .slice()
      .sort()
      .map((t) => t.id)
      .join();
  const sortedBoard = board.slice().sort().map(getMoveHash);
  return sortedBoard.join("") + getMoveHash(move);
};

const solveBoardState = (state: BoardState): Array<Tile[][]> => {
  const { board, tiles } = state;
  if (tiles.length < 3) return [];

  // Base case: if we have no possible moves, it just continues
  var currentSolutions: Tile[][][] = [];
  tiles.forEach((tile, tileIndex) => {
    const newPossibleMoves = getPossibleMoves(tiles, tileIndex);
    newPossibleMoves.forEach((move) => {
      if (currentSolutions.length > 0) return currentSolutions;
      const hash = getMoveAndBoardHash(move, state.board);
      if (movesTried[hash] === true) return [];
      const stateAfterMove = performMove(state, move);
      movesTried[hash] = true;
      if (stateAfterMove.tiles.length === 0) {
        currentSolutions.push(stateAfterMove.board);
      } else {
        currentSolutions.push(...solveBoardState(stateAfterMove));
      }
    });
  });

  return currentSolutions;
};

const findValidSolutions = (allTiles: Tile[]): Array<Tile[][]> => {
  var initialBoardState = getInitialBoardState(allTiles);
  console.log("initial board state before solving: ");
  console.log({ initialBoardState });
  return solveBoardState(initialBoardState);
};

// This is the entry point
export const getBestSolution = (
  currentBoard: Tile[][],
  yourTiles: Tile[]
): Tile[][] => {
  const beginTime = new Date();
  const cleanedBoard = cleanBoard(currentBoard);
  var allTiles: Tile[] = [];
  [...cleanedBoard, yourTiles].forEach((set) => {
    allTiles = [...allTiles, ...set];
  });

  const solutions = findValidSolutions(allTiles);
  const timeElapsed = new Date().getTime() - beginTime.getTime();
  console.log(`finished in ${timeElapsed / 1000} s`);

  // Find if they can use all tiles
  return solutions.length ? solutions[0] : [];
};
