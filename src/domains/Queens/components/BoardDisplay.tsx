import { Close, Star } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { BoardTileDisplay } from "domains/Queens/components/BoardTileDisplay";

import { Board, Token } from "domains/Queens/sharedTypes";
import * as React from "react";

const TokenDisplay = ({ token }: { token: Token }) => {
  if (token === "Q") return <Star fontSize="small" />;
  if (token === "X") return <Close fontSize="small" />;
  return <></>;
};

const MAX_SQUARE_SIZE = 38;

export type OnClickTile = (i: number, j: number) => void;
export const BoardDisplay = ({
  board,
  onClickTile,
  onDragTouchOntoTile,
  hasWon,
}: {
  board: Board;
  onClickTile?: OnClickTile;
  onDragTouchOntoTile?: OnClickTile;
  hasWon?: boolean;
}) => {
  const [log, setLog] = React.useState([] as string[]);
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

  const addToLog = React.useCallback(
    (m: string) => {
      setLog((prev) => [...prev, JSON.stringify(m)]);
    },
    [setLog]
  );

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
          {row.map((tile, j) => {
            return (
              <BoardTileDisplay
                tile={tile}
                onClickTile={hasWon ? undefined : () => onClickTile?.(i, j)}
                onDragTouchOntoTile={
                  hasWon ? undefined : () => onDragTouchOntoTile?.(i, j)
                }
                squareSize={SQUARE_SIZE}
                isTouchScreenDevice={isTouchScreenDevice}
                key={j}
              />
            );
          })}
        </Stack>
      ))}
      {log.map((m, i) => (
        <div>{m}</div>
      ))}
    </Stack>
  );
};
