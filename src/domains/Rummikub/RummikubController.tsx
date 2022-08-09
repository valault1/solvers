import styled from "@emotion/styled";
import { Tile, TILE_HEIGHT } from "domains/Rummikub/components/Tile";
import { TileSet } from "domains/Rummikub/components/TileSet";
import { TILES_TO_SELECT } from "domains/Rummikub/constants";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";
import { theme } from "theme";

type RummikubControllerProps = {};

const MAX_SELECTION_WIDTH = (TILE_HEIGHT + 4) * 13 - 4;

export const RummikubMainContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  color: theme.colors.textPrimary,
  paddingTop: 12,
  gap: 12,
}));
export const TileSelection = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  columnGap: 4,
  rowGap: 4,
  maxWidth: MAX_SELECTION_WIDTH,
}));

export const RummikubController = ({}: RummikubControllerProps) => {
  const [board, setBoard] = React.useState<TileData[][]>([]);
  const [yourTiles, setYourTiles] = React.useState<TileData[]>([]);
  const addTileSetToBoard = () => {
    setBoard((prev) => [...prev, []]);
  };
  const addTilesToYourTiles = () => {
    setYourTiles((prev) => [...prev]);
  };

  return (
    <RummikubMainContainer>
      <TileSelection>{TILES_TO_SELECT}</TileSelection>

      <div>
        <div>Current board:</div>
        <div>
          {board.map((tileSet) => (
            <TileSet tiles={tileSet} />
          ))}
        </div>
        <div onClick={addTileSetToBoard}>+</div>
      </div>
      <div>
        <div>Your tiles: </div>
        <div>
          {yourTiles.map((tile) => (
            <Tile tile={tile} />
          ))}
        </div>
        <div onClick={addTilesToYourTiles}>+</div>
      </div>
      <TileSet
        tiles={[
          { number: 12, color: "red" },
          { number: 11, color: "red" },
          { number: 10, color: "red" },
        ]}
      />
    </RummikubMainContainer>
  );
};
