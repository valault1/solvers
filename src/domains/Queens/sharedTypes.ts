import { BOARD_COLORS, COLORS_LIST } from "domains/Queens/constants/constants";

export type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type PixelArray = RgbaColor[][];

export type Color = { red: number; green: number; blue: number };

export type Token = "Q" | "X" | "";
export type BoardColor = keyof typeof BOARD_COLORS;
export type ImageColor = keyof typeof COLORS_LIST;
export type BoardTile = { token: Token; color: BoardColor };
export type Board = BoardTile[][];
export type BlankBoardRow = BoardColor[];
export type BlankBoard = BlankBoardRow[];
export type Coords = { row: number; col: number };

export type Guess = {
  boardState: Board;
  guessesTried: Coords[];
  lastGuess: Coords;
};
