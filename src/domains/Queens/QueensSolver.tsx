import { CircularProgress, Grid, Stack, Switch } from "@mui/material";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";
import Instructions from "domains/Queens/components/Instructions";
import SolveBoardPlayground from "domains/Queens/components/SolveBoardPlayground";
import StepsDisplay, { Step } from "domains/Queens/components/StepsDisplay";
import { CONSTANT_BLANK_ARRAY } from "domains/Queens/constants/constants";

import { cropPixelArrayToBoard } from "domains/Queens/helpers/solver/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/solver/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solver/solveBoard";
import { useImageParsing } from "domains/Queens/hooks/useImageParsing";
import { useMemoNonBlocking } from "domains/Queens/hooks/useMemoNonBlocking";

import { Board } from "domains/Queens/sharedTypes";

import * as React from "react";

const showRawImage = false;
const startOnPlayground = false;

export const QueensSolver = () => {
  const [showBoardPlayground, setShowBoardPlayground] =
    React.useState(startOnPlayground);

  const {
    handleUploadClick,
    rawImage,
    processedPixelArray,
    imageUploadTime,
    processedPixelArrayError,
    processedPixelArrayTime,
    isLoadingProcessedPixelArray,
  } = useImageParsing();

  const croppedBoardCallback = React.useCallback(
    async () => await cropPixelArrayToBoard(processedPixelArray),
    [processedPixelArray]
  );
  const {
    data: croppedBoardPixelArray,
    error: croppedBoardError,
    loading: isLoadingCroppedBoard,
    runDuration: croppedBoardTime,
  } = useMemoNonBlocking({
    callback: croppedBoardCallback,
    initialDataValue: CONSTANT_BLANK_ARRAY,
  });

  // the cropped board image data, to display the cropped board (if showCroppedBoard is true)
  // const croppedBoardImageData = React.useMemo(() => {
  //   return getImageDataFromPixelArray(croppedBoardPixelArray);
  // }, [croppedBoardPixelArray]);

  const parseBoardCallback = React.useCallback(
    async () => await getBlankBoard(croppedBoardPixelArray),
    [croppedBoardPixelArray]
  );
  const {
    data: blankBoard,
    loading: isLoadingParseBoard,
    error: parseBoardError,
    runDuration: parseBoardTime,
  } = useMemoNonBlocking({
    callback: parseBoardCallback,
    initialDataValue: CONSTANT_BLANK_ARRAY,
  });

  const blankBoardToDisplay: Board = React.useMemo(() => {
    return blankBoard?.map((row: any) =>
      row.map((color: any) => ({ token: "", color }))
    );
  }, [blankBoard]);

  const computeSolvedBoard = React.useCallback(async () => {
    if (!blankBoard?.length) return CONSTANT_BLANK_ARRAY;
    return await solveBoard(blankBoard);
  }, [blankBoard]);

  const {
    data: solvedBoard,
    error: solveBoardError,
    loading: isSolvingBoard,
    runDuration: solvedBoardTime,
  } = useMemoNonBlocking({
    callback: computeSolvedBoard,
    initialDataValue: CONSTANT_BLANK_ARRAY,
    identifier: "solveBoard",
  });

  const BoardComponent = React.useMemo(() => {
    if (isSolvingBoard)
      return (
        <div>
          Solving Board...
          <CircularProgress />
        </div>
      );
    if (!solvedBoard?.length) return null;
    const timeSinceImageUpload = new Date().getTime() - imageUploadTime;

    const showTime = solvedBoard?.length > 0;
    return (
      <Stack
        direction="column"
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        <BoardDisplay board={solvedBoard} />
        {showTime && <>Total time: {timeSinceImageUpload / 1000} s</>}
      </Stack>
    );
  }, [solvedBoard, imageUploadTime, isSolvingBoard]);

  const steps: Step[] = React.useMemo(() => {
    return [
      {
        title: "Process image",
        description:
          "After you upload a screenshot, there are a lot of variations of color. To simplify processing, we posterize it to just 12 color values: 10 for the board colors, black for the border, and white for the background.",
        time: processedPixelArrayTime,
        error: processedPixelArrayError,
        isLoading: isLoadingProcessedPixelArray,
        isFinished: !!processedPixelArray?.length,
      },
      {
        title: "Crop image to board",
        description: "Next, we crop the image to just the board.",
        time: croppedBoardTime,
        error: croppedBoardError,
        isLoading: isLoadingCroppedBoard,
        isFinished: !!croppedBoardPixelArray?.length,
      },
      {
        title: "Parse the board into a format we want",
        description:
          "Then, we parse the board into a data structure that is easy to work with. In this case, we just make a 2 dimensional array of objects that show the color and the state of each square on the board.",
        time: parseBoardTime,
        error: parseBoardError,
        isLoading: isLoadingParseBoard,
        isFinished: !!blankBoard?.length,
        finishedContent: <BoardDisplay board={blankBoardToDisplay} />,
      },
      {
        title: "Solve Board",
        description:
          "Finally, we solve the board. The current algorithm is just to guess every step and see if it works; if it doesn't, go back and try again!",
        time: solvedBoardTime,
        error: solveBoardError,
        isLoading: isSolvingBoard,
        isFinished: !!solvedBoard?.length,
      },
    ];
  }, [
    processedPixelArrayTime,
    processedPixelArrayError,
    isLoadingProcessedPixelArray,
    processedPixelArray?.length,
    croppedBoardTime,
    croppedBoardError,
    isLoadingCroppedBoard,
    croppedBoardPixelArray?.length,
    parseBoardTime,
    parseBoardError,
    isLoadingParseBoard,
    blankBoard?.length,
    solvedBoardTime,
    solveBoardError,
    isSolvingBoard,
    solvedBoard?.length,
    blankBoardToDisplay,
  ]);

  console.log({ showBoardPlayground });

  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Queens Solver</h1>
      {startOnPlayground && (
        <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
          <Switch
            value={showBoardPlayground}
            defaultChecked={startOnPlayground}
            onChange={() => {
              setShowBoardPlayground((prev) => !prev);
            }}
          />
          Show playground
        </Stack>
      )}
      {showBoardPlayground ? (
        <SolveBoardPlayground />
      ) : (
        <>
          {showRawImage && (
            <Grid item>
              <img width="100%" src={rawImage} alt="" />
            </Grid>
          )}
          <Instructions />

          <ImageUpload handleUploadClick={handleUploadClick} />
          <StepsDisplay steps={steps} />
          {BoardComponent}
        </>
      )}
    </MainContainer>
  );
};
