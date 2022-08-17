import {
  getBestSolution,
  getPossibleMoves,
  tileToString,
  boardToString,
  performMove,
  tileSetToString,
} from "domains/Rummikub/getSolutions";
import {
  testBoard1,
  testBoard2,
  testMove,
  testYourTiles1,
} from "domains/Rummikub/mocks";
import { TileData } from "domains/Rummikub/sharedTypes";
import nextId from "react-id-generator";

describe("getSolutions", () => {
  it("works on case 1", () => {
    const board: TileData[][] = testBoard1;

    const yourTiles: TileData[] = testYourTiles1;
    const output = getBestSolution(board, yourTiles);
    //console.log(output.map((board) => boardToString(board)));
    expect(output.length).toBeGreaterThan(0);
  });

  it("works on case 2", () => {
    const board: TileData[][] = testBoard2;

    const yourTiles: TileData[] = testYourTiles1;
    const output = getBestSolution(board, yourTiles);
    console.log(boardToString(output));
    expect(output.length).toBeGreaterThan(0);
  });
});

describe("getPossibleMoves", () => {
  it("works on case 1", () => {
    console.log("Running test for getPossibleMoves");
    const board: TileData[][] = [...testBoard1];

    var tiles: TileData[] = [...testYourTiles1];
    board.forEach((set) => tiles.push(...set));
    tiles.push({ id: "13", number: 11, color: "blue" });
    const output = getPossibleMoves(tiles, 1);
    console.log(
      "output from getPossibleMoves on tiles " +
        JSON.stringify(tiles.map(tileToString))
    );
    console.log(output.map((set) => JSON.stringify(set.map(tileToString))));
    expect(output.length).toBe(9);
    // output should be [567, 5678, 56789, 678, 6789, 666, 666, 666, 6666]
  });
});

describe("performMove", () => {
  it("works", () => {
    const board: TileData[][] = testBoard1;

    const yourTiles: TileData[] = testYourTiles1;
    const output = performMove({ board: board, tiles: yourTiles }, yourTiles);
    // console.log({
    //   board: boardToString(output.board),
    //   tiles: tileSetToString(output.tiles),
    // });
    expect(!output).toBeFalsy();
  });

  it("works again", () => {
    const board: TileData[][] = testBoard1;

    const yourTiles: TileData[] = testYourTiles1;
    const output = performMove({ board: board, tiles: yourTiles }, testMove);
    console.log({
      board: boardToString(output.board),
      tiles: tileSetToString(output.tiles),
    });
    expect(!output).toBeFalsy();
  });
});
