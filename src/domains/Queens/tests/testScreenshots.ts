import { cropPixelArrayToBoard } from "domains/Queens/helpers/solver/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/solver/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solver/solveBoard";
import { processRawImage } from "domains/Queens/hooks/useImageParsing";
import { BlankBoard, Board, PixelArray } from "domains/Queens/sharedTypes";

var pixels = require("image-pixels");

export type TestResults = {
  posterizedPixelArray: PixelArray;
  croppedBoard: PixelArray;
  blankBoard: BlankBoard;
  solvedBoard: Board;
};

export const BLANK_TEST_RESULTS: TestResults = {
  posterizedPixelArray: [],
  croppedBoard: [],
  blankBoard: [],
  solvedBoard: [],
};

export const testScreenshotFromUrl = async (url: string) => {
  console.log("Started test with url " + url);
  const rawImageData = await pixels(url);
  const startTime = new Date().getTime();

  const posterizedPixelArray = processRawImage(rawImageData);
  const croppedBoard = await cropPixelArrayToBoard(posterizedPixelArray);
  const blankBoard = await getBlankBoard(croppedBoard);
  const solvedBoard = await solveBoard(blankBoard);

  console.log({ timeToProcessAndSolve: new Date().getTime() - startTime });
  console.log({ solvedBoard });
  return { posterizedPixelArray, croppedBoard, blankBoard, solvedBoard };
};
