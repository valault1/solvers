import styled from "@emotion/styled";
import * as React from "react";

// plus 3 to make up for borders in the board

export enum MoveCoords {
  Player1RocksRowNum = 0,
  Player2RocksRowNum = -1,
  Player1RocksSquareNum = -1,
  Player2RocksSquareNum = 100,
}
const SQUARE_SIZE = 53;
export const StyledMoveIndicatorSquare = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: SQUARE_SIZE,

  height: SQUARE_SIZE,
  fontSize: 45,
});
let dot = "·";
type MoveIndicatorProps = {
  showDot?: boolean;
};
export const MoveIndicator: React.FC<MoveIndicatorProps> = ({ showDot }) => {
  return (
    <StyledMoveIndicatorSquare>{showDot && "·"}</StyledMoveIndicatorSquare>
  );
};
