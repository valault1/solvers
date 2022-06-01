import React from "react";
import { WordGenerator } from "./WordGenerator/WordGeneratorController";
import { WordleSolver } from "./WordleSolver/WordleSolver";
import { MainCard, MainContainer } from "./WordleSolver/WordleSolver.elements";

type WordleControllerProps = {};

export const WordleController = ({}: WordleControllerProps) => {
  return (
    <MainContainer>
      <h1>Wordle Solver</h1>
      <MainCard>
        <WordleSolver />
        <WordGenerator />
      </MainCard>
    </MainContainer>
  );
};
