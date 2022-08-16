import { getSolutions } from "domains/Rummikub/getSolutions";
import { testBoard, testYourTiles } from "domains/Rummikub/mocks";
import { TileData } from "domains/Rummikub/sharedTypes";
import nextId from "react-id-generator";

describe("getSolutions", () => {
  it("works on case 1", () => {
    const board: TileData[][] = testBoard;

    const yourTiles: TileData[] = testYourTiles;
    const output = getSolutions(board, yourTiles);
    console.log(output);
    expect(output.length).toBeGreaterThan(0);
  });
});
