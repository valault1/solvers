import { PrimaryButton, TextInput } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { LettersDisplay } from "domains/SpellingBee/LettersDisplay";
import { SolutionDisplay } from "domains/SpellingBee/SolutionDisplay";
import { solveSpellingBee } from "domains/SpellingBee/solveSpellingBee";
import React from "react";

export const SpellingBeeSolver = () => {
  const [letters, setLetters] = React.useState<string>("");
  const [solved, setSolved] = React.useState(false);
  const [allWords, setWords] = React.useState<string[]>([]);
  const [solutionWords, setSolutionWords] = React.useState<
    string[] | undefined
  >(undefined);

  const updateLetters = React.useCallback(
    (newLetters: string) => {
      if (newLetters.length > 7) return;
      setLetters(newLetters.toLocaleUpperCase());
      setSolutionWords(undefined);
    },
    [setSolutionWords, setLetters]
  );

  React.useEffect(() => {
    const loadWords = async () => {
      const module = await require("./allWords.js");
      setWords(module.allWords);
    };
    loadWords();
  }, []);

  return (
    <MainContainer gap={12}>
      <h1>Spelling Bee Solver</h1>
      <TextInput
        label="Letters"
        value={letters}
        onChange={(e) => {
          updateLetters(e.target.value || "");
        }}
      />
      <LettersDisplay letters={letters} />
      <PrimaryButton
        disabled={letters.length !== 7}
        onClick={() => {
          const solution = solveSpellingBee(letters, allWords);
          setSolutionWords(solution);
        }}
      >
        Solve
      </PrimaryButton>
      {solutionWords && <SolutionDisplay words={solutionWords} />}
    </MainContainer>
  );
};
