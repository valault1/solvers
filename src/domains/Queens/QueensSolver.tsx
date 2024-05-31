import { Grid, Stack } from "@mui/material";
import ImageDataDisplay from "components/ImageDataDisplay";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { cropPixelArrayToBoard } from "domains/Queens/helpers/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solveBoard";
import { Board } from "domains/Queens/sharedTypes";
import {
  COLORS_LIST,
  colorArrToString,
  getImageDataFromPixelArray,
  useImageParsing,
} from "domains/Queens/useImageParsing";
import * as React from "react";

const showRawImage = false;
const showCroppedSquares = false;
const showCroppedBoard = false;

const BOARD_SIZE = 30;

export const QueensSolver = () => {
  const { handleUploadClick, rawImage, pixelArray } = useImageParsing();

  const croppedBoardPixelArray = React.useMemo(() => {
    const result = cropPixelArrayToBoard(pixelArray);
    console.log({ croppedBoardPixelArray: result });
    return result;
  }, [pixelArray]);

  const croppedBoardImageData = React.useMemo(() => {
    if (!croppedBoardPixelArray?.length) return undefined;
    return getImageDataFromPixelArray(croppedBoardPixelArray);
  }, [croppedBoardPixelArray]);

  const { croppedImageSquares, board: blankBoard } = React.useMemo(() => {
    return getBlankBoard(croppedBoardPixelArray);
  }, [croppedBoardPixelArray]);

  const board: Board = React.useMemo(() => {
    return solveBoard(blankBoard);
  }, [blankBoard]);

  const BoardComponent = React.useMemo(() => {
    return (
      <Stack direction="row">
        {board.map((row, i) => (
          <Stack key={i} direction="column">
            {row.map(({ token, color: colorName }, j) => (
              <div
                key={j}
                style={{
                  width: BOARD_SIZE,
                  height: BOARD_SIZE,
                  backgroundColor: `rgba(${colorArrToString(
                    COLORS_LIST[colorName]
                  )})`,
                  color: "black",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {token}
              </div>
            ))}
          </Stack>
        ))}
      </Stack>
    );
  }, [board]);

  return (
    <MainContainer>
      {showRawImage && (
        <Grid item>
          <img width="100%" src={rawImage} alt="" />
        </Grid>
      )}
      <ImageUpload handleUploadClick={handleUploadClick} />
      {showCroppedBoard && (
        <ImageDataDisplay imageData={croppedBoardImageData} />
      )}
      <br />
      <br />
      {BoardComponent}
      {/** raw sliced tiles, for debugging */}
      {showCroppedSquares && (
        <Stack direction="row" gap={4}>
          {croppedImageSquares.map((row, i) => (
            <Stack key={i} direction="column" gap={4}>
              {row.map((pixelArray, j) => (
                <ImageDataDisplay
                  imageData={getImageDataFromPixelArray(pixelArray)}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </MainContainer>
  );
};
