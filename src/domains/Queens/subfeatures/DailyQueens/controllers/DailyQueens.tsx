import { CopyAll, Share } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";

import {
  getDailyBoard,
  getDailyBoardProgress,
  getDayIndex,
} from "domains/Queens/boards/dailyBoards";
import { TimedBoard } from "domains/Queens/components/TimedBoard";
import { millisecondsToTimeFormat } from "domains/Queens/components/TimerDisplay";
import { saveDailyBoardProgress } from "domains/Queens/helpers/localStorageHelper";
import { getStarPositions } from "domains/Queens/helpers/solver/solveBoard";
import useWindowDimensions from "domains/Queens/hooks/useWindowDimensions";
import { QUEENS_MOBILE_WIDTH_THRESHOLD } from "domains/Queens/QueensPlayerPage";

import { Board } from "domains/Queens/sharedTypes";
import { DailyQueensDialog } from "domains/Queens/subfeatures/DailyQueens/controllers/DailyQueensDialog";

import * as React from "react";
import { Helmet } from "react-helmet";

const GAME_NAME = "Queens";
const SHARE_URL = `valault.com`;

// load this now, just in case they continue playing after midnight
const dayIndex = getDayIndex();
const DAILY_BOARD = getDailyBoard();
console.log({ DAILY_BOARD });

export const DailyQueens = () => {
  const initialTimeTaken = React.useMemo(() => {
    const progress = getDailyBoardProgress();
    return progress.isFinished ? progress.time : undefined;
  }, []);

  const [timeTaken, setTimeTaken] = React.useState(initialTimeTaken);
  const onWin = React.useCallback(
    (timeTaken: number) => {
      setTimeTaken(timeTaken);
    },
    [setTimeTaken]
  );

  // const onWin = React.useCallback((timeTaken: number) => {}, []);

  const browserSupportsSharing = !!navigator.share;

  const DAILY_BOARD = React.useMemo(() => getDailyBoard(), []);

  const saveBoard = React.useCallback(
    ({ board, timeTaken }: { board: Board; timeTaken: number }) => {
      saveDailyBoardProgress({
        newTimeStorageObject: {
          time: timeTaken,
          starPositions: getStarPositions(board),
          isFinished: true,
        },
        dayIndex,
      });
    },
    []
  );

  const textToShare = `${GAME_NAME} #${
    dayIndex + 1
  }\n${millisecondsToTimeFormat(timeTaken)}\n${SHARE_URL}`;

  const handleShare = async () => {
    if (browserSupportsSharing) {
      try {
        await navigator.share({
          title: "Beat my time on queens!",
          text: textToShare,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser");
      // If they can't share, let's just copy the text to the clipboard
      navigator.clipboard.writeText(textToShare);
      console.log("Text copied to clipboard");
    }
  };

  const { width } = useWindowDimensions();
  const isMobile = width < QUEENS_MOBILE_WIDTH_THRESHOLD;

  return (
    <>
      {isMobile && (
        <Helmet>
          <style>
            {/* reference: https://stackoverflow.com/questions/62508815/how-would-you-style-the-body-of-multiple-pages-in-a-reactjs-app-without-having */}
            {`
            body {
              overflow: hidden;
              user-select: none;
              -webkit-user-select: none;
            }
          `}
          </style>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          ></meta>
        </Helmet>
      )}
      <MainContainer gap="24px">
        <DailyQueensDialog />
        Daily Queens #{dayIndex + 1}
        <Stack
          direction="row"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          {!!timeTaken && (
            <Stack direction="row" alignItems="center" gap={1}>
              Share your time!
              {browserSupportsSharing ? (
                <Share style={{ cursor: "pointer" }} onClick={handleShare} />
              ) : (
                <CopyAll style={{ cursor: "pointer" }} onClick={handleShare} />
              )}
            </Stack>
          )}
        </Stack>
        <TimedBoard
          initialBoard={DAILY_BOARD}
          finishTime={timeTaken}
          saveBoard={saveBoard}
          onWin={onWin}
        />
      </MainContainer>
    </>
  );
};
