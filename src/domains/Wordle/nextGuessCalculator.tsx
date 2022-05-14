import { Guess } from "./WordleSolver";

export const BEST_INITIAL_GUESS = "cares"


// Given a list of words, a guess, and a result, this narrows down the options
export const getPossibleWords: (currentPossibleWords: string[], guess: Guess) => string[] = (currentPossibleWords, guess) => {
  const result = guess.result;
  const g = guess.guess;
  const newPossibleWords = currentPossibleWords.filter((word) => {
    // return true if this word is possible, given the guess and result so far
    for (let i = 0; i < g.length; i++) {
      if (result[i] === "b" && word.includes(g[i])) return false;
      if (result[i] === "y" && !word.includes(g[i])) return false;
      if (result[i] === "g" && word[i] !== g[i]) return false;
    }
    return true;
  })
  return newPossibleWords;
}

export const getBestGuess: (currentPossibleWords: string[]) => string = (currentPossibleWords) => {

  return "cares";
  
}