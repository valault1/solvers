import { WordGenerator } from "domains/Wordle/WordGenerator/WordGeneratorController";
import { MainCard, MainContainer } from "domains/Wordle/Wordle.elements";
import { WordleSolver } from "domains/Wordle/WordleSolver/WordleSolver";
import React from "react";

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
