import styled from "@emotion/styled";
import { CurrentBoard } from "domains/Rummikub/components/CurrentBoard";
import { Tile, TILE_HEIGHT } from "domains/Rummikub/components/Tile";
import { TileSet } from "domains/Rummikub/components/TileSet";
import { TILES_TO_SELECT } from "domains/Rummikub/constants";
import { testYourTiles3 } from "domains/Rummikub/mocks";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";
import nextId from "react-id-generator";
import { theme } from "../../components/theme/theme";

type RummikubControllerProps = {};

export const MAX_SELECTION_WIDTH = (TILE_HEIGHT + 4) * 13 - 4;

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

export const SectionWrapper = styled.div(() => ({
  borderStyle: "solid",
  borderColor: "white",
  padding: 12,
  borderRadius: 8,
  gap: 4,
  width: MAX_SELECTION_WIDTH / 2,
}));

export const SectionHeading = styled.h4(() => ({
  display: "flex",
}));

export const RummikubController = ({}: RummikubControllerProps) => {
  const [yourTiles, setYourTiles] = React.useState<TileData[]>();

  const addTileToYourTiles = (tile: TileData) => {
    setYourTiles((prev) => [...prev, tile]);
  };

  const removeTileFromYourTiles = (index: number) => {
    var newTiles = [...yourTiles];
    newTiles.splice(index, 1);
    setYourTiles(newTiles);
  };

  return (
    <RummikubMainContainer>
      <CurrentBoard yourTiles={yourTiles} />

      <SectionWrapper>
        <SectionHeading>Your tiles</SectionHeading>
        <div>
          <TileSet tiles={yourTiles} removeTile={removeTileFromYourTiles} />
        </div>
      </SectionWrapper>
      <TileSelection>
        {TILES_TO_SELECT.map((tile) => (
          <div key={nextId()} onClick={() => addTileToYourTiles(tile)}>
            <Tile tile={tile} />
          </div>
        ))}
      </TileSelection>
    </RummikubMainContainer>
  );
};
