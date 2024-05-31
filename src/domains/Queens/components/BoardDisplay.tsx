import { Stack } from "@mui/material";
import {
  COLORS_LIST,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { Board } from "domains/Queens/sharedTypes";
import * as React from "react";

const BOARD_SIZE = 30;
export const BoardDisplay = ({ board }: { board: Board }) => (
  <Stack direction="row">
    {board.map((row, i) => (
      <Stack key={i} direction="column">
        {row.map(({ token, color: colorName }, j) => (
          <div
            key={j}
            style={{
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              backgroundColor: `rgba(${colorArrToString(
                COLORS_LIST[colorName]
              )})`,
              color: "black",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {token}
          </div>
        ))}
      </Stack>
    ))}
  </Stack>
);
