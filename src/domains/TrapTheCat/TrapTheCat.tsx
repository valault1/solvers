import styled from "@emotion/styled";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { WinnerCounts } from "components/WinnerCounts";

import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import { trapTheCatCheckForWinner } from "domains/TrapTheCat/helpers/checkForWinner";
import { HexBoardDisplay } from "domains/TrapTheCat/components/HexBoard";
import { makeCatMove } from "domains/TrapTheCat/helpers/makeCatMove";
import {
  CAT_BOARD_HEIGHT,
  CAT_BOARD_WIDTH,
  CAT_SYMBOL,
  HexBoard,
  USER_SYMBOL,
} from "domains/TrapTheCat/sharedTypes";
import * as React from "react";
import { useWinnerCounts } from "shared/hooks/useWinnerCounts";

type CssProps = {
  gap?: number;
};

export const HEX_BOARD_MIN_WIDTH = "500px";
export const StyledRow = styled.div<CssProps>(({ gap }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  minWidth: HEX_BOARD_MIN_WIDTH,
  gap,
}));

export const WinnerText = styled.div(() => ({ minHeight: 40 }));
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

export const getStartingBoard = (): HexBoard => {
  let board: any = Array(CAT_BOARD_WIDTH).fill(
    Array(CAT_BOARD_WIDTH).fill(EMPTY_SYMBOL)
  );

  board = JSON.parse(JSON.stringify(board));

  board[Math.floor(CAT_BOARD_HEIGHT / 2)][Math.floor(CAT_BOARD_WIDTH / 2)] =
    CAT_SYMBOL;
  // fill with a 10% chance of already being filled (IF not cat one)
  board.forEach((row: any, i: number) =>
    row.forEach((hexValue: any, j: number) => {
      if (hexValue === EMPTY_SYMBOL) {
        if (Math.floor(Math.random() * 10) === 4) board[i][j] = USER_SYMBOL;
      }
    })
  );
  return board;
};

export const TrapTheCat: React.VFC = () => {
  const [board, setBoard] = React.useState(getStartingBoard());
  const { winnerCounts, currentWinner, checkForWinner, winnerText } =
    useWinnerCounts({
      board,
      player1Symbol: USER_SYMBOL,
      player2Symbol: CAT_SYMBOL,
      evaluateWinner: trapTheCatCheckForWinner,
    });

  const selectHex = (i: number, j: number) => {
    setBoard((prev) => {
      let newBoard = JSON.parse(JSON.stringify(board));
      newBoard[i][j] = USER_SYMBOL;

      const boardAfterCatMove = makeCatMove({ board: newBoard });
      return boardAfterCatMove;
    });
  };

  React.useEffect(() => {
    checkForWinner();
  }, [board, checkForWinner]);

  const resetGame = () => {
    setBoard(getStartingBoard());
  };
  return (
    <StyledRow>
      <MainContainer>
        <WinnerText>{winnerText}</WinnerText>
        <HexBoardDisplay
          board={board}
          selectHex={selectHex}
          gameIsOver={currentWinner !== "NONE"}
        />
        <PrimaryButton onClick={resetGame}> New Game </PrimaryButton>
        <br />
        <WinnerCounts winnerCounts={winnerCounts} hideTies />
      </MainContainer>
    </StyledRow>
  );
};
