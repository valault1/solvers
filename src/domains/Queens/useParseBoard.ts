import { cropPixelArrayToBoard } from "domains/Queens/helpers/cropBoard";
import { cropPixelArrayToBoardV2 } from "domains/Queens/helpers/cropBoardV2";
import { getBlankBoard } from "domains/Queens/helpers/parseBoard";
import { BlankBoard, Board, PixelArray } from "domains/Queens/sharedTypes";
import { BOARD_COLORS } from "domains/Queens/useImageParsing";

import * as React from "react";

//

export const useParseBoard = ({
  pixelArray,
  updateImage,
}: {
  pixelArray: PixelArray;
  updateImage: (newPixelArray: PixelArray) => void;
}) => {
  const [board, setBoard] = React.useState<BlankBoard>([]);
  // croppedImageSquares are just for debugging
  const [croppedImageSquares, setCroppedImageSquares] = React.useState(
    [] as PixelArray[][]
  );

  // whenever the pixelArray changes, crop the image to the board
  React.useEffect(() => {
    const croppedPixelArray: PixelArray = cropPixelArrayToBoardV2(pixelArray); //cropPixelArrayToBoard(pixelArray);
    const { board: newBoard, croppedImageSquares: newCroppedImageSquares } =
      getBlankBoard(croppedPixelArray);

    setBoard(newBoard);
    setCroppedImageSquares(newCroppedImageSquares);
    updateImage(croppedPixelArray);
  }, [pixelArray, updateImage]);

  return { board, croppedImageSquares };
};
