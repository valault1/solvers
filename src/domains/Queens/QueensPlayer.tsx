import { MainContainer } from "components/MainPage.elements";
import {
  BoardDisplay,
  OnClickTile,
} from "domains/Queens/components/BoardDisplay";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";

import SolveBoardPlayground from "domains/Queens/components/SolveBoardPlayground";
import { createBoardFromBlankBoard } from "domains/Queens/helpers/solveBoard";
import { MOCK_BLANK_BOARD_2 } from "domains/Queens/mocks/mocks";
import { Board } from "domains/Queens/sharedTypes";

import * as React from "react";

const EMPTY_BOARD = createBoardFromBlankBoard(MOCK_BLANK_BOARD_2);

export const QueensPlayer = () => {
  const [board, setBoard] = React.useState(EMPTY_BOARD);

  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Play Queens!</h1>
      <PlayableBoard blankBoard={MOCK_BLANK_BOARD_2} />

      {/* <SolveBoardPlayground /> */}
    </MainContainer>
  );
};
