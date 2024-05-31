import { Card, Grid, Stack } from "@mui/material";
import ImageDataDisplay from "components/ImageDataDisplay";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { cropPixelArrayToBoard } from "domains/Queens/helpers/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solveBoard";
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
  const { handleUploadClick, rawImage, pixelArray, imageUploadTime } =
    useImageParsing();

  const croppedBoardPixelArray = React.useMemo(() => {
    return cropPixelArrayToBoard(pixelArray);
  }, [pixelArray]);

  // the cropped board image data, to display the cropped board (if showCroppedBoard is true)
  const croppedBoardImageData = React.useMemo(() => {
    return showCroppedBoard
      ? getImageDataFromPixelArray(croppedBoardPixelArray)
      : undefined;
  }, [croppedBoardPixelArray]);

  const { croppedImageSquares, board: blankBoard } = React.useMemo(() => {
    return getBlankBoard(croppedBoardPixelArray);
  }, [croppedBoardPixelArray]);

  const solvedBoard = React.useMemo(() => {
    return solveBoard(blankBoard);
  }, [blankBoard]);

  const BoardComponent = React.useMemo(() => {
    const timeSinceImageUpload = new Date().getTime() - imageUploadTime;

    const showTime = solvedBoard.length > 0;
    return (
      <Stack
        direction="column"
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row">
          {solvedBoard.map((row, i) => (
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
        {showTime && <>Solved in {timeSinceImageUpload / 1000} s</>}
      </Stack>
    );
  }, [solvedBoard, imageUploadTime]);

  return (
    <MainContainer gap="24px">
      <h1>Queens Solver</h1>
      {showRawImage && (
        <Grid item>
          <img width="100%" src={rawImage} alt="" />
        </Grid>
      )}
      <Card style={{ padding: "20px", maxWidth: "350px" }}>
        <Stack justifyContent={"center"} alignItems={"center"} gap="12px">
          <b>
            <u>Instructions</u>
          </b>
          <div>
            1. Take a screenshot of today's Queens board. (Don't worry about
            cropping it - just upload the whole screenshot!)
          </div>
          <div>
            2. Upload the screenshot, and our solver will process the image and
            display a solved board.
          </div>
          <div>
            3. Put in the solution, and look like a genius with your lightning
            fast time!
          </div>
        </Stack>
      </Card>

      <ImageUpload handleUploadClick={handleUploadClick} />
      {showCroppedBoard && (
        <ImageDataDisplay imageData={croppedBoardImageData} />
      )}

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
