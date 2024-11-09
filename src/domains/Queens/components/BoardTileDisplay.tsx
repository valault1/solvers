import { Close, Star } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  COLORS_LIST,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { Board, BoardTile, Token } from "domains/Queens/sharedTypes";
import * as React from "react";

const TokenDisplay = ({ token }: { token: Token }) => {
  if (token === "Q") return <Star fontSize="small" />;
  if (token === "X") return <Close fontSize="small" />;
  return <div style={{ userSelect: "none" }}></div>;
};

const BORDER_COLOR = "black";
const BORDER_CSS = `solid ${BORDER_COLOR}`;

export type OnClickTile = (i: number, j: number) => void;
export const BoardTileDisplay = ({
  tile,
  onClickTile,
  onDragTouchOntoTile,
  isTouchScreenDevice,
  squareSize,
}: {
  tile: BoardTile;
  onClickTile: VoidFunction;
  onDragTouchOntoTile: VoidFunction;
  isTouchScreenDevice: boolean;
  squareSize: number;
}) => {
  const [tokenOnEnter, setTokenOnEnter] = React.useState<Token | undefined>(
    undefined
  );

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: squareSize,
        height: squareSize,
        backgroundColor: `${tile.color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderBottom: `${tile.bottom ? "medium" : "thin"} ${BORDER_CSS}`,
        borderTop: `${tile.top ? "medium" : "thin"} ${BORDER_CSS}`,
        borderRight: `${tile.right ? "medium" : "thin"} ${BORDER_CSS}`,
        borderLeft: `${tile.left ? "medium" : "thin"} ${BORDER_CSS}`,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* This inner div is the one that takes a click*/}
      <div
        {...(isTouchScreenDevice
          ? {
              onPointerEnter: (e) => {
                // onPointerEnter triggers before onTouchStart.
                // On enter, we want to add the X if it the tile is empty.
                // But, we don't want the onTouchStart to also trigger. So we set the tokenOnEnter,
                // and then onTouchStart checks it before triggering.
                setTokenOnEnter(tile.token);
                if (e.buttons === 1) {
                  onDragTouchOntoTile();
                }
              },
              onTouchStart: (e) => {
                if (tokenOnEnter !== "") {
                  onClickTile();
                }
              },
              onPointerDown: (e) => {
                // we need to release the pointer so that the onPointerEnter can trigger again for other squares
                // @ts-ignore
                e.target.releasePointerCapture(e.pointerId);
              },
            }
          : {
              onMouseDown: onClickTile,
              onPointerEnter: (e) => {
                if (e.buttons === 1) {
                  onDragTouchOntoTile();
                }
              },
            })}
        style={{
          width: squareSize,
          height: squareSize,
          color: tile.isConflicting ? "red" : "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // these remove the strange highlight that happens when I tap on mobile
          WebkitTapHighlightColor: "transparent",
          outline: "none",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {<TokenDisplay token={tile.token} />}
      </div>
    </div>
  );
};
