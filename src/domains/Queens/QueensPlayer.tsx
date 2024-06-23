import { Card, Stack } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";

import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { generateBorders } from "domains/Queens/helpers/boardGenerators/generateBorders";
import { generateRegionsV2 } from "domains/Queens/helpers/boardGenerators/generateBordersV2";
import { colorsToRegions } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import {
  generateBoardAndTestForDeterminism,
  generateDeterministicSeeds,
  getTextToCopy,
} from "domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import { RNG } from "domains/Queens/helpers/randomNum";
import { mockRegionSizes, mockStarPositions } from "domains/Queens/mocks/mocks";
import { Board } from "domains/Queens/sharedTypes";
import { TestCenter } from "domains/Testing/TestCenter";

import * as React from "react";

export const QueensPlayer = () => {
  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      {/* <TestCenter
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
            defaultInputs: [],
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
      /> */}
      <h1>Play Queens!</h1>

      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        These boards are randomly generated. They are guaranteed to be solvable
        without guessing!
      </Card>

      <PlayableBoard />
    </MainContainer>
  );
};
