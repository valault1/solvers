import { findWordsWithLetters } from "domains/Wordle/WordleSolver/nextGuessCalculator";

//given the letters, produce the possible words
export const solveSpellingBee = (
  lettersCapital: string,
  allWords: string[]
): string[] => {
  const letters = lettersCapital.toLowerCase();
  const lettersDict = letters.split("").reduce((acc: any, letter) => {
    acc[letter] = true;
    return acc;
  }, {});
  const firstLetter = letters.charAt(0);
  console.log({ lettersDict });

  // a word must contain the center letter
  // a word must only contain letters that exist in the letters string
  const solution = allWords.filter((word) => {
    let containsCenterLetter = false;
    for (let i = 0; i < word.length; i++) {
      if (!lettersDict[word.charAt(i)]) return false;
      if (word.charAt(i) === firstLetter) containsCenterLetter = true;
    }

    return containsCenterLetter;
  });

  solution.sort((a, b) => b.length - a.length);

  return solution;
};
