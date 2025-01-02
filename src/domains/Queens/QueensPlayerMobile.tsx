import { Box, Stack } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { useNavigateBoards } from "domains/Queens/hooks/useNavigateBoards";
import { getSeeds } from "domains/Queens/boards/seeds";
import { Helmet } from "react-helmet";
import * as React from "react";
import { WinTime } from "domains/Queens/components/Time";
import {
  TimeStorageObject,
  boardToTokens,
  getHasFinishedAllBoards,
  getStorageTimeObject,
  saveBoardProgress,
} from "domains/Queens/helpers/localStorageHelper";
import { Board } from "domains/Queens/sharedTypes";
import { generateBoardFromSeedStatic } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import {
  checkForVictory,
  solveBoardSync,
} from "domains/Queens/helpers/solver/solveBoard";
import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
import { LevelNavigation } from "domains/Queens/LevelNavigation";
import { TimerDisplay } from "domains/Queens/components/TimerDisplay";
import { FinishedAllBoards } from "domains/Queens/components/FinishedAllBoards";

const DEFAULT_SEED_INDEX = 0;
export const DEFAULT_SIDE_LENGTH = 8;
const INITIAL_BOARD = generateBoardFromSeedStatic(
  DEFAULT_SIDE_LENGTH,
  getSeeds(DEFAULT_SIDE_LENGTH)[DEFAULT_SEED_INDEX]
);

export const QueensPlayerMobile = () => {
  const [board, setBoard] = React.useState<Board>(INITIAL_BOARD);

  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [hasWon, setHasWon] = React.useState(false);
  const [timeTaken, setTimeTaken] = React.useState(0);

  const {
    prevBoard,
    disablePrev,
    nextBoard,
    disableNext,
    currentBoardIndex,
    maxBoardIndex,
    boardSize,
    setBoardSize,
  } = useNavigateBoards();

  const hasFinishedAllBoards = React.useMemo(
    () => {
      return getHasFinishedAllBoards({ boardSize });
    },
    // keep all these dependencies - we need to recalculate if currentBoardIndex or hasWon changed
    [boardSize, currentBoardIndex, hasWon]
  );

  const saveBoard = React.useCallback(
    (board: Board) => {
      const didWin = checkForVictory(board);
      saveBoardProgress({
        newTimeStorageObject: {
          time: new Date().getTime() - startTime,
          isFinished: didWin,
          boardState: didWin ? undefined : boardToTokens(board),
        },
        boardSize: boardSize,
        seedIndex: currentBoardIndex,
      });
    },
    [currentBoardIndex, boardSize, startTime]
  );

  const onWin = React.useCallback(
    (board: Board) => {
      const timeTaken = new Date().getTime() - startTime;
      setHasWon(true);
      saveBoard(board);

      setTimeTaken(timeTaken);
    },
    [setHasWon, startTime, saveBoard]
  );

  React.useEffect(() => {
    const seeds = getSeeds(boardSize);
    const newBoard = generateBoardFromSeedStatic(
      boardSize,
      seeds[currentBoardIndex]
    );
    const { isFinished, time }: TimeStorageObject = getStorageTimeObject({
      boardSize: boardSize,
      seedIndex: currentBoardIndex,
    });

    if (isFinished) {
      solveBoardSync(newBoard);
      setHasWon(true);
      setTimeTaken(time);
    } else {
      setStartTime(new Date().getTime());
      setHasWon(false);
    }

    setBoard(newBoard);
  }, [currentBoardIndex, boardSize]);

  React.useEffect(() => {
    // this disables the double tapping. However, it also breaks other taps...
    // const eventParams = { passive: false };
    // function ignore(e: any) {
    //   e.preventDefault();
    // }
    // document.body.addEventListener("touchcancel", ignore, eventParams);
    // document.body.addEventListener("touchend", ignore, eventParams);

    return () => {
      // this is where I would put cleanup
      // However, no matter what I did to try and undo these changes above,
      // I couldn't get it to undo these changes.
      // So there's just a bug where:
      // if you load a queens page, then move to another solvers page,
      // you can't scroll or highlight anything
    };
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <style>
          {/* reference: https://stackoverflow.com/questions/62508815/how-would-you-style-the-body-of-multiple-pages-in-a-reactjs-app-without-having */}
          {`
            body {
              overflow: hidden;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-text-size-adjust: none;             /* prevent webkit from resizing text to fit */
              touch-action: manipulation;
            }
          `}
        </style>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
      </Helmet>
      <MainContainer
        gap="24px"
        style={{
          width: "100vw",
          // height: `calc(100vh-${NAVBAR_HEIGHT_MOBILE})`,
          //backgroundColor: "lightblue", // Optional: Just to see the div
        }}
      >
        <Stack width="100%" display="flex" alignItems="center">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="95%"
          >
            <Box
              flex={1}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <b>Queens</b>
            </Box>
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {!hasWon ? (
                <TimerDisplay startTime={startTime} />
              ) : (
                <WinTime timeTaken={timeTaken} />
              )}
            </Box>

            <Box
              flex={1}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
            </Box>
          </Stack>
        </Stack>
        {hasFinishedAllBoards ? (
          <FinishedAllBoards boardSize={boardSize} />
        ) : (
          <>
            <PlayableBoard
              initialBoard={board}
              onWin={onWin}
              hasWon={hasWon}
              showActionsOnTop
            />
            <LevelNavigation
              prevBoard={prevBoard}
              disablePrev={disablePrev}
              nextBoard={nextBoard}
              disableNext={disableNext}
              currentBoardIndex={currentBoardIndex}
              maxBoardIndex={maxBoardIndex}
              boardSize={boardSize}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};
