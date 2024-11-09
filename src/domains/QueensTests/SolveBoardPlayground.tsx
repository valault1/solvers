import {
  MOCK_BLANK_BOARD,
  MOCK_BLANK_BOARD_2,
} from "domains/Queens/mocks/mocks";
import React from "react";
import { Card, Stack } from "@mui/material";
import {
  copyBoard,
  createBoardFromBlankBoard,
  eliminateSquares,
  markGuaranteedPlacements,
  narrowDownBoard,
  populateColorCounts,
} from "domains/Queens/helpers/solver/solveBoard";
import { BoardDisplay } from "domains/Queens/components/BoardDisplay";
import { PrimaryButton } from "components/Form.elements";
import {
  BLANK_TEST_RESULTS,
  TestResults,
  testScreenshotFromUrl,
} from "domains/Queens/tests/testScreenshots";
import { MOCK_SCREENSHOTS } from "domains/Queens/mocks/mockScreenshots";

import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import ImageDataDisplay from "components/ImageDataDisplay";
import { getImageDataFromPixelArray } from "domains/Queens/hooks/useImageParsing";

const EMPTY_BOARD = createBoardFromBlankBoard(MOCK_BLANK_BOARD_2);
const SCREENSHOT = MOCK_SCREENSHOTS[0];

const SolveBoardPlayground = () => {
  const [board, setBoard] = React.useState(EMPTY_BOARD);
  const [testResults, setTestResults] =
    React.useState<TestResults>(BLANK_TEST_RESULTS);
  console.log({ testResults });
  const { /*posterizedPixelArray,*/ croppedBoard, blankBoard, solvedBoard } =
    testResults;
  const blankBoardToDisplay = React.useMemo(() => {
    return blankBoard?.map((row: any) =>
      row.map((color: any) => ({ token: "", color }))
    );
  }, [blankBoard]);

  // the cropped board image data, to display the cropped board (if showCroppedBoard is true)
  const croppedBoardImageData = React.useMemo(() => {
    return getImageDataFromPixelArray(croppedBoard);
  }, [croppedBoard]);

  React.useEffect(() => {
    populateColorCounts(MOCK_BLANK_BOARD);
  }, []);
  const runPlaceQueens = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      markGuaranteedPlacements(newBoard);
      return newBoard;
    });
  };

  const runEliminateSquares = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      eliminateSquares(newBoard);
      console.log({ newBoard });
      return newBoard;
    });
  };

  const runNarrowDownBoard = () => {
    setBoard((prev) => {
      const newBoard = copyBoard(prev);
      narrowDownBoard(newBoard);

      return newBoard;
    });
  };

  return (
    <Stack direction="column" gap="12px">
      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        <Stack justifyContent="center" alignItems="center" gap="12px">
          <b>
            <u>Board Playground</u>
          </b>
          <BoardDisplay board={board} />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Stack direction="column" gap={2}>
              <Stack direction="row" gap={2}>
                <PrimaryButton onClick={runPlaceQueens}>
                  Place Queens
                </PrimaryButton>
                <PrimaryButton onClick={runEliminateSquares}>
                  Eliminate Squares
                </PrimaryButton>
                <PrimaryButton onClick={runNarrowDownBoard}>
                  Narrow down board
                </PrimaryButton>
              </Stack>

              <PrimaryButton onClick={() => setBoard(EMPTY_BOARD)}>
                Clear Board
              </PrimaryButton>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <PrimaryButton
            onClick={() =>
              testScreenshotFromUrl(SCREENSHOT.url).then((res) =>
                setTestResults(res)
              )
            }
          >
            test a screenshot
          </PrimaryButton>
          <img src={SCREENSHOT.url} alt="" width={"70%"} />
          {!!croppedBoardImageData && (
            <>
              <ImageDataDisplay
                imageData={croppedBoardImageData}
                scale={0.25}
              />
            </>
          )}

          {!!blankBoard.length && (
            <>
              <div>Blank board</div>
              <BoardDisplay board={blankBoardToDisplay} />
            </>
          )}
          {!!solvedBoard.length && (
            <>
              <div>solved board</div>
              <BoardDisplay board={solvedBoard} />
            </>
          )}
        </Stack>
      </Card>
    </Stack>
  );
};

export default SolveBoardPlayground;
