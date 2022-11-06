import {
  EMPTY_SYMBOL,
  GameBoard,
  GameState,
  Symbol,
  WINNER,
} from "domains/TicTacToe/TicTacToeController";
import {
  getWinner,
  getWinningMove,
  isCheckmateMove,
} from "domains/TicTacToe/helpers";

type BoardResult = {
  possibleLosses: number;
  possibleWins: number;
  possibleCheckmates: number;
  possibleTies: number;
};

const initialBoardResult: BoardResult = {
  possibleLosses: 0,
  possibleCheckmates: 0,
  possibleTies: 0,
  possibleWins: 0,
};

//This will store hashed versions of each board, and how many losses, wins,
let calculatedBoardStates: Record<string, BoardResult> = {};

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

// hashes a board to a string, just every box added together. "E" for empty symbol
const hashBoard: (board: GameBoard) => string = (board) => {
  let resultString = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      resultString += board[i][j] !== EMPTY_SYMBOL ? board[i][j] : "E";
    }
  }
  return resultString;
};

const addToResult = (
  currentResult: BoardResult,
  fieldName: keyof BoardResult
) => {
  return { ...currentResult, [fieldName]: currentResult[fieldName] + 1 };
};

const addBoardResults = (boardResults: BoardResult[]) => {
  let result = { ...initialBoardResult };
  for (let i = 0; i < boardResults.length; i++) {
    result.possibleCheckmates += boardResults[i].possibleCheckmates;
    result.possibleLosses += boardResults[i].possibleLosses;
    result.possibleTies += boardResults[i].possibleTies;
    result.possibleWins += boardResults[i].possibleWins;
  }
  return result;
};
//algorithm:
// - Play through the whole game from every possible square
// - Count the number of games that end in ties, wins, checkmates, and losses
const getBoardResult = ({
  board,
  currentBoardResult,
  possibleMoves,
  computerSymbol,
  currentTurnSymbol,
  opponentSymbol,
}: {
  board: GameBoard;
  currentBoardResult: BoardResult;
  currentTurnSymbol: Symbol;
  computerSymbol: Symbol;
  opponentSymbol: Symbol;
  possibleMoves?: number[][];
}): BoardResult => {
  const precalculatedState = calculatedBoardStates[hashBoard(board)];
  if (precalculatedState) return precalculatedState;
  if (
    getWinner({
      board,
      userSymbol: opponentSymbol,
      computerSymbol,
      isMultiplayer: false,
    }) === WINNER.TIE
  ) {
    return addToResult(currentBoardResult, "possibleTies");
  }
  if (currentTurnSymbol === computerSymbol) {
    if (getWinningMove(board, computerSymbol)) {
      return addToResult(currentBoardResult, "possibleWins");
    }
    if (isCheckmateMove(board, opponentSymbol)) {
      return addToResult(currentBoardResult, "possibleLosses");
    }
    const blockOpponentwinningMove = getWinningMove(board, opponentSymbol);
    if (blockOpponentwinningMove) possibleMoves = [blockOpponentwinningMove];
  }
  if (currentTurnSymbol === opponentSymbol) {
    if (isCheckmateMove(board, computerSymbol)) {
      return addToResult(currentBoardResult, "possibleCheckmates");
    }
  }
  if (!possibleMoves) possibleMoves = getPossibleMoves(board);
  let boardResults: BoardResult[] = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let coord = possibleMoves[i];
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[coord[0]][coord[1]] = currentTurnSymbol;
    const nextTurnSymbol =
      currentTurnSymbol === computerSymbol ? opponentSymbol : computerSymbol;
    boardResults.push(
      getBoardResult({
        board: newBoard,
        currentBoardResult,
        computerSymbol,
        currentTurnSymbol: nextTurnSymbol,
        opponentSymbol,
      })
    );
  }
  const totalBoardResults = addBoardResults([
    ...boardResults,
    currentBoardResult,
  ]);
  let result = totalBoardResults;
  calculatedBoardStates[hashBoard(board)] = result;
  return totalBoardResults;
};

const br1isGreaterOrEqualTobr2: (
  br1: BoardResult,
  br2: BoardResult
) => boolean = (br1, br2) => {
  const br1Possibilities =
    br1.possibleCheckmates +
    br1.possibleLosses +
    br1.possibleTies +
    br1.possibleWins;
  const br2Possibilities =
    br2.possibleCheckmates +
    br2.possibleLosses +
    br2.possibleTies +
    br2.possibleWins;
  if (
    br1.possibleLosses / br1Possibilities !==
    br2.possibleLosses / br2Possibilities
  )
    return (
      br1.possibleLosses / br1Possibilities <
      br2.possibleLosses / br2Possibilities
    );
  if (
    br1.possibleCheckmates / br1Possibilities !==
    br2.possibleCheckmates / br2Possibilities
  )
    return (
      br1.possibleCheckmates / br1Possibilities >
      br2.possibleCheckmates / br2Possibilities
    );
  if (
    br1.possibleWins / br1Possibilities !==
    br2.possibleWins / br2Possibilities
  )
    return (
      br1.possibleWins / br1Possibilities > br2.possibleWins / br2Possibilities
    );
  return br1.possibleTies >= br2.possibleTies;
};

// the best board result criteria:
// Has the least losses
// Has the most checkmates
// If a checkmate tie, has the most wins
// possibleMoves and boardResults are in order; move[i] resulted in boardResults[i]
const findMoveWithBestBoardResult = (
  boardResults: BoardResult[],
  possibleMoves: number[][]
) => {
  let bestMoveIndex = 0;
  for (let i = 0; i < boardResults.length; i++) {
    if (
      br1isGreaterOrEqualTobr2(boardResults[i], boardResults[bestMoveIndex])
    ) {
      bestMoveIndex = i;
    }
  }
  return possibleMoves[bestMoveIndex];
};

// Get one Computer move. Assume you've already checked for blocking/winning moves.
export const getPerfectMoveV1 = ({
  board,
  userSymbol,
  computerSymbol,
}: GameState) => {
  const startTime = new Date();
  let possibleMoves = getPossibleMoves(board);
  let boardResults: BoardResult[] = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let coord = possibleMoves[i];
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[coord[0]][coord[1]] = computerSymbol;
    boardResults.push(
      getBoardResult({
        board: newBoard,
        currentBoardResult: initialBoardResult,
        computerSymbol,
        currentTurnSymbol: userSymbol,
        opponentSymbol: userSymbol,
      })
    );
    console.log({ results: boardResults[i] });
  }
  console.log({ boardResults, possibleMoves });
  let result = findMoveWithBestBoardResult(boardResults, possibleMoves);
  console.log(
    `Time to run getPerfectmoveV1: ${
      new Date().getTime() - startTime.getTime()
    }`
  );
  return result;
};
