// import { promises as fs } from "fs";

// const signText = "a lot of gay douchers roll secular units";
// const signTextTrimmed = signText.replace(/ /g, "");
// const wordFileContents = fs.readFile(
//   "../python/wordhunt/scrabble_words_cleaned.txt",
//   "utf-8"
// );

// type Letter =
//   | "a"
//   | "b"
//   | "c"
//   | "d"
//   | "e"
//   | "f"
//   | "g"
//   | "h"
//   | "i"
//   | "j"
//   | "k"
//   | "l"
//   | "m"
//   | "n"
//   | "o"
//   | "p"
//   | "q"
//   | "r"
//   | "s"
//   | "t"
//   | "u"
//   | "v"
//   | "w"
//   | "x"
//   | "y"
//   | "z";

// type LetterCounts = { [key in Letter as string]: number };

// const getLetterCounts = (word: string) => {
//   return word.split("").reduce<LetterCounts>((acc, letter) => {
//     if (acc[letter]) {
//       acc[letter] += 1;
//     } else {
//       acc[letter] = 1;
//     }
//     return acc;
//   }, {});
// };

// const signLetterCounts = getLetterCounts(signTextTrimmed);

// export const getAnagrams = async (word: string) => {
//   await Promise.all([wordFileContents]);
//   getPossibleAnagrams("aardvark", signLetterCounts);
// };

// // getPossibleAnagrams is recursive. It starts with a word, and finds all possible words that can be made from the letters.
// //
// const getPossibleAnagrams = async (
//   word: string,
//   targetLetterCounts: LetterCounts
// ) => {
//   const contents = await wordFileContents;
//   const legalWords = contents.split("\n");
//   console.log({ legalWords });
//   legalWords.forEach((word) => {
//     // let newLetterCounts = {};
//     // let wordsFormed = "";
//     // while (newLetterCounts) {
//     //   newLetterCounts = makeWordFromLetters(word, targetLetterCounts);
//     //   if (newLetterCounts) wordsFormed += word + " ";
//     // }
//     // console.log({ word, wordsFormed });
//   });
// };

// const makeWordFromLetters = (
//   word: string,
//   targetLetterCounts: LetterCounts
// ): LetterCounts | undefined => {
//   const wordLetterCounts = getLetterCounts(word);
//   const newLetterCounts: LetterCounts = { ...targetLetterCounts };
//   for (const letter of Object.keys(wordLetterCounts)) {
//     if (
//       !targetLetterCounts[letter] ||
//       wordLetterCounts[letter] > targetLetterCounts[letter]
//     ) {
//       return undefined;
//     } else {
//       newLetterCounts[letter] -= wordLetterCounts[letter];
//     }
//   }
//   return newLetterCounts;
// };

// const canMakeWordWithLetters = (
//   word: string,
//   targetLetterCounts: LetterCounts
// ) => {
//   const wordLetterCounts = getLetterCounts(word);
//   // console.log({ wordLetterCounts });
//   for (const letter of Object.keys(wordLetterCounts)) {
//     if (
//       !targetLetterCounts[letter] ||
//       wordLetterCounts[letter] > targetLetterCounts[letter]
//     ) {
//       // console.log({
//       //   1: !targetLetterCounts[letter],
//       //   2: wordLetterCounts[letter],
//       //   3: targetLetterCounts[letter],
//       // });
//       return false;
//     }
//   }
//   return true;
// };

// getAnagrams("test");
