import {
  BoardColor,
  ImageColor,
  PixelArray,
  RgbaColor,
} from "domains/Queens/sharedTypes";
import {
  COLORS_LIST_BY_COLOR,
  colorToString,
} from "domains/Queens/useImageParsing";

export const getMajorityColor = (pixelArray: PixelArray) => {
  const counts = getPixelCounts(pixelArray);
  return getMajorityColorFromCounts(counts);
};

const getMajorityColorFromCounts = (counts: Record<string, number>) => {
  let maxColor = "";
  let maxCount = 0;
  for (let color of Object.keys(counts)) {
    if (counts[color] > maxCount) {
      maxColor = color;
      maxCount = counts[color];
    }
  }
  return maxColor;
};

export const getMajorityColorOfRow = (row: RgbaColor[]) => {
  const counts = getRowPixelCounts(row);
  return getMajorityColorFromCounts(counts);
};

// goes from the top, and finds the first row with that majority color
export const findRowIndexWithMajorityColor = (
  pixelArray: PixelArray,
  targetColor: ImageColor
) => {
  for (let rowIndex = 0; rowIndex < pixelArray.length; rowIndex++) {
    const row = pixelArray[rowIndex];
    const majorityColor = getMajorityColorOfRow(row);

    if (majorityColor === targetColor) {
      return rowIndex;
    }
  }
};

// finds the next block of target color, and crops it off
export const cropOffNextBlockOfColor = (
  pixelArray: PixelArray,
  targetColor: ImageColor
): { croppedPiece: PixelArray; remainingPiece: PixelArray } => {
  const defaultReturnValue = {
    croppedPiece: [] as PixelArray,
    remainingPiece: pixelArray,
  };
  if (pixelArray.length === 0) return defaultReturnValue;
  let hasFoundColor = false;
  for (let rowIndex = 0; rowIndex < pixelArray.length; rowIndex++) {
    const row = pixelArray[rowIndex];
    const majorityColor = getMajorityColorOfRow(row);

    if (hasFoundColor && majorityColor !== targetColor) {
      return {
        croppedPiece: cropPixelArray(pixelArray, 0, 0, rowIndex, row.length),
        remainingPiece: cropPixelArray(
          pixelArray,
          rowIndex,
          0,
          pixelArray.length,
          row.length
        ),
      };
    }

    if (majorityColor === targetColor) {
      hasFoundColor = true;
    }
  }
  return { croppedPiece: pixelArray, remainingPiece: [] as PixelArray };
};

// finds the next block of target color columnwise, and crops it off
export const cropOffNextBlockOfColorCol = (
  pixelArray: PixelArray,
  targetColor: ImageColor
) => {
  const defaultReturnValue = {
    croppedPiece: [] as PixelArray,
    remainingPiece: pixelArray,
  };
  if (pixelArray.length === 0) return defaultReturnValue;
  let hasFoundColor = false;
  for (let colIndex = 0; colIndex < pixelArray[0].length; colIndex++) {
    const row = pixelArray.map((row) => row[colIndex]);
    const majorityColor = getMajorityColorOfRow(row);

    if (hasFoundColor && majorityColor !== targetColor) {
      return {
        croppedPiece: cropPixelArray(
          pixelArray,
          0,
          0,
          pixelArray.length,
          colIndex
        ),
        remainingPiece: cropPixelArray(
          pixelArray,
          0,
          colIndex,
          pixelArray.length,
          pixelArray[0].length
        ),
      };
    }

    if (majorityColor === targetColor) {
      hasFoundColor = true;
    }
  }
  return { croppedPiece: pixelArray, remainingPiece: [] as PixelArray };
};

// only counts the pixels that fall within the list of colors defined
const getRowPixelCounts = (row: RgbaColor[]) => {
  const counts: Record<string, number> = {};
  for (let color of row) {
    const key = COLORS_LIST_BY_COLOR[colorToString(color)];
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
};

const getPixelCounts = (pixelArray: PixelArray) => {
  const counts: Record<string, number> = {};
  for (let row of pixelArray) {
    for (let color of row) {
      const key = COLORS_LIST_BY_COLOR[colorToString(color)];
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
};

const findTopBorderIndex = (pixelArray: PixelArray) => {
  if (!pixelArray.length) return -1;
  // find the first row from the top that is mostly white.
  // Then, return the next row that is mostly black.
  let foundWhite = false;
  for (let rowIndex = 0; rowIndex < pixelArray.length; rowIndex++) {
    const row = pixelArray[rowIndex];
    const majorityColor = getMajorityColorOfRow(row);
    if (majorityColor === "white") {
      foundWhite = true;
    }
    if (majorityColor === "black" && foundWhite) {
      return rowIndex;
    }
  }
  return -1;
};

const findBottomBorderIndex = (pixelArray: PixelArray) => {
  if (!pixelArray.length) return -1;
  // look for black majority row, then white, then black
  let foundBlack = false;
  let foundWhite = false;
  let foundBlack2 = false;
  let foundWhite2 = false;
  for (let rowIndex = pixelArray.length - 1; rowIndex >= 0; rowIndex--) {
    const row = pixelArray[rowIndex];
    const majorityColor = getMajorityColorOfRow(row);
    if (majorityColor === "black") {
      if (foundBlack2 && foundWhite2) {
        return rowIndex;
      }
      if (foundBlack && foundWhite) foundBlack2 = true;
      foundBlack = true;
    }

    if (majorityColor === "white") {
      if (foundWhite && foundBlack2) foundWhite2 = true;
      foundWhite = true;
    }
  }
  return -1;
};

const findLeftBorderIndex = (pixelArray: PixelArray) => {
  let foundWhite = false;
  for (let colIndex = 0; colIndex < pixelArray[0].length; colIndex++) {
    const column = pixelArray.map((row) => row[colIndex]);
    const majorityColor = getMajorityColorOfRow(column);
    if (majorityColor === "black" && foundWhite) {
      return colIndex;
    }
    if (majorityColor === "white") {
      foundWhite = true;
    }
  }
};

const findRightBorderIndex = (pixelArray: PixelArray) => {
  let foundWhite = false;
  for (let colIndex = pixelArray[0].length - 1; colIndex >= 0; colIndex--) {
    const column = pixelArray.map((row) => row[colIndex]);
    const majorityColor = getMajorityColorOfRow(column);
    if (majorityColor === "black" && foundWhite) {
      return colIndex;
    }
    if (majorityColor === "white") {
      foundWhite = true;
    }
  }
};

export const cropPixelArrayToBoard = (pixelArray: PixelArray) => {
  if (pixelArray.length === 0) return pixelArray;
  const topBorderIndex = findTopBorderIndex(pixelArray);
  const bottomBorderIndex = findBottomBorderIndex(pixelArray);
  let updatedPixelArray = pixelArray;
  if (topBorderIndex >= 0 && bottomBorderIndex >= 0) {
    updatedPixelArray = cropPixelArray(
      updatedPixelArray,
      topBorderIndex,
      0,
      bottomBorderIndex,
      pixelArray[0].length
    );
  }
  const leftBorderIndex = findLeftBorderIndex(updatedPixelArray);
  const rightBorderIndex = findRightBorderIndex(updatedPixelArray);

  if (leftBorderIndex >= 0 && rightBorderIndex >= 0) {
    updatedPixelArray = cropPixelArray(
      updatedPixelArray,
      0,
      leftBorderIndex,
      pixelArray.length,
      rightBorderIndex
    );
  }
  return updatedPixelArray;
};

export const cropPixelArray = (
  pixelArray: PixelArray,
  i1: number,
  j1: number,
  i2: number,
  j2: number
) => {
  return pixelArray.slice(i1, i2 + 1).map((row) => {
    return row.slice(j1, j2 + 1);
  });
};
