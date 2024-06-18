import { Close, Star } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  COLORS_LIST,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { Board, Token } from "domains/Queens/sharedTypes";
import * as React from "react";

const TokenDisplay = ({ token }: { token: Token }) => {
  if (token === "Q") return <Star />;
  if (token === "X") return <Close />;
  return <></>;
};

const BOARD_SIZE = 30;
export type OnClickTile = (i: number, j: number) => void;
export const BoardDisplay = ({
  board,
  onClickTile,
}: {
  board: Board;
  onClickTile?: OnClickTile;
}) => (
  <Stack direction="column">
    {board.map((row, i) => (
      <Stack key={i} direction="row">
        {row.map(({ token, color: colorName, isConflicting }, j) => (
          <div
            onClick={() => onClickTile?.(i, j)}
            key={j}
            style={{
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              backgroundColor: `rgba(${colorArrToString(
                COLORS_LIST[colorName]
              )})`,
              color: isConflicting ? "red" : "black",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {<TokenDisplay token={token} />}
          </div>
        ))}
      </Stack>
    ))}
  </Stack>
);
