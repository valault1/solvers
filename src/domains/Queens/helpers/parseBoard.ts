import {
  cropOffNextBlockOfColor,
  cropOffNextBlockOfColorCol,
  cropOffNextBlockOfColorLegacy,
  getMajorityColor,
} from "domains/Queens/helpers/cropBoard";
import {
  BlankBoard,
  BlankBoardRow,
  BoardColor,
  PixelArray,
} from "domains/Queens/sharedTypes";

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
export const getBlankBoard = (pixelArray: PixelArray) => {
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

    croppedArray = remainingPiece;
    const { row, croppedSquaresRow } = parseRow(croppedPiece);
    board.push(row);
    croppedImageSquares.push(croppedSquaresRow);
  }

  // for some reason, the board is rotated. So unrotate it.
  const rotatedBoard = rotateBoard(board);
  console.log({
    parseTime: new Date().getTime() - startTime,
    blankBoard: rotatedBoard,
  });
  // croppedImageSquares is just used for debugging.
  return { board: rotatedBoard, croppedImageSquares };
};
