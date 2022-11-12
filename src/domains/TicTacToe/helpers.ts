import { BorderAllRounded } from "@mui/icons-material";
import { getPerfectMoveV1 } from "domains/TicTacToe/getPerfectMoveV1";
import {
  WINNER,
  Symbol,
  GameBoard,
  EMPTY_SYMBOL,
  GameState,
} from "domains/TicTacToe/TicTacToeController";

type GetMoveFunction = (gameState: GameState) => number[] | undefined;

const checkDiagonalsForWinningMove = (board: GameBoard, symbol: Symbol) => {
  let numEmptySymbols = 0;
  let numSymbols = 0;
  let lastEmptySymbolCoords = undefined;
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === symbol) {
      numSymbols++;
    } else if (board[i][i] === EMPTY_SYMBOL) {
      numEmptySymbols++;
      lastEmptySymbolCoords = [i, i];
    }
  }
  if (numSymbols === board.length - 1 && numEmptySymbols === 1)
    return lastEmptySymbolCoords;
  numEmptySymbols = 0;
  numSymbols = 0;
  lastEmptySymbolCoords = undefined;
  for (let i = 0; i < board.length; i++) {
    if (board[i][board.length - i - 1] === symbol) {
      numSymbols++;
    } else if (board[i][board.length - i - 1] === EMPTY_SYMBOL) {
      numEmptySymbols++;
      lastEmptySymbolCoords = [i, board.length - i - 1];
    }
  }

  if (numSymbols === board.length - 1 && numEmptySymbols === 1)
    return lastEmptySymbolCoords;
  return undefined;
};

const checkColumnsForWinningMove = (board: GameBoard, symbol: Symbol) => {
  for (let j = 0; j < board.length; j++) {
    let numEmptySymbols = 0;
    let lastEmptySymbolCoordinates = undefined;
    let numSymbols = 0;
    for (let i = 0; i < board[j].length; i++) {
      if (board[i][j] === EMPTY_SYMBOL) {
        numEmptySymbols++;
        lastEmptySymbolCoordinates = [i, j];
      } else if (board[i][j] === symbol) {
        numSymbols++;
      }
    }
    if (numSymbols === board[j].length - 1 && numEmptySymbols === 1)
      return lastEmptySymbolCoordinates;
  }
  return undefined;
};
const checkRowsForWinningMove = (board: GameBoard, symbol: Symbol) => {
  for (let i = 0; i < board.length; i++) {
    let numEmptySymbols = 0;
    let lastEmptySymbolCoordinates = undefined;
    let numSymbols = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === EMPTY_SYMBOL) {
        numEmptySymbols++;
        lastEmptySymbolCoordinates = [i, j];
      } else if (board[i][j] === symbol) {
        numSymbols++;
      }
    }
    if (numSymbols === board[i].length - 1 && numEmptySymbols === 1)
      return lastEmptySymbolCoordinates;
  }
  return undefined;
};

export const getWinningMove = (board: GameBoard, symbol: Symbol) => {
  const possibleRowsWinMove = checkRowsForWinningMove(board, symbol);
  if (possibleRowsWinMove) return possibleRowsWinMove;
  const possibleColumnsWinMove = checkColumnsForWinningMove(board, symbol);
  if (possibleColumnsWinMove) return possibleColumnsWinMove;
  const possibleDiagonalsWinMove = checkDiagonalsForWinningMove(board, symbol);
  if (possibleDiagonalsWinMove) {
    return possibleDiagonalsWinMove;
  }
  return undefined;
};

const countMovesPlayed = ({ board, userSymbol, computerSymbol }: GameState) => {
  let result = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === userSymbol || board[i][j] === computerSymbol) {
        result++;
      }
    }
  }
  return result;
};

const getPossibleMoves = (board: GameBoard) => {
  let result: number[][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === EMPTY_SYMBOL) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

const removeDuplicates = (arr: any[]) => {
  let stringifiedObjects = [];
  for (let obj of arr) {
    stringifiedObjects.push(JSON.stringify(obj));
  }
  let uniqueArray = stringifiedObjects.filter(function (item, pos, self) {
    return self.indexOf(item) === pos;
  });

  return uniqueArray.map((obj) => JSON.parse(obj));
};

// It is a checkmate if there are two squares you can play that both win
export const isCheckmateMove = (board: GameBoard, symbol: Symbol) => {
  let winningMoves: number[][] = [];
  winningMoves.push(checkRowsForWinningMove(board, symbol));
  winningMoves.push(checkColumnsForWinningMove(board, symbol));
  winningMoves.push(checkDiagonalsForWinningMove(board, symbol));
  winningMoves = winningMoves.filter((a) => a !== undefined);
  return removeDuplicates(winningMoves).length > 1;
};

const getCheckmateMove = (board: GameBoard, symbol: Symbol) => {
  const possibleMoves = getPossibleMoves(board);
  for (let i = 0; i < possibleMoves.length; i++) {
    let coord = possibleMoves[i];
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[coord[0]][coord[1]] = symbol;
    if (isCheckmateMove(newBoard, symbol)) {
      return coord;
    }
  }
  return undefined;
};

const makeMove = (board: GameBoard, move: number[], symbol: Symbol) => {
  board[move[0]][move[1]] = symbol;
};

export const makeComputerMove = (gameState: GameState) => {
  let { board, userSymbol, computerSymbol } = gameState;
  const movesPlayed = countMovesPlayed(gameState);
  const computerStarted = !!(movesPlayed % 2);
  // If there's a winning move, take it
  const computerWinningMove = getWinningMove(board, computerSymbol);
  if (computerWinningMove) {
    makeMove(board, computerWinningMove, computerSymbol);
    return;
  }
  // Block any winning move by user
  const userWinningMove = getWinningMove(board, userSymbol);
  if (userWinningMove) {
    makeMove(board, userWinningMove, computerSymbol);
    return;
  }
  // If there's a move that lets you checkmate, take it
  const computerCheckmateMove = getCheckmateMove(board, computerSymbol);
  if (computerCheckmateMove) {
    makeMove(board, computerCheckmateMove, computerSymbol);
    return;
  }

  const perfectMove = getPerfectMoveV1({ board, userSymbol, computerSymbol });
  if (perfectMove) {
    makeMove(board, perfectMove, computerSymbol);
    return;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === EMPTY_SYMBOL) {
        board[i][j] = computerSymbol;
        return;
      }
    }
  }
};

const checkRowsForCurrentWin = ({
  board,
  computerSymbol,
  userSymbol,
}: GameState) => {
  for (let i = 0; i < board.length; i++) {
    let numUserSymbols = 0;
    let numComputerSymbols = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === userSymbol) {
        numUserSymbols++;
      } else if (board[i][j] === computerSymbol) {
        numComputerSymbols++;
      }
    }
    if (numUserSymbols === board[i].length) return WINNER.USER;
    else if (numComputerSymbols === board[i].length) return WINNER.COMPUTER;
  }
  return undefined;
};

const checkColumnsForCurrentWin = ({
  board,
  computerSymbol,
  userSymbol,
}: GameState) => {
  for (let i = 0; i < board[0].length; i++) {
    let numUserSymbols = 0;
    let numComputerSymbols = 0;
    for (let j = 0; j < board.length; j++) {
      if (board[j][i] === userSymbol) {
        numUserSymbols++;
      } else if (board[j][i] === computerSymbol) {
        numComputerSymbols++;
      }
    }
    if (numUserSymbols === board[i].length) return WINNER.USER;
    else if (numComputerSymbols === board[i].length) return WINNER.COMPUTER;
  }
  return undefined;
};

const checkDiagonalsForCurrentWin = ({
  board,
  computerSymbol,
  userSymbol,
}: GameState) => {
  let numUserSymbolsDiag1 = 0;
  let numUserSymbolsDiag2 = 0;
  let numComputerSymbolsDiag1 = 0;
  let numComputerSymbolsDiag2 = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === userSymbol) {
      numUserSymbolsDiag1++;
    } else if (board[i][i] === computerSymbol) {
      numComputerSymbolsDiag1++;
    }
    if (board[i][board.length - 1 - i] === userSymbol) {
      numUserSymbolsDiag2++;
    } else if (board[i][board.length - 1 - i] === computerSymbol) {
      numComputerSymbolsDiag2++;
    }
  }
  if (
    numUserSymbolsDiag1 === board.length ||
    numUserSymbolsDiag2 === board.length
  )
    return WINNER.USER;
  else if (
    numComputerSymbolsDiag1 === board.length ||
    numComputerSymbolsDiag2 === board.length
  )
    return WINNER.COMPUTER;
  return undefined;
};

const mapWinnerResult = (
  input: ReturnType<typeof checkDiagonalsForCurrentWin>,
  isMultiplayer: boolean
) => {
  if (input === WINNER.COMPUTER && isMultiplayer) return WINNER.USER2;
  if (input === WINNER.COMPUTER && !isMultiplayer) return WINNER.COMPUTER;
  if (input === WINNER.USER) return WINNER.USER;
  return WINNER.NONE;
};

export const getWinner = ({
  board,
  userSymbol,
  computerSymbol,
  isMultiplayer,
}: GameState & { isMultiplayer: boolean }) => {
  let gameState = { board, userSymbol, computerSymbol };
  const rowsWinner = checkRowsForCurrentWin(gameState);
  if (rowsWinner) return mapWinnerResult(rowsWinner, isMultiplayer);
  const columnsWinner = checkColumnsForCurrentWin(gameState);
  if (columnsWinner) return mapWinnerResult(columnsWinner, isMultiplayer);
  const diagsWinner = checkDiagonalsForCurrentWin(gameState);
  if (diagsWinner) return mapWinnerResult(diagsWinner, isMultiplayer);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === EMPTY_SYMBOL) return WINNER.NONE;
    }
  }

  return WINNER.TIE;
};

export const getWinnerMessage = (winner: WINNER, isMultiplayer: boolean) => {
  if (winner === WINNER.COMPUTER) return "Computer wins!";
  if (winner === WINNER.USER && !isMultiplayer) return "You win!";
  if (winner === WINNER.USER && isMultiplayer) return "User 1 wins!";
  if (winner === WINNER.USER2) return "User 2 wins!";
  if (winner === WINNER.TIE) return "It's a tie!";
  else return "";
};
