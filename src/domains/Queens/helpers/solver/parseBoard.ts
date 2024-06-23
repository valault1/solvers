import {
  CONSTANT_BLANK_ARRAY,
  pollEventLoop,
} from "domains/Queens/constants/constants";
import {
  cropOffNextBlockOfColorCol,
  cropOffNextBlockOfColorLegacy,
  getMajorityColor,
} from "domains/Queens/helpers/solver/cropBoard";
import {
  BlankBoard,
  BlankBoardRow,
  BoardColor,
  PixelArray,
} from "domains/Queens/sharedTypes";

let timerTime = new Date().getTime();
const setTimerTime = (newTime: number) => {
  timerTime = newTime;
};

export const rotateBoard = (board: BlankBoard): BlankBoard => {
  return board.map((row, i) => {
    return row.map((color, j) => board[j][i]);
  });
};

const cropOffTopBorder = (pixelArray: PixelArray): PixelArray => {
  return cropOffNextBlockOfColorLegacy(pixelArray, "black").remainingPiece;
};

const parseRow = (
  pixelArray: PixelArray
): { row: BlankBoardRow; croppedSquaresRow: PixelArray[] } => {
  const row: BlankBoardRow = [];
  let infiniteLoopGuard = 0;
  // remove left border

  let remainingPixelArray = cropOffNextBlockOfColorCol(
    pixelArray,
    "black"
  ).remainingPiece;
  let croppedSquaresRow: PixelArray[] = [];
  while (remainingPixelArray.length > 0 && infiniteLoopGuard < 100) {
    infiniteLoopGuard++;
    const { croppedPiece, remainingPiece } = cropOffNextBlockOfColorCol(
      remainingPixelArray,
      "black"
    );
    remainingPixelArray = remainingPiece;
    croppedSquaresRow.push(croppedPiece);
    const color = getMajorityColor(croppedPiece);
    row.push(color as unknown as BoardColor);
  }
  return { row, croppedSquaresRow };
};

// strategy:
// Look at cropped board. take off top border.
// then, go row by row. crop each row off the board, process it, and go again.
export const getBlankBoard = async (pixelArray: PixelArray) => {
  if (!pixelArray?.length) return CONSTANT_BLANK_ARRAY;
  const startTime = new Date().getTime();
  let board: BlankBoard = [];
  let croppedImageSquares: PixelArray[][] = [];
  let croppedArray = cropOffTopBorder(pixelArray);

  let infiniteLoopGuard = 0;
  while (croppedArray.length > 0 && infiniteLoopGuard < 100) {
    infiniteLoopGuard++;
    // get one row, and remove it from the main array
    const { croppedPiece, remainingPiece } = cropOffNextBlockOfColorLegacy(
      croppedArray,
      "black"
    );

    await pollEventLoop(timerTime, setTimerTime);

    croppedArray = remainingPiece;
    const { row, croppedSquaresRow } = parseRow(croppedPiece);
    if (row.length) board.push(row);

    croppedImageSquares.push(croppedSquaresRow);
  }

  // for some reason, the board is rotated. So unrotate it.
  // update 6-18-24: turns out the display was rotated. the board is fine.
  //const rotatedBoard = rotateBoard(board);
  console.log({
    parseTime: new Date().getTime() - startTime,
    blankBoard: board,
  });

  return board;
};
