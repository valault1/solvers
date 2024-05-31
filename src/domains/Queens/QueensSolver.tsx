import { Error } from "@mui/icons-material";
import { Alert, Card, Grid, Stack } from "@mui/material";
import ImageDataDisplay from "components/ImageDataDisplay";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";

import { cropPixelArrayToBoard } from "domains/Queens/helpers/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solveBoard";
import {
  getImageDataFromPixelArray,
  useImageParsing,
} from "domains/Queens/hooks/useImageParsing";
import { Board } from "domains/Queens/sharedTypes";

import * as React from "react";

const showRawImage = false;
const showCroppedSquares = false;
const showCroppedBoard = false;

const ERRORS = {
  PARSING_BOARD: "Error parsing the board",
  CROPPING_BOARD: "Error cropping the board.",
  SOLVING_BOARD: "Error solving the board",
};

export const QueensSolver = () => {
  const [error, setError] = React.useState<string | undefined>("TEST");
  const { handleUploadClick, rawImage, pixelArray, imageUploadTime } =
    useImageParsing({ clearError: () => setError(undefined) });

  const croppedBoardPixelArray = React.useMemo(() => {
    try {
      return cropPixelArrayToBoard(pixelArray);
    } catch (e) {
      setError(ERRORS.CROPPING_BOARD);
    }
    return [];
  }, [pixelArray]);

  // the cropped board image data, to display the cropped board (if showCroppedBoard is true)
  const croppedBoardImageData = React.useMemo(() => {
    return showCroppedBoard || !!error
      ? getImageDataFromPixelArray(croppedBoardPixelArray)
      : undefined;
  }, [croppedBoardPixelArray, error]);

  const { croppedImageSquares, board: blankBoard } = React.useMemo(() => {
    try {
      console.log({ croppedBoardPixelArray });
      return getBlankBoard(croppedBoardPixelArray);
    } catch (e) {
      setError(ERRORS.PARSING_BOARD);
    }
    return { board: [], croppedImageSquares: [] };
  }, [croppedBoardPixelArray]);

  const blankBoardToDisplay: Board = React.useMemo(() => {
    return blankBoard.map((row) => row.map((color) => ({ token: "", color })));
  }, [blankBoard]);

  console.log({ error });

  const solvedBoard = React.useMemo(() => {
    try {
      return solveBoard(blankBoard);
    } catch (e) {
      console.log(e);
      setError(ERRORS.SOLVING_BOARD);
    }
    return [];
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
        //This bottom padding stops mobile from cutting off right below the text
        paddingBottom={40}
      >
        <BoardDisplay board={solvedBoard} />
        {showTime && <>Solved in {timeSinceImageUpload / 1000} s</>}
      </Stack>
    );
  }, [solvedBoard, imageUploadTime]);

  console.log({ croppedBoardImageData, croppedBoardPixelArray });

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
      {error && (
        <Alert color="error" variant="outlined" icon={<Error />}>
          {error}
        </Alert>
      )}
      {(showCroppedBoard || !!error) && croppedBoardImageData && (
        <>
          <Alert color="warning" variant="outlined">
            For debugging purposes, here is the board that we cropped.
          </Alert>
          <ImageDataDisplay imageData={croppedBoardImageData} />
        </>
      )}

      {BoardComponent}
      {/** raw sliced tiles, for debugging */}
      {(!!error || showCroppedSquares) && croppedImageSquares.length && (
        <>
          <Alert variant="outlined" color="warning">
            For debugging purposes, here are the squares we broke the board into
          </Alert>
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
        </>
      )}
      {!!error && blankBoardToDisplay.length && (
        <>
          <Alert variant="outlined" color="warning">
            For debugging purposes, here is the board that we parsed
          </Alert>
          <BoardDisplay board={blankBoardToDisplay} />
        </>
      )}
    </MainContainer>
  );
};
