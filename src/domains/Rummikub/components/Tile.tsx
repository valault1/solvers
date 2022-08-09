import styled from "@emotion/styled";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";

const TILE_COLOR = "#dbcbb1";
const colors: { [index: string]: string } = {
  orange: "#ec6405",
  black: "#000100",
  red: "#930005",
  blue: "#268db1",
};
export const TILE_HEIGHT = 30;
export const TILE_WIDTH = 30;
export const TileContainer = styled.div(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: TILE_COLOR,
  color: colors[color],
  height: TILE_HEIGHT,
  width: TILE_WIDTH,
  fontSize: 20,
}));

type TileProps = {
  tile: TileData;
};
export const Tile = ({ tile }: TileProps) => {
  console.log(tile);
  return <TileContainer color={tile.color}>{tile.number}</TileContainer>;
};
