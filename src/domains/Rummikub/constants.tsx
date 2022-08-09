import { Color, TileData } from "domains/Rummikub/sharedTypes";
import * as React from "react";

const getTilesToSelect = () => {
  var result: TileData[] = [];
  const colors: Color[] = ["blue", "black", "orange", "red"];
  colors.forEach((color) => {
    Array(13)
      .fill(0)
      .forEach((a, index) => {
        const tile = { color, number: index + 1 };
        result.push(tile);
      });
  });
  return result;
};

export const TILES_TO_SELECT = getTilesToSelect();
