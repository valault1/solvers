import styled from "@emotion/styled";
import * as React from "react";

const SQUARE_SIZE = 50;
export const StyledGameSquare = styled.div<Omit<SquareProps, "value">>(
  ({ rowNumber, columnNumber, gridSize, alwaysShowBorder }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderRight:
      columnNumber !== gridSize - 1 || alwaysShowBorder ? "solid" : undefined,
    borderBottom:
      rowNumber !== gridSize - 1 || alwaysShowBorder ? "solid" : undefined,
  })
);

type SquareProps = {
  value: string;
  rowNumber?: number;
  columnNumber?: number;
  gridSize?: number;
  alwaysShowBorder?: boolean;
};
export const Square: React.FC<SquareProps> = ({
  value,
  rowNumber,
  columnNumber,
  gridSize,
  alwaysShowBorder,
}) => {
  return (
    <StyledGameSquare
      rowNumber={rowNumber}
      columnNumber={columnNumber}
      gridSize={gridSize}
      alwaysShowBorder={alwaysShowBorder}
    >
      {value}
    </StyledGameSquare>
  );
};
