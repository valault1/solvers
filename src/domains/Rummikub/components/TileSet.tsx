import styled from "@emotion/styled";
import { Tile } from "domains/Rummikub/components/Tile";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";

export const TILE_HEIGHT = 30;
export const TILE_WIDTH = 30;
export const TileSetContainer = styled.div(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  flexWrap: "wrap",
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
