import { BlankBoard, Board } from "domains/Queens/sharedTypes";

const placeQueen = (board: Board, row: number, col: number) => {
  board[row][col].token = "Q";
};

export const solveBoard = (blankBoard: BlankBoard): Board => {
  const board: Board = blankBoard.map((row) =>
    row.map((color) => ({ token: "", color }))
  );

  placeQueen(board, 0, 0);

  return board;
};
