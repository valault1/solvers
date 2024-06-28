import { Close, Star } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  COLORS_LIST,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { Board, Token } from "domains/Queens/sharedTypes";
import * as React from "react";

const TokenDisplay = ({ token }: { token: Token }) => {
  if (token === "Q") return <Star fontSize="small" />;
  if (token === "X") return <Close fontSize="small" />;
  return <></>;
};

const MAX_SQUARE_SIZE = 38;

// this is the gap between the click zone and the border; currently, I am trying 0
const CLICK_ZONE_GAP = 0;
const BORDER_COLOR = "black";
const BORDER_CSS = `solid ${BORDER_COLOR}`;
export type OnClickTile = (i: number, j: number) => void;
export const BoardDisplay = ({
  board,
  onClickTile,
  hasWon,
}: {
  board: Board;
  onClickTile?: OnClickTile;
  hasWon?: boolean;
}) => {
  const isTouchScreenDevice = React.useMemo(() => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const SQUARE_SIZE = React.useMemo(() => {
    return Math.min(
      MAX_SQUARE_SIZE,
      Math.floor((screenWidth - 5) / board.length)
    );
  }, [screenWidth, board.length]);

  return (
    <Stack direction="column">
      {board.map((row, i) => (
        <Stack key={i} direction="row">
          {row.map(({ token, color: colorName, isConflicting, ...tile }, j) => {
            return (
              <div
                key={j}
                style={{
                  boxSizing: "border-box",
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: `${colorName}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: hasWon ? undefined : "pointer",
                  borderBottom: `${
                    tile.bottom ? "medium" : "thin"
                  } ${BORDER_CSS}`,
                  borderTop: `${tile.top ? "medium" : "thin"} ${BORDER_CSS}`,
                  borderRight: `${
                    tile.right ? "medium" : "thin"
                  } ${BORDER_CSS}`,
                  borderLeft: `${tile.left ? "medium" : "thin"} ${BORDER_CSS}`,
                }}
              >
                {/* This inner div is the one that takes a click*/}
                <div
                  {...(isTouchScreenDevice
                    ? {
                        onTouchEnd: hasWon
                          ? undefined
                          : () => onClickTile?.(i, j),
                      }
                    : {
                        onClick: hasWon ? undefined : () => onClickTile?.(i, j),
                      })}
                  style={{
                    width: SQUARE_SIZE - CLICK_ZONE_GAP,
                    height: SQUARE_SIZE - CLICK_ZONE_GAP,
                    color: isConflicting ? "red" : "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // these remove the strange highlight that happens when I tap on mobile
                    WebkitTapHighlightColor: "transparent",
                    outline: "none",
                  }}
                >
                  {<TokenDisplay token={token} />}
                </div>
              </div>
            );
          })}
        </Stack>
      ))}
    </Stack>
  );
};
