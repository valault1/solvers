import styled from "@emotion/styled";
import { darken } from "@mui/material";
import { theme } from "components/theme/theme";
import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import { Hexagon } from "domains/TrapTheCat/components/Hexagon";
import {
  CAT_SYMBOL,
  HexBoard,
  USER_SYMBOL,
} from "domains/TrapTheCat/sharedTypes";
import * as React from "react";
import { CSSProperties } from "react";
export type HexBoardProps = {
  board: HexBoard;
  selectHex: (i: number, j: number) => void;
  gameIsOver?: boolean;
};

const catImageStyle: CSSProperties = {
  width: 35,
  height: 35,
  zIndex: 2,
  marginLeft: 0,
  marginTop: -2,
};

const HEXAGON_SIZE = 30;
const rowOffset = 18;
const gapBetweenRows = -2;
const gapBetweenColumns = 7;

const HexagonWrapper = styled.div(() => ({
  display: "flex",
  height: HEXAGON_SIZE,
  width: HEXAGON_SIZE,
}));

const RowWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: gapBetweenColumns,
  marginBottom: gapBetweenRows,
});

const BoardWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  marginBottom: HEXAGON_SIZE,
});

export const HexBoardDisplay: React.FC<HexBoardProps> = ({
  board,
  selectHex,
  gameIsOver,
}) => {
  const emptyColor = theme.colors.secondary;
  const filledColor = darken(theme.colors.secondary, 0.5);

  return (
    <BoardWrapper>
      {board.map((row, rowIndex) => (
        <RowWrapper
          key={rowIndex}
          style={{ marginLeft: rowIndex % 2 ? 0 : -rowOffset }}
        >
          {row.map((hexValue, colIndex) => {
            let isClickable = hexValue === EMPTY_SYMBOL && !gameIsOver;
            let hexagonColor =
              hexValue === USER_SYMBOL ? filledColor : emptyColor;
            return (
              <HexagonWrapper key={`${rowIndex},${colIndex}`}>
                {hexValue !== CAT_SYMBOL && (
                  <>
                    <Hexagon
                      onClickHex={() => {
                        if (isClickable) selectHex(rowIndex, colIndex);
                      }}
                      color={hexagonColor}
                      allowHover={isClickable}
                    />
                  </>
                )}
                {hexValue === CAT_SYMBOL && (
                  <img
                    style={catImageStyle}
                    src={require("domains/TrapTheCat/img/cat4.gif")}
                    alt={"cat"}
                  />
                )}
              </HexagonWrapper>
            );
          })}
        </RowWrapper>
      ))}
    </BoardWrapper>
  );
};
