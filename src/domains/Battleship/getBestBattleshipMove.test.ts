import {
  getAllArrangementsOfShip,
  getAllPossibleArrangements,
} from "domains/Battleship/getBestBattleshipMove";
import { Symbol } from "domains/Battleship/sharedTypes";

export const arrToString = (arr: number[][][]) => {
  return arr.map((setOfCoords) => {
    return setOfCoords.map((coord) => {
      return JSON.stringify(coord);
    });
  });
};

describe("getAllArrangementsOfShip()", () => {
  let emptyBoardRowsResult = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  ];
  let emptyBoardColumnsResult = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  ];
  it("works on empty board", () => {
    let board: Symbol[][] = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ];
    const expectedResult = [
      ...emptyBoardRowsResult,
      ...emptyBoardColumnsResult,
    ];
    const realResult = getAllArrangementsOfShip(board, 4);

    expect(realResult).toStrictEqual(expectedResult);
  });
  it("works on board with no possibles", () => {
    let board: Symbol[][] = [
      ["", "", "", "O"],
      ["", "", "O", ""],
      ["", "O", "", ""],
      ["O", "", "", ""],
    ];
    const expectedResult: number[][][] = [];
    const realResult = getAllArrangementsOfShip(board, 4);
    expect(realResult).toStrictEqual(expectedResult);
  });
  it("works on board with some possibles", () => {
    let board: Symbol[][] = [
      ["", "", "", "O"],
      ["", "O", "O", ""],
      ["", "O", "O", ""],
      ["", "", "", ""],
    ];
    const expectedResult: number[][][] = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
      //vertical
      [
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [1, 3],
        [2, 3],
        [3, 3],
      ],
    ];
    const realResult = getAllArrangementsOfShip(board, 3);

    expect(realResult).toStrictEqual(expectedResult);
  });
});

describe("getAllPossibleArrangements()", () => {
  it("works on board with few possibilities", () => {
    let board: Symbol[][] = [
      ["", "", "", "O"],
      ["O", "O", "O", "O"],
      ["O", "O", "O", "O"],
      ["", "", "", "O"],
    ];

    const expectedResult = [
      [
        [0, 1],
        [0, 2],
        [3, 0],
        [3, 1],
        [3, 2],
      ],
      [
        [0, 0],
        [0, 1],
        [3, 0],
        [3, 1],
        [3, 2],
      ],
      [
        [3, 1],
        [3, 2],
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [3, 0],
        [3, 1],
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    ];
    const realResult = getAllPossibleArrangements(board, [2, 3]);
    console.log({
      expectedResult: arrToString(expectedResult),
      realResult: arrToString(realResult),
    });
    expect(realResult).toStrictEqual(expectedResult);
  });
  it("works on board with no possibles", () => {
    let board: Symbol[][] = [
      ["", "O", "", "O"],
      ["O", "", "O", ""],
      ["", "O", "", "O"],
      ["O", "", "O", ""],
    ];
    const expectedResult: number[][][] = [];
    const realResult = getAllPossibleArrangements(board, [2, 3]);
    expect(realResult).toStrictEqual(expectedResult);
  });
});
