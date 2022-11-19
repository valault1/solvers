import styled from "@emotion/styled";
import { darken } from "@mui/material";
import { theme } from "components/theme/theme";
import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import {
  CAT_SYMBOL,
  HexBoard,
  USER_SYMBOL,
} from "domains/TrapTheCat/sharedTypes";
import * as React from "react";
export type HexBoardProps = {
  board: HexBoard;
  selectHex: (i: number, j: number) => void;
  gameIsOver?: boolean;
};

const HEXAGON_SIZE = 50;
const baseWidth = Math.floor((HEXAGON_SIZE * 3) / 5);
const leftRightWidth = Math.floor(HEXAGON_SIZE / 4);
const halfWidth = 28;
const rowGap = -2;

type HexagonProps = { color: string; lightenOnHover?: boolean };
const Hexagon = styled.div<HexagonProps>(({ color, lightenOnHover }) => ({
  transform: "rotate(90deg)",
  display: "flex",
  background: color,
  height: HEXAGON_SIZE,
  width: baseWidth,
  position: "relative",
  left: leftRightWidth,
  boxSizing: "border-box",
  borderTop: `solid ${color}`,
  borderBottom: `solid ${color}`,
  ...(lightenOnHover
    ? {
        ":hover": {
          filter: "brightness(130%)",
          cursor: "pointer",
        },
      }
    : {}),
  ":before": {
    content: '""',
    position: "absolute",
    height: 0,
    width: 0,
    top: 0,
    /* half height */
    borderTop: `${leftRightWidth * 2}px solid transparent`,
    borderBottom: `${leftRightWidth * 2}px solid transparent`,
    left: -leftRightWidth,
    borderRight: `${leftRightWidth}px solid ${color}`,
  },
  ":after": {
    content: '""',
    position: "absolute",
    height: 0,
    width: 0,
    top: 0,
    /* half height */
    borderTop: `${leftRightWidth * 2}px solid transparent`,
    borderBottom: `${leftRightWidth * 2}px solid transparent`,
    right: -leftRightWidth,
    borderLeft: `${leftRightWidth}px solid ${color}`,
  },
}));

const BoardWrapper = styled.div(() => ({
  display: "flex",
  gap: rowGap,
  flexDirection: "column",
  marginBottom: 12,
}));

const RowWrapper = styled.div(() => ({
  display: "flex",
  maxHeight: HEXAGON_SIZE * 0.9,
  gap: leftRightWidth * 2,
  flexDirection: "row",
}));

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
        <RowWrapper style={{ marginLeft: rowIndex % 2 ? 0 : -halfWidth }}>
          {row.map((hexValue, colIndex) => {
            let isClickable = hexValue === EMPTY_SYMBOL && !gameIsOver;
            return (
              <Hexagon
                onClick={() => {
                  if (isClickable) selectHex(rowIndex, colIndex);
                }}
                color={hexValue === USER_SYMBOL ? filledColor : emptyColor}
                lightenOnHover={isClickable}
              >
                {hexValue === CAT_SYMBOL && (
                  <img
                    style={{
                      width: HEXAGON_SIZE,
                      height: HEXAGON_SIZE,
                      zIndex: 1000,
                      marginLeft: -8,
                      marginTop: -3,
                      transform: "rotate(270deg)",
                    }}
                    src={require("domains/TrapTheCat/cat4.gif")}
                    alt={"cat"}
                  />
                )}
              </Hexagon>
            );
          })}
        </RowWrapper>
      ))}
    </BoardWrapper>
  );
};
