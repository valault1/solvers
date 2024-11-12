import styled from "@emotion/styled";
import { PrimaryButton } from "components/Form.elements";
import { Tile, TILE_HEIGHT } from "domains/Rummikub/components/Tile";
import { TileSet } from "domains/Rummikub/components/TileSet";
import { TILES_TO_SELECT } from "domains/Rummikub/constants";
import { getBestSolution } from "domains/Rummikub/getSolutions";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  SectionHeading,
  TileSelection,
} from "domains/Rummikub/RummikubController";
import { TileData } from "domains/Rummikub/sharedTypes";
import React from "react";
import nextId from "react-id-generator";

const MAX_SELECTION_WIDTH = (TILE_HEIGHT + 4) * 13 - 4;

export const BoardWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  borderStyle: "solid",
  borderColor: "white",
  padding: 12,
  borderRadius: 8,
  gap: 4,
  width: MAX_SELECTION_WIDTH,
});

export const TileSetRow = styled.div(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const TileRowDiv1 = styled.div(({ color }) => ({
  display: "flex",
  justifyContent: "left",
  flex: 5,
}));

export const TileRowDiv2 = styled.div(({ color }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  gap: 4,
}));

export const DeleteButton = styled(DeleteOutlinedIcon)(() => ({
  cursor: "pointer",
}));

export const CurrentBoard = ({ yourTiles }: { yourTiles: TileData[] }) => {
  const [board, setBoard] = React.useState<TileData[][]>([[]]);
  const [indexOfRowToEdit, setIndexOfRowToEdit] = React.useState<number>(0);
  const [solution, setSolution] = React.useState<TileData[][]>([]);

  const addTileSetToBoard = () => {
    const newFinalIndex = board.length;
    setIndexOfRowToEdit(newFinalIndex);
    setBoard((prev) => [...prev, []]);
  };

  React.useEffect(() => {
    if (indexOfRowToEdit > board.length - 1) {
      setIndexOfRowToEdit(board.length - 1);
    }
  }, [board, indexOfRowToEdit]);

  const addTileToBoard = (tile: TileData) => {
    setBoard((prev) => {
      var boardCopy = JSON.parse(JSON.stringify(prev));
      boardCopy[indexOfRowToEdit].push(tile);
      return boardCopy;
    });
  };

  const removeTile = (row: number, column: number) => {
    setBoard((prev) => {
      var boardCopy = JSON.parse(JSON.stringify(prev));
      boardCopy[row].splice(column, 1);
      return boardCopy;
    });
  };

  const removeRow = (idx: number) => {
    setBoard((prev) => {
      var boardCopy = JSON.parse(JSON.stringify(prev));
      boardCopy.splice(idx, 1);
      return boardCopy;
    });
  };

  return (
    <>
      <TileSelection>
        {TILES_TO_SELECT.map((tile) => (
          <div
            key={nextId()}
            onClick={() => addTileToBoard({ ...tile, id: nextId() })}
          >
            <Tile tile={tile} />
          </div>
        ))}
      </TileSelection>
      <BoardWrapper>
        <SectionHeading>Current board</SectionHeading>
        {board.map((tiles, tileRowIndex) => {
          return (
            <TileSetRow key={tileRowIndex}>
              <TileRowDiv1>
                <TileSet
                  tiles={tiles}
                  removeTile={(tileIndex) => {
                    removeTile(tileRowIndex, tileIndex);
                  }}
                />
              </TileRowDiv1>
              <TileRowDiv2>
                <PrimaryButton
                  disabled={indexOfRowToEdit === tileRowIndex}
                  onClick={() => setIndexOfRowToEdit(tileRowIndex)}
                >
                  edit
                </PrimaryButton>
                <DeleteButton
                  color="error"
                  onClick={() => removeRow(tileRowIndex)}
                >
                  X
                </DeleteButton>
              </TileRowDiv2>
            </TileSetRow>
          );
        })}

        <PrimaryButton onClick={addTileSetToBoard}>
          + Add new tile group
        </PrimaryButton>
      </BoardWrapper>
      <PrimaryButton
        onClick={() => setSolution(getBestSolution(board, yourTiles))}
      >
        get solutions
      </PrimaryButton>
      {solution.length > 0 && (
        <BoardWrapper>
          Solution:{" "}
          {solution.map((set, index) => (
            <TileSet key={index} tiles={set} removeTile={() => {}} />
          ))}
        </BoardWrapper>
      )}
    </>
  );
};
