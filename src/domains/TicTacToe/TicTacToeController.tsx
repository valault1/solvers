import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import { KinematicsCalculator } from "domains/Physics/KinematicsCalculator";
import {
  getWinner,
  getWinnerMessage,
  makeComputerMove,
} from "domains/TicTacToe/helpers";
import { Square } from "domains/TicTacToe/Square";
import * as React from "react";

export const StyledRow = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

export enum WINNER {
  COMPUTER = "COMPUTER",
  USER = "USER",
  USER2 = "USER2",
  TIE = "TIE",
  // Means game is in progress
  NONE = "NONE",
}
const O = "O";
const X = "X";
export const EMPTY_SYMBOL = "";

const BOARD_SIZE = 3;

export type Symbol = typeof O | typeof X | typeof EMPTY_SYMBOL;
export type GameBoard = Symbol[][];
export type GameState = {
  board: GameBoard;
  userSymbol: Symbol;
  computerSymbol: Symbol;
};
const startingBoard: GameBoard = Array(BOARD_SIZE).fill(
  Array(BOARD_SIZE).fill(EMPTY_SYMBOL, 0, BOARD_SIZE),
  0,
  BOARD_SIZE
);
const userSymbol = "O";
const computerSymbol = "X";
const user2Symbol = "X";
export const TicTacToeController: React.VFC = () => {
  const [board, setBoard] = React.useState(startingBoard);
  const [computerWins, setComputerWins] = React.useState(0);
  const [userWins, setUserWins] = React.useState(0);
  const [user2Wins, setUser2Wins] = React.useState(0);
  const [ties, setTies] = React.useState(0);
  const [winner, setWinner] = React.useState(WINNER.NONE);
  const [isMultiplayer, setIsMultiplayer] = React.useState(false);
  const [user1GoesFirst, setUser1GoesFirst] = React.useState(true);
  const [currentUserSymbol, setCurrentUserSymbol] =
    React.useState<Symbol>(userSymbol);
  const clickSquare = (i: number, j: number) => {
    if (board[i]?.[j] !== "" || winner !== WINNER.NONE) return;
    let newBoard = board.map((row) => [...row]);
    newBoard[i][j] = currentUserSymbol;
    let gameState: GameState = {
      board: newBoard,
      userSymbol,
      computerSymbol: isMultiplayer ? user2Symbol : computerSymbol,
    };
    let currentWinner = getWinner({ ...gameState, isMultiplayer });
    if (!isMultiplayer) {
      if (currentWinner === WINNER.NONE) {
        makeComputerMove(gameState);
        currentWinner = getWinner({ ...gameState, isMultiplayer });
      }
    } else {
      setCurrentUserSymbol((prev) =>
        prev === userSymbol ? user2Symbol : userSymbol
      );
    }
    setWinner(currentWinner);
    if (currentWinner === WINNER.COMPUTER) {
      setComputerWins((prevWins) => prevWins + 1);
    } else if (currentWinner === WINNER.USER) {
      setUserWins((prevWins) => prevWins + 1);
    } else if (currentWinner === WINNER.USER2) {
      setTies((prevWins) => prevWins + 1);
    } else if (currentWinner === WINNER.TIE) {
      setTies((prevWins) => prevWins + 1);
    }
    setBoard(newBoard);
  };
  const resetGame = () => {
    setWinner(WINNER.NONE);

    const alternateStartingMoves = true;

    if (isMultiplayer && alternateStartingMoves) {
      const gamesPlayed = user2Wins + userWins + ties;
      setCurrentUserSymbol(gamesPlayed % 2 === 0 ? userSymbol : user2Symbol);
    } else {
      setCurrentUserSymbol(userSymbol);
    }
    if (!isMultiplayer && alternateStartingMoves) {
      const gamesPlayed = computerWins + userWins + ties;
      let newBoard = JSON.parse(JSON.stringify(startingBoard));
      if (gamesPlayed % 2 === 1) {
        makeComputerMove({ board: newBoard, userSymbol, computerSymbol });
      }
      setBoard(newBoard);
    } else {
      setBoard(startingBoard);
    }
  };
  const resetWins = () => {
    setUser2Wins(0);
    setUserWins(0);
    setComputerWins(0);
    setTies(0);
  };
  const getCurrentTurnText = (currentUserSymbol: Symbol) => {
    if (currentUserSymbol === userSymbol && isMultiplayer) {
      return `Current turn: User 1 (${userSymbol})`;
    }
    if (currentUserSymbol === user2Symbol && isMultiplayer) {
      return `Current turn: User 2 (${user2Symbol})`;
    }
    return "";
  };

  return (
    <MainContainer>
      {isMultiplayer && <div>{getCurrentTurnText(currentUserSymbol)}</div>}
      <br />
      {board.map((row, i) => (
        <StyledRow>
          {row.map((val, j) => (
            <div onClick={() => clickSquare(i, j)}>
              <Square
                value={val}
                rowNumber={i}
                columnNumber={j}
                gridSize={board.length}
              />{" "}
            </div>
          ))}
        </StyledRow>
      ))}
      <div>
        User {isMultiplayer && "1 "} wins:{userWins}
      </div>
      {!isMultiplayer && <div>Computer wins:{computerWins}</div>}
      {isMultiplayer && <div>User 2 wins:{user2Wins}</div>}
      <div>Ties:{ties}</div>
      <br />
      <PrimaryButton onClick={resetGame}> New Game </PrimaryButton>
      <StyledRow>
        Single Player Mode
        <Switch
          value={isMultiplayer}
          onChange={() => {
            setIsMultiplayer((prev) => !prev);
            resetGame();
            resetWins();
          }}
        />{" "}
        Two Player Mode
      </StyledRow>
      {winner !== WINNER.NONE && getWinnerMessage(winner, isMultiplayer)}
    </MainContainer>
  );
};
