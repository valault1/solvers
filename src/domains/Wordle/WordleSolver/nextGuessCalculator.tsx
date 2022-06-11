import { Guess } from "domains/Wordle/WordleSolver/WordleSolver";
import { legalWords } from "domains/Wordle/words";

export const BEST_INITIAL_GUESS = "cares";

// Given a list of words, a guess, and a result, this narrows down the options
export const getPossibleWords: (
  currentPossibleWords: string[],
  guess: Guess
) => string[] = (currentPossibleWords, guess) => {
  const result = guess.result.toLowerCase();
  const guessedWord = guess.guess.toLowerCase();
  const newPossibleWords = currentPossibleWords.filter((word) => {
    // return true if this word is possible, given the guess and result so far
    for (let i = 0; i < guessedWord.length; i++) {
      const minCountOfLetterInRealWord = guessedWord
        .split("")
        .filter(
          (letter, index) =>
            letter === guessedWord[i] &&
            (result[index] === "y" || result[index] === "g")
        ).length;
      // If we find the same letter with a b, then we know the max count is the same as the min count;
      // Otherwise, subtract each y or g you got from 5 and add back the minCount.
      // Ex. we are checking "daddy" against the guess "dodoy gbgby"; up to 4 letters in this word could be "d", but one is guaranteed not to be.
      const maxCountOfLetterInRealWord = guessedWord
        .split("")
        .filter(
          (letter, index) => letter === guessedWord[i] && result[index] === "b"
        ).length
        ? minCountOfLetterInRealWord
        : 5 -
          result.split("").filter((letter) => letter !== "b").length +
          minCountOfLetterInRealWord;
      const countOfLetterInPossibleWord = word.split(guessedWord[i]).length - 1;
      //const countOfLetterInGuessedWord =
      //  guessedWord.split(guessedWord[i]).length - 1;
      if (
        result[i] === "b" &&
        countOfLetterInPossibleWord > maxCountOfLetterInRealWord
      )
        return false;
      if (result[i] === "y") {
        // If the potential word doesn't contain the guessed letter, remove it
        if (!word.includes(guessedWord[i])) return false;
        // If the potential word has the guessed letter at this spot, remove it
        if (word[i] === guessedWord[i]) return false;
        // If we know there are two instances of the guessed letter, and the word has only 1, remove it
        // first, count how many instances of the letter appear in the secret word

        if (countOfLetterInPossibleWord < minCountOfLetterInRealWord)
          return false;
      }
      if (result[i] === "g" && word[i] !== guessedWord[i]) return false;
    }
    return true;
  });
  return newPossibleWords;
};

type ScoreTable = {
  [key: string]: number;
};

const scoreWords: (currentPossibleWords: string[]) => ScoreTable = (
  currentPossibleWords
) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const letterFrequencies = letters
    .split("")
    .reduce<ScoreTable>((accumulator, nextLetter) => {
      accumulator[nextLetter] = currentPossibleWords.filter((word) =>
        word.includes(nextLetter)
      ).length;
      return accumulator;
    }, {});
  const dedup = (str: string) => new Set(str.split(""));
  var scores: ScoreTable = {};
  currentPossibleWords.forEach((word) => {
    var sum = 0;
    new Set(word.split("")).forEach(
      (nextLetter) => (sum += letterFrequencies[nextLetter])
    );
    scores[word] = sum;
  });
  return scores;
};

export const getBestGuess: (currentPossibleWords: string[]) => string = (
  currentPossibleWords
) => {
  const wordScores = scoreWords(currentPossibleWords);
  let key: keyof ScoreTable;
  var scoresList = [];
  for (key in wordScores) {
    scoresList.push({ word: key, score: wordScores[key] });
  }
  scoresList.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });

  return scoresList?.[0]?.word || "cares";
};

export const findWordsWithLetters: (letters: string) => string[] = (
  letters
) => {
  const scores: ScoreTable = {};

  var scoresList = [];
  let key: keyof ScoreTable;

  legalWords.forEach((nextWord) => {
    let score = 0;
    for (let i = 0; i < letters.length; i++) {
      if (nextWord.includes(letters[i])) {
        score += 1;
      }
    }
    scores[nextWord] = score;
  });

  for (key in scores) {
    scoresList.push({ word: key, score: scores[key] });
  }

  scoresList.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });

  return scoresList
    .slice(0, scoresList.length >= 4 ? 4 : scoresList.length)
    .map((score) => score.word);
};
