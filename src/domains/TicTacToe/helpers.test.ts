import { describe, expect } from "@jest/globals";
import { getPerfectMoveV1 } from "domains/TicTacToe/getPerfectMoveV1";
import { isCheckmateMove, makeComputerMove } from "domains/TicTacToe/helpers";
import { GameBoard, Symbol } from "domains/TicTacToe/TicTacToeController";

describe("getComputerMove()", () => {
  const checkWinningMoves = (userSymbol: Symbol, computerSymbol: Symbol) => {
    let board: GameBoard = [
      ["", "", ""],
      ["X", "", ""],
      ["X", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][0]).toEqual(computerSymbol);
    board = [
      ["X", "", ""],
      ["", "", ""],
      ["X", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][0]).toEqual(computerSymbol);
    board = [
      ["X", "", ""],
      ["X", "", ""],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[2][0]).toEqual(computerSymbol);

    board = [
      ["", "X", ""],
      ["", "", ""],
      ["", "X", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][1]).toEqual(computerSymbol);
    board = [
      ["", "", ""],
      ["", "", "X"],
      ["", "", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][2]).toEqual(computerSymbol);
    board = [
      ["X", "X", "O"],
      ["X", "O", "X"],
      ["O", "X", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[2][0]).toEqual("O");
    expect(board[1][1]).toEqual("O");
    expect(board[0][2]).toEqual("O");
    board = [
      ["X", "X", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][2]).toEqual(computerSymbol);
    board = [
      ["", "", ""],
      ["X", "", "X"],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][1]).toEqual(computerSymbol);
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "X", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[2][0]).toEqual(computerSymbol);

    board = [
      ["", "", ""],
      ["", "X", "X"],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][0]).toEqual(computerSymbol);
    board = [
      ["X", "O", "X"],
      ["X", "X", "O"],
      ["O", "X", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][1]).toEqual("O");
    expect(board[1][2]).toEqual("O");
    expect(board[2][0]).toEqual("O");
    board = [
      ["", "", ""],
      ["", "X", ""],
      ["", "", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][0]).toEqual(computerSymbol);
    board = [
      ["X", "", ""],
      ["", "", ""],
      ["", "", "X"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][1]).toEqual(computerSymbol);
    board = [
      ["X", "", ""],
      ["", "X", ""],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[2][2]).toEqual(computerSymbol);

    board = [
      ["", "", ""],
      ["", "X", ""],
      ["X", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][2]).toEqual(computerSymbol);
    board = [
      ["", "", "X"],
      ["", "", ""],
      ["X", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[1][1]).toEqual(computerSymbol);
    board = [
      ["", "", "X"],
      ["", "X", ""],
      ["", "", ""],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[2][0]).toEqual(computerSymbol);
    board = [
      ["X", "", "O"],
      ["", "X", ""],
      ["X", "", "O"],
    ];
    makeComputerMove({ board, userSymbol, computerSymbol });
    expect(board[0][2]).toEqual("O");
    expect(board[2][2]).toEqual("O");
  };

  it("getComputerMove() makes winning moves", () => {
    checkWinningMoves("O", "X");
  });
  it("getComputerMove() blocks opponents' winning moves", () => {
    checkWinningMoves("X", "O");
  });
});

describe("isCheckmateMove()", () => {
  const userSymbol = "O";
  const computerSymbol = "X";
  it("recognizes a checkmate 1 ", () => {
    let board: GameBoard = [
      ["O", "", "O"],
      ["", "X", ""],
      ["X", "", "O"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(true);
  });
  it("recognizes a checkmate 2 ", () => {
    let board: GameBoard = [
      ["O", "O", ""],
      ["", "X", ""],
      ["O", "", "O"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(true);
  });
  it("recognizes a checkmate 3 ", () => {
    let board: GameBoard = [
      ["O", "", "O"],
      ["", "O", "O"],
      ["X", "", ""],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(true);
  });
  it("recognizes a checkmate 4 ", () => {
    let board: GameBoard = [
      ["O", "", "O"],
      ["", "O", "O"],
      ["X", "X", ""],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(true);
  });
  it("recognizes a checkmate 5 ", () => {
    let board: GameBoard = [
      ["O", "X", ""],
      ["", "O", ""],
      ["O", "", "X"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(true);
  });
  it("doesn't throw false positives 1", () => {
    let board: GameBoard = [
      ["X", "", "X"],
      ["", "X", ""],
      ["X", "", "X"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(false);
  });
  it("doesn't throw false positives 2", () => {
    let board: GameBoard = [
      ["X", "", ""],
      ["", "X", "O"],
      ["X", "", "O"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(false);
  });
  it("doesn't throw false positives 3", () => {
    let board: GameBoard = [
      ["O", "O", ""],
      ["", "X", "O"],
      ["X", "", "O"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(false);
  });
  it("doesn't throw false positives 4", () => {
    let board: GameBoard = [
      ["X", "", "O"],
      ["", "X", "O"],
      ["X", "", "O"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(false);
  });
  it("doesn't throw false positives 5", () => {
    let board: GameBoard = [
      ["O", "X", "O"],
      ["", "O", ""],
      ["X", "O", "X"],
    ];
    expect(isCheckmateMove(board, userSymbol)).toBe(false);
  });
});

describe("getPerfectMovev1()", () => {
  let userSymbol: Symbol = "O";
  let computerSymbol: Symbol = "X";
  it("works", () => {
    let board: GameBoard = [
      ["", "", ""],
      ["", "O", ""],
      ["", "", ""],
    ];
    expect(
      getPerfectMoveV1({ board, userSymbol, computerSymbol }).toString()
    ).toBe([2, 2].toString());
  });
});
