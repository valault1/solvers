import styled from "@emotion/styled";
import { Circle, CircleOutlined, NewReleases } from "@mui/icons-material";
import { PrimaryButton } from "components/Form.elements";
import {
  BEST_GUESS_SYMBOL,
  EMPTY_SYMBOL,
  HIT_SYMBOL,
  MISS_SYMBOL,
  Symbol,
} from "domains/Battleship/sharedTypes";
import * as React from "react";
export type BattleshipSquareProps = {
  onClickMiss: () => void;
  onClickHit: () => void;
  value: Symbol;
};

const SQUARE_WIDTH = 75;
const StyledSquare = styled.div({
  border: "solid",
  width: SQUARE_WIDTH,
  height: SQUARE_WIDTH,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  justifyContent: "center",
  alignItems: "center",
});

const ICON_SIZE = 25;
export const mapSymbolToIcon = (symbol: Symbol, iconSize = ICON_SIZE) => {
  switch (symbol) {
    case EMPTY_SYMBOL:
      return <></>;
    case MISS_SYMBOL:
      return <CircleOutlined sx={{ width: iconSize, height: iconSize }} />;
    case HIT_SYMBOL:
      return <Circle sx={{ width: iconSize, height: iconSize }} />;
    case BEST_GUESS_SYMBOL:
      return <NewReleases sx={{ width: iconSize, height: iconSize }} />;
  }
};

export const BattleshipSquare = ({
  onClickMiss,
  onClickHit,
  value,
}: BattleshipSquareProps) => {
  return (
    <StyledSquare>
      {value !== HIT_SYMBOL && value !== MISS_SYMBOL && (
        <>
          <PrimaryButton onClick={onClickHit}>
            {mapSymbolToIcon(HIT_SYMBOL, 10)}
          </PrimaryButton>
          <PrimaryButton onClick={onClickMiss}>
            {mapSymbolToIcon(MISS_SYMBOL, 10)}
          </PrimaryButton>
        </>
      )}
      {mapSymbolToIcon(value)}
    </StyledSquare>
  );
};
