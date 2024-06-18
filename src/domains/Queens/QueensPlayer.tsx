import { MainContainer } from "components/MainPage.elements";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";

import SolveBoardPlayground from "domains/Queens/components/SolveBoardPlayground";

import * as React from "react";

export const QueensPlayer = () => {
  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Play Queens</h1>
      <BoardDisplay board={board} />

      <SolveBoardPlayground />
    </MainContainer>
  );
};
