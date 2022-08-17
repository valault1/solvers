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
export const TILE_HEIGHT = 25;
export const TILE_WIDTH = 25;
export const TileContainer = styled.div(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: TILE_COLOR,
  color: colors[color],
  height: TILE_HEIGHT,
  width: TILE_WIDTH,
  fontSize: 20,
  cursor: "pointer",
}));

type TileProps = {
  tile: TileData;
};
export const Tile = ({ tile }: TileProps) => {
  return <TileContainer color={tile.color}>{tile.number}</TileContainer>;
};
