import { BOARD_COLORS, COLORS_LIST } from "domains/Queens/constants/constants";

export type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type PixelArray = RgbaColor[][];

// BoardWithBorders ------------------------------------------------------------
// the tiles and boards with borders are for generated a board
export type TileWithBorders = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  token: Token;
  region: number;
};
export type BoardWithBorders = TileWithBorders[][];

// BoardWithRegions ------------------------------------------------------------
// This is a blank board that has regions, but has not been assigned colors
export type TileWithRegion = { token: Token; region: number };
export type BoardWithRegions = TileWithRegion[][];

// Board
// This board is the normal one played - it has colors, tokens, and conflicts
export type Color = { red: number; green: number; blue: number };

export type Token = "Q" | "X" | "";
export type BoardColor = keyof typeof BOARD_COLORS;
export type ImageColor = keyof typeof COLORS_LIST;
export type BoardTile = {
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
export type Board = BoardTile[][];
export type BlankBoardRow = BoardColor[];
export type BlankBoard = BlankBoardRow[];

export type TileChange = {
  prevToken: Token;
  newToken: Token;
  row: number;
  col: number;
};
export type Move = TileChange[];
export type Coords = { row: number; col: number };

export type Guess = {
  boardState: Board;
  guessesTried: Coords[];
  lastGuess: Coords;
};
