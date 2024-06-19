import { Close, Star } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  COLORS_LIST,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { Board, BoardWithBorders, Token } from "domains/Queens/sharedTypes";
import * as React from "react";

const TokenDisplay = ({ token }: { token: Token }) => {
  if (token === "Q") return <Star />;
  if (token === "X") return <Close />;
  return <></>;
};

const BOARD_SIZE = 40;
const BORDER_COLOR = "white";
const BORDER_CSS = `solid ${BORDER_COLOR}`;
// adds padding if the border isn't thick, so that the tiles all stay in line
const NO_BORDER_PADDING = "2px";
export type OnClickTile = (i: number, j: number) => void;
export const BoardWithBordersDisplay = ({
  board,
  onClickTile,
}: {
  board: BoardWithBorders;
  onClickTile?: OnClickTile;
}) => (
  <Stack direction="column">
    {board.map((row, i) => (
      <Stack key={i} direction="row">
        {row.map((tile, j) => (
          <div
            onClick={() => onClickTile?.(i, j)}
            key={j}
            style={{
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: onClickTile ? "pointer" : undefined,
              //border: "thin solid white",
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
            <TokenDisplay token={tile.token} />
            {tile.region}
          </div>
        ))}
      </Stack>
    ))}
  </Stack>
);
