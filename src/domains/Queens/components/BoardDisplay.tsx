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
// this is the gap between the click zone and the border
const CLICK_ZONE_GAP = 5;
const BORDER_COLOR = "black";
const BORDER_CSS = `solid ${BORDER_COLOR}`;
// adds padding if the border isn't thick, so that the tiles all stay in line
const NO_BORDER_PADDING = "2px";
export type OnClickTile = (i: number, j: number) => void;
export const BoardDisplay = ({
  board,
  onClickTile,
  hasWon,
}: {
  board: Board;
  onClickTile?: OnClickTile;
  hasWon?: boolean;
}) => (
  <Stack direction="column">
    {board.map((row, i) => (
      <Stack key={i} direction="row">
        {row.map(({ token, color: colorName, isConflicting, ...tile }, j) => (
          <div
            key={j}
            style={{
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              backgroundColor: `rgba(${colorArrToString(
                COLORS_LIST[colorName]
              )})`,
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: hasWon ? undefined : "pointer",
              borderBottom: `${tile.bottom ? "medium" : "thin"} ${BORDER_CSS}`,
              paddingBottom: tile.bottom ? undefined : NO_BORDER_PADDING,
              borderTop: `${tile.top ? "medium" : "thin"} ${BORDER_CSS}`,
              paddingTop: tile.top ? undefined : NO_BORDER_PADDING,
              borderRight: `${tile.right ? "medium" : "thin"} ${BORDER_CSS}`,
              paddingRight: tile.right ? undefined : NO_BORDER_PADDING,
              borderLeft: `${tile.left ? "medium" : "thin"} ${BORDER_CSS}`,
              paddingLeft: tile.left ? undefined : NO_BORDER_PADDING,
            }}
          >
            {/* This inner div is the one that takes a click*/}
            <div
              onClick={hasWon ? undefined : () => onClickTile?.(i, j)}
              style={{
                width: BOARD_SIZE - CLICK_ZONE_GAP,
                height: BOARD_SIZE - CLICK_ZONE_GAP,
                backgroundColor: `rgba(${colorArrToString(
                  COLORS_LIST[colorName]
                )})`,
                color: isConflicting ? "red" : "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {<TokenDisplay token={token} />}
            </div>
          </div>
        ))}
      </Stack>
    ))}
  </Stack>
);
