import { Stack } from "@mui/material";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { generateRegionsV2 } from "domains/Queens/helpers/boardGenerators/generateBordersV2";
import { colorsToRegions } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import generateBoardAndTestForDeterminism, {
  generateDeterministicSeeds,
  getTextToCopy,
} from "domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import {
  generateBoardFromSeedV3,
  getInitialBoardWithSeedRegions,
} from "domains/Queens/helpers/boardGenerators/generateNewBoardV3-static";
import { RNG } from "domains/Queens/helpers/randomNum";
import { mockRegionSizes, mockStarPositions } from "domains/Queens/mocks/mocks";
import { Board, Coords } from "domains/Queens/sharedTypes";
import { TestCenter } from "domains/Testing/TestCenter";
import React from "react";

export const QueensTestCenter = () => {
  const [board, setBoard] = React.useState<Board>([]);
  // there are two features I want to make:
  // One to hand make boards
  // One to test the board generation functions, and see how the boards look
  // generateBoardAndTestForDeterminism can have a new function passed in.

  // Ok, updating board generation. What do I want to test?
  // I want to start generating boards, and see what percentage are deterministic. See how many boards generated before they are deterministic.
  // then, make a change, and see if it is better.
  return (
    <TestCenter
      tests={[
        {
          isHidden: false,
          functionName: "generateBoard",
          functionToTest: getInitialBoardWithSeedRegions,
          defaultInputs: [{ sideLength: 10, rng: new RNG(16) }],
          resultDisplayComponent: (result: {
            board: Board;
            regionSquares: Coords[][];
          }) => {
            console.log(result);
            setBoard(result?.board || []);
            return <></>;
            // return result?.board?.length ? (
            //   <PlayableBoard initialBoard={colorsToRegions(result.board)} />
            // ) : null;
          },
        },
        {
          isHidden: false,
          functionName: "generateBoard",
          functionToTest: generateBoardFromSeedV3,
          defaultInputs: [10],
          resultDisplayComponent: (result: Board) => {
            console.log({ board });
            setBoard(board);
            return <></>;
            // return result?.length ? (
            //   <PlayableBoard initialBoard={colorsToRegions(result)} />
            // ) : null;
          },
        },
      ]}
    />
  );
};
