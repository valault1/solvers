import {
  getCatCoords,
  getDistanceToExit,
  getShortestPathToExit,
} from "domains/TrapTheCat/makeCatMove";
import { HexBoard } from "domains/TrapTheCat/sharedTypes";
import { getStartingBoard } from "domains/TrapTheCat/TrapTheCat";
const mockBoard: HexBoard = [
  ["", "X", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "X", ""],
  ["", "", "", "", "", "", "", "", "", "", "X"],
  ["", "", "", "", "", "", "", "X", "", "", ""],
  ["", "", "", "X", "", "", "", "", "", "", "X"],
  ["", "", "", "", "", "C", "X", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "X", "X"],
  ["", "", "", "", "", "", "", "", "", "", ""],
];
describe("getDistanceToExit()", () => {
  it("works", () => {
    let startTime = new Date();
    const board = mockBoard;
    let coords = getCatCoords({ board });
    console.log("starting test!");
    let result = getDistanceToExit({
      board,
      coords,
    });

    let timeElapsed = new Date().getTime() - startTime.getTime();
    console.log({ result, timeElapsed });
  });
});

describe("getShortestPathToExit()", () => {
  it("works", () => {
    let startTime = new Date();
    const board = mockBoard;
    let coords = getCatCoords({ board });
    console.log("starting test!");
    let result = getShortestPathToExit({
      board,
      coords,
    });

    let timeElapsed = new Date().getTime() - startTime.getTime();
    console.log({ result, timeElapsed });
  });
});
