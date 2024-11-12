import styled from "@emotion/styled";
import * as React from "react";

const SQUARE_SIZE = 50;
export const StyledGameSquare = styled.div<Omit<MancalaSquareProps, "value">>(
  ({ hideBottomBorder, hideTopBorder }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    border: "solid",
  })
);

export const StyledPlayerRocksSquare = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: SQUARE_SIZE * 2 + 3,
  height: SQUARE_SIZE,
  border: "solid",
});

type MancalaSquareProps = {
  value: string;
  hideBottomBorder?: boolean;
  hideTopBorder?: boolean;
};
export const MancalaSquare: React.FC<MancalaSquareProps> = ({
  value,
  hideBottomBorder,
  hideTopBorder,
}) => {
  return <StyledGameSquare>{value}</StyledGameSquare>;
};

type MancalaPlayerRocksSquareProps = {
  value: string;
};
export const MancalaPlayerRocksSquare: React.FC<MancalaPlayerRocksSquareProps> =
  ({ value }) => {
    return <StyledPlayerRocksSquare>{value}</StyledPlayerRocksSquare>;
  };
