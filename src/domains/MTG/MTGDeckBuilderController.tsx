import { MainContainer } from "components/MainPage.elements";
import { DeckBuyerController } from "domains/MTG/DeckBuyer/DeckBuyerController";
import * as React from "react";

export const MTGDeckBuilderController: React.VFC = () => {
  return (
    <MainContainer>
      <DeckBuyerController />
    </MainContainer>
  );
};
