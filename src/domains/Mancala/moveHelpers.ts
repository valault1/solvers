import { MoveToShow } from "domains/Mancala/MancalaController";
import {
  Direction,
  MancalaBoard,
  PlayerTurn,
} from "domains/Mancala/sharedTypes";

export function copyBoard(board: MancalaBoard) {
  const boardCopy = board.board.map((row) => [...row]);
  return {
    ...board,
    board: boardCopy,
  };
}

export const performMove = (
  mancalaBoard: MancalaBoard,
  squareNumber: number
): { newBoard: MancalaBoard; movesToShow: MoveToShow[] } => {
  let newBoard = copyBoard(mancalaBoard);
  let { board, player1Rocks, player2Rocks, playerTurn } = newBoard;

  let currentRow = playerTurn === PlayerTurn.Player1Turn ? 0 : 1;
  let numRocks = board[currentRow][squareNumber];
  let nextTurn =
    playerTurn === PlayerTurn.Player1Turn
      ? PlayerTurn.Player2Turn
      : PlayerTurn.Player1Turn;
  board[currentRow][squareNumber] = 0;
  let direction =
    playerTurn === PlayerTurn.Player1Turn ? Direction.DOWN : Direction.UP;
  let currentSquare = squareNumber;
  let movesToShow: MoveToShow[];

  while (numRocks > 0) {
    numRocks -= 1;
    currentSquare += direction;
    if (currentSquare < board[currentRow].length && currentSquare >= 0) {
      board[currentRow][currentSquare] += 1;
    } else {
      if (direction === Direction.UP) {
        if (playerTurn === PlayerTurn.Player2Turn) {
          player2Rocks++;
          if (numRocks === 0) nextTurn = PlayerTurn.Player2Turn;
        }
        direction = Direction.DOWN;
        currentRow = 0;
        currentSquare = -1;
      } else {
        if (playerTurn === PlayerTurn.Player1Turn) {
          player1Rocks++;
          if (numRocks === 0) nextTurn = PlayerTurn.Player1Turn;
        }
        direction = Direction.UP;
        currentRow = 1;
        currentSquare = board[currentRow].length;
      }
    }
  }

  return {
    newBoard: { board, player1Rocks, player2Rocks, playerTurn: nextTurn },
    movesToShow,
  };
};

export const makeComputerMove = (mancalaBoard: MancalaBoard) => {
  let possibleMoves: number[] = [];
  mancalaBoard.board[1].forEach((numRocks, i) => {
    if (numRocks !== 0) possibleMoves.push(i);
  });
  let moveIndex = Math.floor(Math.random() * possibleMoves.length);
  const squareNumber = possibleMoves[moveIndex];
  return performMove(mancalaBoard, squareNumber);
};
