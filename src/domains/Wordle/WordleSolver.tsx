import { Button, Dialog, TextField } from "@mui/material";
import React from "react";
import { BEST_INITIAL_GUESS, getBestGuess, getPossibleWords } from "./nextGuessCalculator";

import {
  DialogContent,
  DialogHeader,
  DialogWord,
  InputRow,
  InputWrapper,
  LabelWrapper,
  MainCard,
  MainContainer,
  Recommendations,
  ShowDialogButton,
  SubmitButton,
} from "./WordleSolver.elements";
import { legalWords } from "./words";
const NUM_GUESSES = 6;
type WordleSolverProps = {};

type GuessInputProps = {
  guessNumber: number;
  guess: Guess;
  bestGuess: string;
  showSubmit?: boolean;
  onChange?: (value: Guess) => void;
  onSubmit?: () => void;
  showPossibleWords: (i: number) => void;
};

const GuessInput = ({ guessNumber, guess, bestGuess, showSubmit, onChange, onSubmit, showPossibleWords }: GuessInputProps) => {
  return (
    <InputWrapper>
      <LabelWrapper>Guess #{guessNumber}</LabelWrapper>
      <Recommendations>
        <LabelWrapper>Our recommended guess: <br/>{bestGuess}</LabelWrapper>
        <ShowDialogButton 
          variant="outlined"
          color="secondary"
          onClick={() => showPossibleWords(guessNumber)}
          > 
          All possible words
        </ShowDialogButton>
      </Recommendations>
      <InputRow>
        <TextField
          variant="filled"
          label={"Your Guess"}
          id={"guess" + guessNumber}
          value={guess.guess}
          onChange={(event) => onChange({guess: event.target.value, result: guess.result})}
          disabled={!showSubmit}
        />
        <TextField
          variant="filled"
          label={"Result"}
          id={"result" + guessNumber}
          value={guess.result}
          onChange={(event) => onChange({guess: guess.guess, result: event.target.value})}
          disabled={!showSubmit}
        />
        {showSubmit && <SubmitButton onClick={onSubmit} variant="contained">Submit</SubmitButton>}
      </InputRow>
    </InputWrapper>
  );
};

export type Guess = {
  guess: string;
  result: string;
};

type PastGuess = {
  // bestGuess is the guess we recommended
  bestGuess: string;
  possibleWords: string[];
} & Guess

export const WordleSolver = ({}: WordleSolverProps) => {
  const [pastGuesses, setPastGuesses] = React.useState<PastGuess[]>([]);
  var [currentGuess, setCurrentGuess] = React.useState<Guess>({ guess: "", result: "" });
  var [bestGuess, setBestGuess] = React.useState(BEST_INITIAL_GUESS);
  var [possibleWords, setPossibleWords] = React.useState(legalWords);
  var [dialogContent, setDialogContent] = React.useState(possibleWords);
  var [showDialog, setShowDialog] = React.useState(false);
  const addGuess = () => {
    const newPossibleWords = getPossibleWords(possibleWords, currentGuess);
    setPastGuesses([...pastGuesses, {...currentGuess, bestGuess, possibleWords}]);
    setPossibleWords(newPossibleWords);
    setCurrentGuess({ guess: "", result: "" });
    setBestGuess(getBestGuess(possibleWords));

  }

  const showPossibleWords = (i: number) => {
    setShowDialog(true);
    setDialogContent(i === pastGuesses.length ? possibleWords : pastGuesses[i].possibleWords);
  }
  console.log(showDialog);

  return (
    <MainContainer>
      <MainCard>
        <h1>Wordle Solver</h1>
        {pastGuesses.map((guess, index) => {
          return <GuessInput guessNumber={index} guess={guess} bestGuess={bestGuess} showPossibleWords={showPossibleWords}/>;
        })}
        {pastGuesses.length < NUM_GUESSES && (
          <GuessInput
            guessNumber={pastGuesses.length}
            guess={currentGuess}
            showSubmit
            onSubmit={addGuess}
            onChange={setCurrentGuess}
            showPossibleWords={showPossibleWords}
            bestGuess={BEST_INITIAL_GUESS}
          />
        )}
      </MainCard>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}> 
      <DialogContent>
        <DialogHeader>Number of possible words: {dialogContent.length}</DialogHeader>

         {dialogContent.map((word) => 
      <DialogWord>{word}</DialogWord>)}</DialogContent></Dialog>
    </MainContainer>
  );
};
