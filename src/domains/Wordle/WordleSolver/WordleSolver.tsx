import { Button, Checkbox, Dialog, TextField } from "@mui/material";
import React from "react";
import {
  BEST_INITIAL_GUESS,
  getBestGuess,
  getPossibleWords,
  getResult,
} from "domains/Wordle/WordleSolver/nextGuessCalculator";

import {
  DialogContent,
  DialogHeader,
  DialogWord,
  Recommendations,
  ShowDialogButton,
} from "../Wordle.elements";
import { legalWords } from "../words";
import {
  InputRow,
  InputWrapper,
  LabelWrapper,
  PrimaryButton,
  TextInput,
} from "components/Form.elements";
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
  handleKeyPress?: (e: React.KeyboardEvent) => void;
  resultErrorText?: string;
  guessErrorText?: string;
  guessInputRef?: React.RefObject<HTMLDivElement>;
};

const GuessInput = ({
  guessNumber,
  guess,
  bestGuess,
  showSubmit,
  onChange,
  onSubmit,
  showPossibleWords,
  handleKeyPress,
  resultErrorText,
  guessErrorText,
  guessInputRef,
}: GuessInputProps) => {
  return (
    <InputWrapper>
      <LabelWrapper>Guess #{guessNumber + 1}</LabelWrapper>
      <Recommendations>
        <LabelWrapper>
          Our recommended guess: <br />
          {bestGuess}
        </LabelWrapper>
        {guessNumber !== 0 && (
          <ShowDialogButton
            variant="text"
            color="secondary"
            onClick={() => showPossibleWords(guessNumber)}
          >
            Show all possible words
          </ShowDialogButton>
        )}
      </Recommendations>
      <InputRow>
        <TextInput
          label={"Your Guess"}
          id={"guess" + guessNumber}
          value={guess.guess}
          onChange={(event) =>
            onChange({ guess: event.target.value, result: guess.result })
          }
          inputProps={{ maxLength: 5 }}
          disabled={!showSubmit}
          onKeyUp={handleKeyPress}
          error={!!guessErrorText}
          helperText={guessErrorText}
          ref={guessInputRef}
          autoFocus={!!guessInputRef}
          key={"guess_input" + guessNumber}
        />
        <TextInput
          label={"Result"}
          id={"result" + guessNumber}
          value={guess.result}
          inputProps={{ maxLength: 5 }}
          onChange={(event) =>
            onChange({ guess: guess.guess, result: event.target.value })
          }
          disabled={!showSubmit}
          onKeyUp={handleKeyPress}
          error={!!resultErrorText}
          helperText={resultErrorText}
          key={"result_input" + guessNumber}
        />
        {showSubmit && <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>}
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
} & Guess;

export const WordleSolver = ({}: WordleSolverProps) => {
  const [pastGuesses, setPastGuesses] = React.useState<PastGuess[]>([]);
  var [currentGuess, setCurrentGuess] = React.useState<Guess>({
    guess: "",
    result: "",
  });
  var [bestGuess, setBestGuess] = React.useState(BEST_INITIAL_GUESS);
  var [possibleWords, setPossibleWords] = React.useState(legalWords);
  var [dialogContent, setDialogContent] = React.useState(possibleWords);
  var [showDialog, setShowDialog] = React.useState(false);
  var [resultErrorText, setResultErrorText] = React.useState("");
  var [guessErrorText, setGuessErrorText] = React.useState("");
  var [secretWord, setSecretWord] = React.useState("");
  var [showSecretWordChecker, setShowSecretWordChecker] = React.useState(false);
  const guessInputRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const checkErrors = () => {
    var newGuessErrorText = "";
    var newResultErrorText = "";
    if (currentGuess.guess.length !== 5)
      newGuessErrorText += "Guess must be 5 letters.";

    if (currentGuess.result.length !== 5)
      newResultErrorText += "Result must be 5 letters.";
    const incorrectLetters = currentGuess.result
      .toLowerCase()
      .split("")
      .filter((letter) => !"byg".includes(letter));
    if (incorrectLetters.length > 0)
      newResultErrorText = "Only use letters 'b', 'y', and 'g'.";

    setGuessErrorText(newGuessErrorText);
    setResultErrorText(newResultErrorText);

    return newGuessErrorText || newResultErrorText;
  };
  const addGuess = () => {
    if (checkErrors()) {
      return;
    }
    const newPossibleWords = getPossibleWords(possibleWords, currentGuess);
    setPastGuesses([
      ...pastGuesses,
      { ...currentGuess, bestGuess, possibleWords },
    ]);
    setPossibleWords(newPossibleWords);
    setCurrentGuess({ guess: "", result: "" });
    setBestGuess(getBestGuess(newPossibleWords));
  };

  const showPossibleWords = (i: number) => {
    setShowDialog(true);
    setDialogContent(
      i === pastGuesses.length ? possibleWords : pastGuesses[i].possibleWords
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addGuess();
      e.preventDefault();
      //setTimeout(() => guessInputRef.current.focus(), 100);
      guessInputRef?.current?.focus();
    }
  };

  console.log({ pastGuesses, currentGuess });

  const doGuesses = () => {
    console.log("Got here");

    let currentGuess = "";
    let counter = 0;
    let currentPastGuesses: PastGuess[] = [];
    let currentPossibleWords = possibleWords;

    while (currentGuess != secretWord && counter <= 10) {
      currentGuess = getBestGuess(currentPossibleWords);

      let currentPastGuess: PastGuess = {
        bestGuess: currentGuess,
        possibleWords: [...currentPossibleWords],
        guess: currentGuess,
        result: getResult(currentGuess, secretWord),
      };
      currentPossibleWords = getPossibleWords(currentPossibleWords, {
        guess: currentGuess,
        result: getResult(currentGuess, secretWord),
      });

      console.log(currentPastGuess);
      currentPastGuesses.push(currentPastGuess);
      counter++;
    }
    setPastGuesses(currentPastGuesses);
    console.log(counter);
  };

  const handleSecretKeyPress = (e: React.KeyboardEvent) => {
    console.log("handleSecretKeyPress");
    console.log({ secretWord });
    if (e.key === "Enter" && secretWord.length === 5) {
      doGuesses();
      e.preventDefault();
      //setTimeout(() => guessInputRef.current.focus(), 100);
    }
  };

  const clear = () => {
    setPastGuesses([]);
    setPossibleWords(legalWords);
    setCurrentGuess({ guess: "", result: "" });
    setBestGuess(BEST_INITIAL_GUESS);
    setResultErrorText("");
    setGuessErrorText("");
  };

  return (
    <>
      <>
        <div>
          <Checkbox
            value={showSecretWordChecker}
            onChange={(event, checked) => setShowSecretWordChecker(checked)}
          />
          Already know the word?
        </div>

        {showSecretWordChecker && (
          <InputRow>
            <TextInput
              label={"Secret Word"}
              id={"secretWord"}
              inputProps={{ maxLength: 5 }}
              onChange={(event) => setSecretWord(event.target.value)}
              onKeyUp={handleSecretKeyPress} // TOFIX
            />
            <Button variant="contained" onClick={doGuesses}>
              Test Word
            </Button>
          </InputRow>
        )}
        {pastGuesses.map((guess, index) => {
          return (
            <GuessInput
              guessNumber={index}
              guess={guess}
              bestGuess={guess.bestGuess}
              showPossibleWords={showPossibleWords}
            />
          );
        })}
        {pastGuesses.length < NUM_GUESSES && (
          <GuessInput
            guessNumber={pastGuesses.length}
            guess={currentGuess}
            showSubmit
            onSubmit={addGuess}
            onChange={({ guess, result }) => {
              setCurrentGuess({ guess: guess.trim(), result: result.trim() });
            }}
            showPossibleWords={showPossibleWords}
            bestGuess={bestGuess}
            handleKeyPress={handleKeyPress}
            guessErrorText={guessErrorText}
            resultErrorText={resultErrorText}
            guessInputRef={guessInputRef}
          />
        )}
        <PrimaryButton onClick={clear}>Start Over</PrimaryButton>
      </>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogContent>
          <DialogHeader>
            Number of possible words: {dialogContent.length}
          </DialogHeader>

          {dialogContent.map((word) => (
            <DialogWord>{word}</DialogWord>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
