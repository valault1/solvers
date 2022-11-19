import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  MancalaPlayerRocksSquare,
  MancalaSquare,
} from "domains/Mancala/MancalaSquare";
import {
  copyBoard,
  makeComputerMove,
  performMove,
} from "domains/Mancala/moveHelpers";
import { MoveCoords, MoveIndicator } from "domains/Mancala/MoveIndicator";
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
export type MoveToShow = {
  rowNumber: number;
  squareNumber: number;
  setToZero?: boolean;
};

export const MancalaController: React.VFC = () => {
  const [mancalaBoard, setMancalaBoard] = React.useState(startingBoard);
  const [newBoard, setNewBoard] = React.useState(startingBoard);
  const [movesToShow, setMovesToShow] = React.useState<MoveToShow[]>([
    { rowNumber: 0, squareNumber: 1 },
    { rowNumber: 0, squareNumber: 2 },
    { rowNumber: 0, squareNumber: 3 },
  ]);
  console.log({ movesToShow });
  const { board, player1Rocks, player2Rocks, playerTurn } = mancalaBoard;

  const [isPlayingAgainstComputer, setIsPlayingAgainstComputer] =
    React.useState(true);

  const resetGame = () => {
    setMancalaBoard(startingBoard);
  };

  function makeMove(rowNumber: number, squareNumber: number) {
    if (rowNumber === playerTurn) {
      // performMove should create the new board, and set it to newBoard; this is in case the playback goes wrong.
      // It then returns a list of MovesToShow, that we set to moveToShow and
      let { newBoard, movesToShow } = performMove(mancalaBoard, squareNumber);

      while (
        newBoard.playerTurn === PlayerTurn.Player2Turn &&
        isPlayingAgainstComputer
      ) {
        //newBoard = makeComputerMove(newBoard);
        console.log({ newBoard });
      }
      setMancalaBoard(newBoard);
    }
  }

  function showDot({ rowNumber, squareNumber }: MoveToShow) {
    return (
      rowNumber === movesToShow[0]?.rowNumber &&
      squareNumber === movesToShow[0]?.squareNumber
    );
  }
  const moveTransitionTime = 750;
  React.useEffect(() => {
    let newMovesToShow = [...movesToShow];
    if (movesToShow.length > 0) {
      setTimeout(
        () => setMovesToShow(newMovesToShow.slice(1)),
        moveTransitionTime
      );
    }
  }, [movesToShow, setMovesToShow]);

  return (
    <MainContainer>
      <StyledRow gap={8}>
        <PlayerTurnText>
          {playerTurn === PlayerTurn.Player1Turn && "Player 1's turn"}
        </PlayerTurnText>
        <StyledColumn>
          <MoveIndicator
            showDot={showDot({
              rowNumber: MoveCoords.Player2RocksRowNum,
              squareNumber: MoveCoords.Player2RocksSquareNum,
            })}
          />
          <MancalaPlayerRocksSquare value={player2Rocks.toString()} />
          <StyledRow>
            {board.map((row, rowNumber) => {
              return (
                <>
                  {rowNumber === 0 && (
                    <StyledColumn>
                      {row.map((value, squareNumber) => {
                        return (
                          <MoveIndicator
                            showDot={showDot({ rowNumber, squareNumber })}
                          />
                        );
                      })}
                    </StyledColumn>
                  )}
                  <StyledColumn>
                    {row.map((value, squareNumber) => {
                      return (
                        <div onClick={() => makeMove(rowNumber, squareNumber)}>
                          <MancalaSquare value={value.toString()} />
                        </div>
                      );
                    })}
                  </StyledColumn>
                  {rowNumber === 1 && (
                    <StyledColumn>
                      {row.map((value, squareNumber) => {
                        return (
                          <MoveIndicator
                            showDot={showDot({
                              rowNumber,
                              squareNumber,
                            })}
                          />
                        );
                      })}
                    </StyledColumn>
                  )}
                </>
              );
            })}
          </StyledRow>

          <MancalaPlayerRocksSquare value={player1Rocks.toString()} />
          <MoveIndicator
            showDot={showDot({
              rowNumber: MoveCoords.Player1RocksRowNum,
              squareNumber: MoveCoords.Player1RocksSquareNum,
            })}
          />
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
