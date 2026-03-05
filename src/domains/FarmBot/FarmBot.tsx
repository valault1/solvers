import { MainContainer } from "components/MainPage.elements";
import * as React from "react";
import { Main } from "./Main";

export const FarmBot: React.VFC = () => {
  return (
    <MainContainer gap={16}>
      FarmBot <Main />
    </MainContainer>
  );
};
