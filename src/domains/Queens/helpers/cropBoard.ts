import {
  COLORS_LIST_BY_COLOR,
  colorArrToString,
} from "domains/Queens/constants/constants";
import { ImageColor, PixelArray, RgbaColor } from "domains/Queens/sharedTypes";

export const colorToString = (color: RgbaColor) => {
  return colorArrToString([color.r, color.g, color.b]);
};

type CropOptions = {
  pixelArray: PixelArray;
  targetColor: ImageColor;
  // if true, it will crop to the color; otherwise, it will crop the color off
  cropToColor?: boolean;
  reversed?: boolean;
  direction?: "column" | "row";
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

export const getMajorityColor = (pixelArray: PixelArray) => {
  const counts = getPixelCounts(pixelArray);
  return getMajorityColorFromCounts(counts);
};

export const getMajorityColorOfRow = (row: RgbaColor[]) => {
  const counts = getRowPixelCounts(row);
  return getMajorityColorFromCounts(counts);
};

const getIndexToCropTo = ({
  pixelArray,
  targetColor,
  cropToColor,
  reversed,
  direction,
}: CropOptions) => {
  let hasFoundColor = false;
  // rows is set based on the settings; it will be in the right order for whatever we want to do
  let rows: PixelArray = [];
  if (direction === "row" && !reversed) {
    rows = pixelArray;
  } else if (direction === "row" && reversed) {
    rows = [...pixelArray].reverse();
  } else if (direction === "column" && !reversed) {
    rows = pixelArray[0].map((row, i) => {
      return pixelArray.map((r, j) => pixelArray[j][i]);
    });
  } else {
    // direction === "column" && reversed
    // this needs to be a list of rows that is the nth column -> 1st column
    rows = pixelArray[0]
      .map((row, i) => {
        return pixelArray.map((r, j) => pixelArray[j][i]);
      })
      .reverse();
  }
  // console.log({
  //   rows,
  //   direction,
  //   reversed,
  //   pixelArray,
  //   targetColor,
  //   cropToColor,
  // });

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const majorityColor = getMajorityColorOfRow(row);
    const shouldCropNow =
      (cropToColor && hasFoundColor) ||
      (hasFoundColor && majorityColor !== targetColor);
    if (shouldCropNow) {
      const indexToReturn = reversed ? rows.length - i - 1 : i;
      return indexToReturn;
    }
    if (majorityColor === targetColor) {
      hasFoundColor = true;
    }
  }
  //console.log("finished looking - hasFoundColor: " + hasFoundColor);
  if (hasFoundColor && !cropToColor) {
    return reversed ? 0 : rows.length;
  }
  return -1;
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

// finds the next block of target color, and crops it off
export const cropOffNextBlockOfColorLegacy = (
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

// finds the next block of target color, and crops it off
export const cropOffNextBlockOfColor = ({
  pixelArray,
  targetColor,
  cropToColor,
  reversed,
  direction = "row",
}: CropOptions): { croppedPiece: PixelArray; remainingPiece: PixelArray } => {
  const cropNothing = {
    croppedPiece: [] as PixelArray,
    remainingPiece: pixelArray,
  };
  if (pixelArray.length === 0) return cropNothing;

  const index = getIndexToCropTo({
    pixelArray,
    targetColor,
    cropToColor,
    reversed,
    direction,
  });
  //console.log("Crop to " + index);

  if (index === -1) return cropNothing;
  // crop the piece off;
  let croppedPiece: PixelArray;
  let remainingPiece: PixelArray;
  if (direction === "row") {
    croppedPiece = cropPixelArray(
      pixelArray,
      0,
      0,
      index,
      pixelArray[0].length
    );
    remainingPiece = cropPixelArray(
      pixelArray,
      index,
      0,
      pixelArray.length,
      pixelArray[0].length
    );
  } else {
    croppedPiece = cropPixelArray(pixelArray, 0, 0, pixelArray.length, index);
    remainingPiece = cropPixelArray(
      pixelArray,
      0,
      index,
      pixelArray.length,
      pixelArray[0].length
    );
  }

  const result = {
    croppedPiece: reversed ? remainingPiece : croppedPiece,
    remainingPiece: reversed ? croppedPiece : remainingPiece,
  };
  //console.log(result);

  return result;
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

const cropMultipleTimes = (
  options: Omit<CropOptions, "targetColor"> & { targetColors: ImageColor[] }
) => {
  let croppedArray = options.pixelArray;
  options.targetColors.forEach((targetColor) => {
    croppedArray = cropOffNextBlockOfColor({
      ...options,
      pixelArray: croppedArray,
      targetColor,
    }).remainingPiece;
  });
  return croppedArray;
};

export const cropPixelArrayToBoard = (pixelArray: PixelArray) => {
  if (pixelArray.length === 0) return pixelArray;

  const startTime = new Date().getTime();
  // top
  let croppedArray = cropMultipleTimes({
    pixelArray,
    targetColors: ["white"],
    direction: "row",
  });

  // bottom (this is weird... but it works for both pre-cropped and normal screenshots!)
  try {
    const bottomCroppedArray = cropMultipleTimes({
      pixelArray: croppedArray,
      targetColors: ["gray", "gray", "white"],
      direction: "row",
      reversed: true,
    });

    console.log({ bottomCroppedArray });
    if (bottomCroppedArray.length < bottomCroppedArray[0].length) {
      // ended up with a board that's not tall enough; crop it using just white

      croppedArray = cropMultipleTimes({
        pixelArray: croppedArray,
        targetColors: ["white"],
        direction: "row",
        reversed: true,
      });
    } else {
      croppedArray = bottomCroppedArray;
    }
  } catch (e) {
    console.log("failed to crop bottom using grays; trying just white");
    // if that errors, try cropping just white; it may be a small board.
    croppedArray = cropMultipleTimes({
      pixelArray: croppedArray,
      targetColors: ["white"],
      direction: "row",
      reversed: true,
    });
  }

  // left
  croppedArray = cropMultipleTimes({
    pixelArray: croppedArray,
    targetColors: ["white"],
    direction: "column",
  });

  // right
  croppedArray = cropMultipleTimes({
    pixelArray: croppedArray,
    targetColors: ["white"],
    direction: "column",
    reversed: true,
  });
  console.log({
    cropTime: new Date().getTime() - startTime,
    croppedArray,
    pixelArray,
  });
  return croppedArray;
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
