export const CAT_SYMBOL = "C";
export const USER_SYMBOL = "X";
export const EMPTY_SYMBOL = "";
export type Symbol =
  | typeof CAT_SYMBOL
  | typeof USER_SYMBOL
  | typeof EMPTY_SYMBOL;
export type HexBoard = Symbol[][];

export const CAT_BOARD_HEIGHT = 11;
export const CAT_BOARD_WIDTH = 11;
