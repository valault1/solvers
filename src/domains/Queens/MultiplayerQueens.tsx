import { MainContainer } from "components/MainPage.elements";
import * as React from "react";

// What modes to support at the beginning?
// Let them choose the board size, and then play 3 boards.
// After they have played 3 boards, we give them a link to share.
//

export const MultiplayerQueens = () => {
  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      Multiplayer
    </MainContainer>
  );
};
