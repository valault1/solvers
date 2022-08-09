import styled from "@emotion/styled";
import { Tile } from "domains/Rummikub/components/Tile";
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
export const TileSetContainer = styled.div(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  minWidth: 20,
  minHeight: 20,
  backgroundColor: "white",
}));

type TileSetProps = {
  tiles: TileData[];
};
export const TileSet = ({ tiles }: TileSetProps) => {
  const sortedTiles = React.useMemo(() => {
    var tilesCopy = [...tiles];
    tilesCopy.sort((a, b) => {
      return a.number - b.number;
    });
    return tilesCopy;
  }, [tiles]);

  return (
    <TileSetContainer>
      {sortedTiles.map((tile) => (
        <Tile tile={tile} />
      ))}
    </TileSetContainer>
  );
};
