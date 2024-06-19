import { Card } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";

import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";

import * as React from "react";

export const QueensPlayer = () => {
  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Play Queens!</h1>

      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        These boards are randomly generated. They're a little derpy, but mostly
        playable!
      </Card>

      <PlayableBoard />

      {/* <SolveBoardPlayground /> */}
    </MainContainer>
  );
};
