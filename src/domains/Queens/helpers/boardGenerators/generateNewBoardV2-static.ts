// DO NOT EDIT
// This is meant to be a static copy of the generateNewBoard function, so that it's functionality will never change, and we can always use these seeds.

// for now, I am importing board colors, since I don't think that will break the functionality of the board generation.
// Just in case, I included here as BOARD_COLORS_OLD a copy of what BOARD_COLORS was at the time of making this
import {
  BOARD_COLORS_HEX,
  ORIGINAL_BOARD_COLORS,
} from "domains/Queens/constants/constants";

type BoardColor = keyof typeof ORIGINAL_BOARD_COLORS;

export const BOARD_COLORS_OLD = {
  pink: [214, 163, 188],
  //brown/gray
  brownGray: [183, 179, 161],
  //red
  red: [237, 131, 103],
  //light orange
  lightOrange: [246, 204, 153],
  //yellow
  yellow: [232, 243, 150],
  //purple
  purple: [183, 164, 221],
  //teal
  teal: [173, 209, 215],
  //teal
  cyan: [86, 237, 231],
  //light blue
  lightBlue: [139, 181, 254],
  //light green
  lightGreen: [188, 222, 166],
  //gray section
  gray: [223, 223, 223],
  // below: added for 20x20
  darkBlue: [0, 0, 139],

  darkGreen: [1, 50, 32],

  silver: [192, 192, 192],

  darkPurple: [139, 0, 139],

  darkOrange: [255, 140, 0],

  darkRed: [139, 0, 0],

  brown: [165, 42, 42],

  deepPink: [170, 50, 106],

  brightYellow: [255, 234, 0],
};

type Coords = { row: number; col: number };
const range = (size: number) => {
  return Array.from({ length: size }, (x, i) => i);
};

class RNG {
  /* Period parameters */
  private N = 624;
  private M = 397;
  private MATRIX_A = 0x9908b0df; /* constant vector a */
  private UPPER_MASK = 0x80000000; /* most significant w-r bits */
  private LOWER_MASK = 0x7fffffff; /* least significant r bits */

  private mt = new Array(this.N); /* the array for the state vector */
  private mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

  constructor(seed?: number) {
    if (seed === undefined) {
      seed = new Date().getTime();
    }
    this.init_genrand(seed);
  }

  /* initializes mt[N] with a seed */
  private init_genrand(s: number) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] >>>= 0;
      /* for >32 bit machines */
    }
  }

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  init_by_array(init_key: any, key_length: any) {
    var i, j, k;
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = this.N > key_length ? this.N : key_length;
    for (; k; k--) {
      var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
            (s & 0x0000ffff) * 1664525)) +
        init_key[j] +
        j; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++;
      j++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
      if (j >= key_length) j = 0;
    }
    for (k = this.N - 1; k; k--) {
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
            (s & 0x0000ffff) * 1566083941)) -
        i; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
    }

    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  }

  /* generates a random number on [0,0xffffffff]-interval */
  genrand_int32() {
    var y;
    var mag01 = [0x0, this.MATRIX_A];
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) {
      /* generate N words at one time */
      var kk;

      if (this.mti === this.N + 1)
        /* if init_genrand() has not been called, */
        this.init_genrand(5489); /* a default initial seed is used */

      for (kk = 0; kk < this.N - this.M; kk++) {
        y =
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y =
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y =
        (this.mt[this.N - 1] & this.UPPER_MASK) |
        (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  /* generates a random number on [0,0x7fffffff]-interval */
  genrand_int31() {
    return this.genrand_int32() >>> 1;
  }

  /* generates a random number on [0,1]-real-interval */
  genrand_real1() {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  }

  /* generates a random number on [0,1)-real-interval */
  random() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /* generates a random number on (0,1)-real-interval */
  genrand_real3() {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /* generates a random number on [0,1) with 53-bit resolution*/
  genrand_res53() {
    var a = this.genrand_int32() >>> 5,
      b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }

  getRandomIndexFromArray(arr: any[]) {
    return this.getRandomNumInRangeInclusive(0, arr.length - 1);
  }

  getRandomElementFromArray(arr: any[]) {
    return arr[this.getRandomIndexFromArray(arr)];
  }

  getRandomNumInRangeInclusive(a: number, b: number) {
    const num = this.random();
    return Math.trunc(num * (b - a + 1)) + a;
  }

  getRandomNewSeed(a: number = 1000, b: number = 9999999) {
    return this.getRandomNumInRangeInclusive(a, b);
  }

  getNumbersInRangeInRandomOrder(size: number) {
    let possibleNums = range(size);
    const randomizedNums = range(size).map(() => {
      const i = this.getRandomIndexFromArray(possibleNums);
      const num = possibleNums[i];
      possibleNums.splice(i, 1);
      return num;
    });
    return randomizedNums;
  }

  /* These real versions are due to Isaku Wada, 2002/01/09 added */
}

type BoardTile = {
  token: Token;
  color: BoardColor;
  region?: number;
  isConflicting?: boolean;
  // borders
  bottom?: boolean;
  top?: boolean;
  right?: boolean;
  left?: boolean;
};

type Token = "Q" | "X" | "";

type Board = BoardTile[][];

const getStarPositions = (sideLength: number, rng: RNG): Coords[] => {
  let isValid = false;
  let counter = 0;
  let rowPlacements = range(sideLength);
  let colPlacements: number[] = [];
  while (!isValid && counter < 50) {
    colPlacements = rng.getNumbersInRangeInRandomOrder(sideLength);
    //rowPlacements = rng.getNumbersInRangeInRandomOrder(sideLength);
    isValid = true; //areValidRowPlacements(rowPlacements, colPlacements);
    counter++;
  }
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

  const hardMax = Math.floor(sideLength * 3);
  const minSize = 2;
  const spaceToLeaveForEachRemainingColor = 3;
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

const colorsToRegions = (board: Board): Board => {
  return board.map((row, i) =>
    row.map((tile, j) => ({
      token: "",
      color: BOARD_COLORS_HEX[tile.region] as BoardColor,
      region: tile.region,
    }))
  );
};

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

const getEmptySquaresAdjacentToRegion = ({
  board,
  thisRegionSquares,
}: {
  board: Board;
  thisRegionSquares: Coords[];
}) => {
  let result: Coords[] = [];
  for (let square of thisRegionSquares) {
    result.push(...getAdjacentRegionlessSquares({ board, pos: square }));
  }
  return result;
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

const fillBoardRegionsV2 = ({
  board,
  starPositions,
  rng,
}: {
  board: Board;
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

  // let didMakeChange = true;
  // // if we ever don't make any change going through all regions, skip to the next part
  // while (didMakeChange) {
  //   didMakeChange = false;
  //   let regionsInRandomOrder = rng.getNumbersInRangeInRandomOrder(
  //     regions.length
  //   );
  //   for (let region of regionsInRandomOrder) {
  //     if (regionSquares[region].length >= regionSizes[region]) continue;
  //     const possibleSquares = getEmptySquaresAdjacentToRegion({
  //       board,
  //       thisRegionSquares: regionSquares[region],
  //     });
  //     if (possibleSquares.length) {
  //       let { row, col } = rng.getRandomElementFromArray(possibleSquares);
  //       board[row][col].region = region;
  //       regionSquares[region].push({ row, col });
  //       didMakeChange = true;
  //     }
  //   }
  // }

  // fill in at least one square for each region
  for (let region of regions) {
    const possibleSquares = getEmptySquaresAdjacentToRegion({
      board,
      thisRegionSquares: regionSquares[region],
    });
    if (possibleSquares.length) {
      let { row, col } = rng.getRandomElementFromArray(possibleSquares);
      board[row][col].region = region;
      //regionSquares[region].push({ row, col });
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
  // // How often do these colors match the numbers in regionSizes?
  // const finalRegionCounts = [];
  // for (let region of regions) {
  //   finalRegionCounts.push(regionSquares[region].length);
  // }
  // let areEqual = true;
  // for (let region of regions) {
  //   if (finalRegionCounts[region] !== regionSizes[region]) {
  //     areEqual = false;
  //     break;
  //   }
  // }
  // if (areEqual) {
  //   console.log("final region counts are equal to region sizes");
  // }
};

const generateRegionsV2 = ({
  starPositions,
  rng,
}: {
  starPositions: Coords[];
  rng: RNG;
}): Board => {
  const sideLength = starPositions.length;

  const board = createBlankBoard(sideLength);
  placeStars(board, starPositions);
  fillBoardRegionsV2({ board, starPositions, rng });

  return board;
};

export const generateBoardFromSeedV2 = (
  sideLength: number,
  seed: number,
  shouldColorBoard = true
): Board => {
  const rng = new RNG(seed);

  const starPositions = getStarPositions(sideLength, rng);

  // These color sizes are no longer used in this version,
  // but we still need to run it to keep the seed with the same number of calls
  getColorSizes(sideLength, rng);

  const board = generateRegionsV2({
    starPositions,
    rng,
  });

  const coloredBoard = shouldColorBoard ? colorsToRegions(board) : board;

  return coloredBoard;
};
