import { MainContainer } from "components/MainPage.elements";
import { Test } from "domains/Testing/sharedTypes";
import { TestController } from "domains/Testing/TestController";
import * as React from "react";

export const TestCenter = ({ tests }: { tests: Test[] }) => {
  return (
    <MainContainer>
      <h1>Testing Center</h1>
      {tests.map((test) => {
        return <TestController test={test} />;
      })}
    </MainContainer>
  );
};
