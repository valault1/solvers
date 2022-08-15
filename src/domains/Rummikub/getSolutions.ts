import { TileData } from "domains/Rummikub/sharedTypes";

export const getPossibleMoves = (
  board: TileData[][],
  yourTiles: TileData[]
) => {
  const cleanedBoard = cleanBoard(board);
  console.log({ board: cleanedBoard });
};

const cleanBoard = (board: TileData[][]) => {
  var cleanedBoard = [];
  for (let row of board) {
    cleanedBoard.push(row);
  }
  return cleanedBoard;
};
