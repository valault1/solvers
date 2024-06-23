import { Stack } from "@mui/material";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { generateRegionsV2 } from "domains/Queens/helpers/boardGenerators/generateBordersV2";
import { colorsToRegions } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import {
  generateDeterministicSeeds,
  getTextToCopy,
} from "domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import { RNG } from "domains/Queens/helpers/randomNum";
import { mockRegionSizes, mockStarPositions } from "domains/Queens/mocks/mocks";
import { Board } from "domains/Queens/sharedTypes";
import { TestCenter } from "domains/Testing/TestCenter";
import React from "react";

export const QueensTestCenter = () => {
  return (
    <TestCenter
      tests={[
        {
          isHidden: true,
          functionName: "generateRegionsV2",
          functionToTest: generateRegionsV2,
          defaultInputs: [
            {
              starPositions: mockStarPositions,
              regionSizes: mockRegionSizes,
              rng: new RNG(1),
            },
          ],
          resultDisplayComponent: (result: Board) => {
            return result?.length ? (
              <PlayableBoard initialBoard={colorsToRegions(result)} />
            ) : null;
          },
        },
        {
          isHidden: true,
          functionName: "generateBoardAndTestForDeterminism",
          functionToTest: generateBoardAndTestForDeterminism,
          defaultInputs: [{}],
          resultDisplayComponent: (result: {
            board: Board;
            isDeterministic: boolean;
          }) => {
            return result ? (
              <>
                {result?.isDeterministic
                  ? "Board is deterministic!"
                  : "Board is not deterministic"}
                <PlayableBoard initialBoard={result.board} />
                <br />
              </>
            ) : null;
          },
        },
        {
          isHidden: false,
          functionName: "generateDeterministicSeeds",
          functionToTest: generateDeterministicSeeds,
          defaultInputs: [],
          resultDisplayComponent: (result: number[]) => {
            return result ? (
              <Stack maxWidth={300}>{getTextToCopy(result)}</Stack>
            ) : null;
          },
        },
      ]}
    />
  );
};
