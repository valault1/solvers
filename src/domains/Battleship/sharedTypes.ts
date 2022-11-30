export const EMPTY_SYMBOL = "";
export const HIT_SYMBOL = "X";
export const MISS_SYMBOL = "O";

export const BEST_GUESS_SYMBOL = "Fire!";

export type Symbol =
  | typeof EMPTY_SYMBOL
  | typeof HIT_SYMBOL
  | typeof MISS_SYMBOL
  | typeof BEST_GUESS_SYMBOL;

export type BattleshipBoard = Symbol[][];

// the arrangement of one ship - given by a list of coordinates to be filled in.
export type ShipArrangement = number[][];
export type SetOfShipArrangements = ShipArrangement[];
