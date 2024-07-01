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
  return <></>;
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
  const [hasEnteredAlready, setHasEnteredAlready] = React.useState(false);
  const [tokenOnEnter, setTokenOnEnter] = React.useState<Token | undefined>(
    undefined
  );
  const [isTouching, setIsTouching] = React.useState(false);

  const onPointerEnter = React.useCallback(() => {
    if (hasEnteredAlready) return;

    setHasEnteredAlready(true);
    setTokenOnEnter(tile.token);
    onDragTouchOntoTile();
  }, [
    setHasEnteredAlready,
    hasEnteredAlready,
    onDragTouchOntoTile,
    setTokenOnEnter,
    tile.token,
  ]);
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
      }}
    >
      {/* This inner div is the one that takes a click*/}
      <div
        {...(isTouchScreenDevice
          ? {
              // onTouchStart: () => {
              //   log("touch start");
              //   setIsTouching(true);
              //   return;
              // },
              onPointerDown: (e) => {
                // @ts-ignore
                e.target.releasePointerCapture(e.pointerId);
              },
              onTouchStart: (e) => {
                if (tokenOnEnter !== "") {
                  onClickTile();
                }
              },
              onPointerEnter,
              onPointerLeave: () => {
                setHasEnteredAlready(false);
                setTokenOnEnter(undefined);
              },
              // onTouchMove: (e) => {
              //   if (hasMovedAlready) return;
              //   log("touch move");
              //   setHasMovedAlready(true);
              // },
              // onTouchEnd: () => {
              //   log("touch end");
              //   setIsTouching(false);
              //   setHasMovedAlready(false);
              // },
            }
          : {
              onClick: () => {
                onClickTile();
              },
            })}
        // onPointerEnter={(e) => {
        //   console.log("Mouse enter");
        //   //console.log({ e });
        //   setTimesRunPointerEnter((prev) => prev + 1);
        //   onClickTile?.(i, j);
        //   //return hasWon ? undefined : onClickTile?.(i, j);
        // }}

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
        }}
      >
        {<TokenDisplay token={tile.token} />}
      </div>
    </div>
  );
};
