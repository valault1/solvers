import styled from "@emotion/styled";
import { darken } from "@mui/material";
import { theme } from "components/theme/theme";
import { EMPTY_SYMBOL } from "domains/TicTacToe/TicTacToeController";
import HexagonSVG from "domains/TrapTheCat/hexagon.svg";
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
const halfWidth = 20;
const rowGap = -2;

type HexagonProps = {
  color: string;
  lightenOnHover?: boolean;
  colorTransparent?: string;
};

const HexagonSVGComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 25 100 50"
    width="100%"
  >
    <polygon
      points="50 3,100 28,100 75, 50 100,3 75,3 25"
      stroke="currentColor"
      fill="currentColor"
      stroke-width="5"
    />
  </svg>
);

const Hexagon = styled.div<HexagonProps>(
  ({ color, lightenOnHover, colorTransparent = "transparent" }) => ({
    display: "flex",
    background: colorTransparent,
    "*": { color },
    height: HEXAGON_SIZE,
    width: baseWidth,
    position: "relative",
    left: leftRightWidth,
    boxSizing: "border-box",
    borderTop: `solid ${colorTransparent}`,
    borderBottom: `solid ${colorTransparent}`,
    ...(lightenOnHover
      ? {
          ":hover": {
            filter: "brightness(130%)",
            cursor: "pointer",
          },
        }
      : {}),
    // ":before": {
    //   content: '""',
    //   position: "absolute",
    //   height: 0,
    //   width: 0,
    //   top: 0,
    //   /* half height */
    //   borderTop: `${leftRightWidth * 2}px solid transparent`,
    //   borderBottom: `${leftRightWidth * 2}px solid transparent`,
    //   left: -leftRightWidth,
    //   borderRight: `${leftRightWidth}px solid ${colorTransparent}`,
    // },
    // ":after": {
    //   content: '""',
    //   position: "absolute",
    //   height: 0,
    //   width: 0,
    //   top: 0,
    //   /* half height */
    //   borderTop: `${leftRightWidth * 2}px solid transparent`,
    //   borderBottom: `${leftRightWidth * 2}px solid transparent`,
    //   right: -leftRightWidth,
    //   borderLeft: `${leftRightWidth}px solid ${colorTransparent}`,
    // },
  })
);

const BoardWrapper = styled.div(() => ({
  display: "flex",
  gap: -20,
  flexDirection: "column",
  marginBottom: 12,
}));

const RowWrapper = styled.div(() => ({
  display: "flex",
  maxHeight: HEXAGON_SIZE * 0.9,
  gap: 10,
  flexDirection: "row",
  marginBottom: -10,
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
        <RowWrapper
          key={rowIndex}
          style={{ marginLeft: rowIndex % 2 ? 0 : -halfWidth }}
        >
          {row.map((hexValue, colIndex) => {
            let isClickable = hexValue === EMPTY_SYMBOL && !gameIsOver;
            return (
              <Hexagon
                key={colIndex}
                onClick={() => {
                  if (isClickable) selectHex(rowIndex, colIndex);
                }}
                color={hexValue === USER_SYMBOL ? filledColor : emptyColor}
                lightenOnHover={isClickable}
              >
                {/* <img
                  style={{
                    width: HEXAGON_SIZE,
                    height: HEXAGON_SIZE,
                    zIndex: 1,
                    ...{
                      filter: "brightness(130%)",
                      cursor: "pointer",
                    },
                  }}
                  src={require("domains/TrapTheCat/hexagon.svg").default}
                  alt={"cat"}
                /> */}
                <HexagonSVGComponent></HexagonSVGComponent>

                {hexValue === CAT_SYMBOL && (
                  <img
                    style={{
                      width: HEXAGON_SIZE,
                      height: HEXAGON_SIZE,
                      zIndex: 2,
                      marginLeft: -8,
                      marginTop: -3,
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
