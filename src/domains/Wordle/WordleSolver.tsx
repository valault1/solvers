import { Button, TextField } from "@mui/material";
import React from "react";
import { Game } from "../../shared/Game";
import { GameAndSolver } from "../../shared/GameAndSolverDisplay";
import { theme } from "../../theme";
import {
  InputRow,
  InputWrapper,
  LabelWrapper,
  MainCard,
  MainContainer,
  SubmitButton,
} from "./WordleSolver.elements";
const NUM_GUESSES = 6;
type WordleSolverProps = {};

type GuessInputProps = {
  guessNumber: number;
  guess: Guess;
  showSubmit?: boolean;
};

const GuessInput = ({ guessNumber, guess, showSubmit }: GuessInputProps) => {
  return (
    <InputWrapper>
      <LabelWrapper>Guess #{guessNumber}</LabelWrapper>
      <InputRow>
        <TextField
          variant="filled"
          label={"Your Guess"}
          id={"guess" + guessNumber}
          value={guess.guess}
          onChange={() => {}}
          disabled={!showSubmit}
        />
        <TextField
          variant="filled"
          label={"Result"}
          id={"result" + guessNumber}
          value={guess.result}
          onChange={() => {}}
          disabled={!showSubmit}
        />
        {showSubmit && <SubmitButton variant="contained">Submit</SubmitButton>}
      </InputRow>
    </InputWrapper>
  );
};

type Guess = {
  guess: string;
  result: string;
};

export const WordleSolver = ({}: WordleSolverProps) => {
  var inputedGuesses: Guess[] = [{ guess: "cares", result: "ybyyg" }];
  var currentGuess = { guess: "", result: "" };
  return (
    <MainContainer>
      <MainCard>
        <h1>Wordle Solver</h1>
        {inputedGuesses.map((guess, index) => {
          return <GuessInput guessNumber={index} guess={guess} />;
        })}
        {inputedGuesses.length < NUM_GUESSES && (
          <GuessInput
            guessNumber={inputedGuesses.length}
            guess={currentGuess}
            showSubmit
          />
        )}
      </MainCard>
    </MainContainer>
  );
};
