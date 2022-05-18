import { Guess } from "./WordleSolver";

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

export const getBestGuess: (currentPossibleWords: string[]) => string = (
  currentPossibleWords
) => {
  return "cares";
};
