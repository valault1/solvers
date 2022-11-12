export type MancalaBoard = {
  player1Rocks: number;
  player2Rocks: number;
  board: number[][];
  playerTurn: PlayerTurn;
};

export enum PlayerTurn {
  // corresponds to the row of the board.
  // Player 1 is left, Player 2 is right
  Player1Turn = 0,
  Player2Turn = 1,
}

export enum Direction {
  UP = -1,
  DOWN = 1,
}
