import styled from "@emotion/styled";
import * as React from "react";

const SQUARE_SIZE = 50;
export const StyledGameSquare = styled.div<Omit<SquareProps, "value">>(
  ({ rowNumber, columnNumber, gridSize }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderRight: columnNumber === gridSize - 1 ? undefined : "solid",
    borderBottom: rowNumber === gridSize - 1 ? undefined : "solid",
  })
);

type SquareProps = {
  value: string;
  rowNumber: number;
  columnNumber: number;
  gridSize: number;
};
export const Square: React.FC<SquareProps> = ({
  value,
  rowNumber,
  columnNumber,
  gridSize,
}) => {
  return (
    <StyledGameSquare
      rowNumber={rowNumber}
      columnNumber={columnNumber}
      gridSize={gridSize}
    >
      {value}
    </StyledGameSquare>
  );
};
