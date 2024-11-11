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

import { Board } from "domains/Queens/sharedTypes";
import { DailyHodokuDialog } from "domains/Queens/subfeatures/DailyHodoku/controllers/DailyHodokuDialog";

import * as React from "react";

const GAME_NAME = "Hodoku";
const SHARE_URL = `valault.com`;

// load this now, just in case they continue playing after midnight
const dayIndex = getDayIndex();
const DAILY_BOARD = getDailyBoard();

export const DailyHodoku = () => {
  const timeTaken = 0;
  const initialTimeTaken = React.useMemo(() => {
    const progress = getDailyBoardProgress();
    return progress.isFinished ? progress.time : undefined;
  }, []);

  const onWin = React.useCallback((timeTaken: number) => {}, []);

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

  return (
    <MainContainer gap="24px">
      <DailyHodokuDialog />
      Daily Queens #{dayIndex + 1}
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        {timeTaken && (
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
  );
};
