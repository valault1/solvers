import styled from "@emotion/styled";
import { Tile, TILE_HEIGHT } from "domains/Rummikub/components/Tile";
import { TileSet } from "domains/Rummikub/components/TileSet";
import { TILES_TO_SELECT } from "domains/Rummikub/constants";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";
import { theme } from "src/theme";

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
  const [board, setBoard] = React.useState<TileData[][]>([[]]);
  const [yourTiles, setYourTiles] = React.useState<TileData[]>([]);
  console.log({ board });
  const addTileSetToBoard = () => {
    setBoard((prev) => [...prev, []]);
  };

  const addTileToBoard = (tile: TileData) => {
    var boardCopy = [...board];
    boardCopy[boardCopy.length - 1].push(tile);
    console.log(boardCopy);
    setBoard(boardCopy);
  };
  const addTileToYourTiles = (tile: TileData) => {
    setYourTiles((prev) => [...prev, tile]);
  };

  return (
    <RummikubMainContainer>
      <TileSelection>
        {TILES_TO_SELECT.map((tile) => (
          <div onClick={() => addTileToBoard(tile)}>
            <Tile tile={tile} />
          </div>
        ))}
      </TileSelection>

      <SectionWrapper>
        <SectionHeading>Current board</SectionHeading>
        {board.map((tiles) => {
          return <TileSet tiles={tiles} />;
        })}

        <div onClick={addTileSetToBoard}>+</div>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeading>Your tiles </SectionHeading>
        <div>
          <TileSet tiles={yourTiles} />
        </div>
      </SectionWrapper>
      <TileSelection>
        {TILES_TO_SELECT.map((tile) => (
          <div onClick={() => addTileToYourTiles(tile)}>
            <Tile tile={tile} />
          </div>
        ))}
      </TileSelection>
    </RummikubMainContainer>
  );
};
