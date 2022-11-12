import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  MancalaPlayerRocksSquare,
  MancalaSquare,
} from "domains/Mancala/MancalaSquare";
import { makeComputerMove, performMove } from "domains/Mancala/moveHelpers";
import { MancalaBoard, PlayerTurn } from "domains/Mancala/sharedTypes";
import * as React from "react";

type CssProps = {
  gap?: number;
};
export const StyledRow = styled.div<CssProps>(({ gap }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap,
}));
export const StyledColumn = styled.div<CssProps>(({ gap }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap,
}));
export const PlayerTurnText = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 100,
}));

export enum WINNER {
  COMPUTER = "COMPUTER",
  USER = "USER",
  USER2 = "USER2",
  TIE = "TIE",
  // Means game is in progress
  NONE = "NONE",
}

export const BOARD_SIZE = 6;
const NUM_STARTING_ROCKS = 4;

const startingBoard: MancalaBoard = {
  board: Array(2).fill(Array(BOARD_SIZE).fill(NUM_STARTING_ROCKS)),
  player1Rocks: 0,
  player2Rocks: 0,
  playerTurn: PlayerTurn.Player1Turn,
};

export const MancalaController: React.VFC = () => {
  const [mancalaBoard, setMancalaBoard] = React.useState(startingBoard);
  const { board, player1Rocks, player2Rocks, playerTurn } = mancalaBoard;

  const [isPlayingAgainstComputer, setIsPlayingAgainstComputer] =
    React.useState(true);

  const resetGame = () => {
    setMancalaBoard(startingBoard);
  };

  function makeMove(rowNumber: number, squareNumber: number) {
    if (rowNumber === playerTurn) {
      let newBoard = performMove(mancalaBoard, squareNumber);

      while (
        newBoard.playerTurn === PlayerTurn.Player2Turn &&
        isPlayingAgainstComputer
      ) {
        newBoard = makeComputerMove(newBoard);
        console.log({ newBoard });
      }
      setMancalaBoard(newBoard);
    }
  }

  return (
    <MainContainer>
      <StyledRow gap={8}>
        <PlayerTurnText>
          {playerTurn === PlayerTurn.Player1Turn && "Player 1's turn"}
        </PlayerTurnText>
        <StyledColumn>
          <MancalaPlayerRocksSquare value={player2Rocks.toString()} />
          <StyledRow>
            {board.map((row, rowNumber) => {
              return (
                <StyledColumn>
                  {row.map((value, squareNumber) => {
                    return (
                      <div onClick={() => makeMove(rowNumber, squareNumber)}>
                        <MancalaSquare value={value.toString()} />
                      </div>
                    );
                  })}
                </StyledColumn>
              );
            })}
          </StyledRow>

          <MancalaPlayerRocksSquare value={player1Rocks.toString()} />
        </StyledColumn>
        <PlayerTurnText>
          {playerTurn === PlayerTurn.Player2Turn && "Player 2's turn"}
        </PlayerTurnText>
      </StyledRow>
      <PrimaryButton onClick={resetGame}> New Game </PrimaryButton>
      <StyledRow>
        One Player Mode
        <Switch
          value={isPlayingAgainstComputer}
          onChange={() => setIsPlayingAgainstComputer((prev) => !prev)}
        ></Switch>
        Two Player Mode
      </StyledRow>
    </MainContainer>
  );
};
