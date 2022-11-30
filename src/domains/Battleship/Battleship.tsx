import styled from "@emotion/styled";
import { MainContainer } from "components/MainPage.elements";
import { BattleshipSquare } from "domains/Battleship/BattleshipSquare";
import {
  getBestBattleshipMove,
  getStringFromCoords,
} from "domains/Battleship/getBestBattleshipMove";
import {
  BattleshipBoard,
  BEST_GUESS_SYMBOL,
  EMPTY_SYMBOL,
  HIT_SYMBOL,
  MISS_SYMBOL,
  Symbol,
} from "domains/Battleship/sharedTypes";
import * as React from "react";

const BOARD_SIZE = 8;

export const SHIPS = [2, 3, 4];

const StyledRow = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));
const StyledColumn = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ShipsColumn = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 20,
  gap: 10,
}));

export const Battleship = () => {
  const initialBoard = React.useMemo(() => {
    let row = Array(BOARD_SIZE).fill(EMPTY_SYMBOL);
    let board: BattleshipBoard = [];
    for (let square of row) {
      board.push([...row]);
    }
    return board;
  }, []);

  const [board, setBoard] = React.useState(initialBoard);

  const [ships, setShips] = React.useState([2, 3, 4]);

  const [bestGuesses, setBestGuesses] = React.useState<string[]>([]);
  const setBoardTile = (i: number, j: number, value: Symbol) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[i][j] = value;
    setBoard(newBoard);
  };

  const onHit = (i: number, j: number) => {
    setBoardTile(i, j, HIT_SYMBOL);
  };

  const onMiss = (i: number, j: number) => {
    setBoardTile(i, j, MISS_SYMBOL);
  };

  const removeShip = (i: number) => {
    console.log("removing ship at " + i);
    let newShips: number[] = [];
    if (i === 0) newShips = ships.slice(1);
    else if (i === newShips.length - 1)
      newShips = ships.slice(0, ships.length - 2);
    else newShips = ships.slice(0, i).concat(ships.slice(i + 1));
    console.log("Setting ships to " + newShips);
    setShips(newShips);
  };

  React.useEffect(() => {
    let newBestGuesses = getBestBattleshipMove(board, ships);
    setBestGuesses(newBestGuesses);
  }, [board, ships]);

  return (
    <MainContainer>
      <StyledRow>
        <StyledColumn>
          {board.map((row, i) => (
            <StyledRow key={i}>
              {row.map((tile, j) => (
                <BattleshipSquare
                  key={`${tile}-${j}`}
                  value={
                    bestGuesses.find(
                      (guess) => guess === getStringFromCoords([i, j])
                    )
                      ? BEST_GUESS_SYMBOL
                      : tile
                  }
                  onClickHit={() => onHit(i, j)}
                  onClickMiss={() => onMiss(i, j)}
                />
              ))}
            </StyledRow>
          ))}
        </StyledColumn>
        <ShipsColumn>
          {ships.map((ship, i) => {
            return <div onClick={() => removeShip(i)}>{ship}</div>;
          })}
        </ShipsColumn>
      </StyledRow>
    </MainContainer>
  );
};
