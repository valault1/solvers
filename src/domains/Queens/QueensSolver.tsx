import { Grid, Stack } from "@mui/material";
import ImageDataDisplay from "components/ImageDataDisplay";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { solveBoard } from "domains/Queens/helpers/solveBoard";
import { MOCK_BLANK_BOARD } from "domains/Queens/mocks/mocks";
import {
  COLORS_LIST,
  colorArrToString,
  getImageDataFromPixelArray,
  useImageParsing,
} from "domains/Queens/useImageParsing";
import { useParseBoard } from "domains/Queens/useParseBoard";
import * as React from "react";

const showRawImage = false;
const showCroppedSquares = false;
const showCroppedBoard = false;

const BOARD_SIZE = 30;

export const QueensSolver = () => {
  const {
    handleUploadClick,
    rawImage,
    modifiedImageData,
    pixelArray,

    updateImage,
  } = useImageParsing();

  const { board: blankBoard, croppedImageSquares } = useParseBoard({
    pixelArray,
    updateImage,
  });

  const board = React.useMemo(() => {
    return solveBoard(blankBoard);
  }, [blankBoard]);

  return (
    <MainContainer>
      {showRawImage && (
        <Grid item>
          <img width="100%" src={rawImage} alt="" />
        </Grid>
      )}
      <ImageUpload handleUploadClick={handleUploadClick} />
      {showCroppedBoard && <ImageDataDisplay imageData={modifiedImageData} />}
      <br />
      <br />
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
