import { Card, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import { useNavigateBoards } from "domains/Queens/hooks/useNavigateBoards";
import { SIDE_LENGTH_OPTIONS, getSeeds } from "domains/Queens/boards/seeds";

import * as React from "react";
import { Timer } from "domains/Queens/components/Timer";
import { WinTime } from "domains/Queens/components/Time";
import {
  TimeStorageObject,
  boardToTokens,
  getStarPositions,
  getStorageTimeObject,
  saveBoardProgress,
} from "domains/Queens/helpers/localStorageHelper";
import { Board } from "domains/Queens/sharedTypes";
import {
  addBordersToBoard,
  generateBoardFromSeed,
} from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { placeQueen } from "domains/Queens/helpers/solver/solveBoard";
import { PATHS } from "AppRoutes";
import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LevelsProgress } from "domains/Queens/components/LevelsProgress";
import { generateBoardFromSeedV2 } from "domains/Queens/helpers/boardGenerators/generateNewBoardV2-static";

const DEFAULT_SEED_INDEX = 0;
export const DEFAULT_SIDE_LENGTH = 8;
const INITIAL_BOARD = generateBoardFromSeedV2(
  DEFAULT_SIDE_LENGTH,
  getSeeds(DEFAULT_SIDE_LENGTH)[DEFAULT_SEED_INDEX]
);

export const SEED_INDEX_PARAM = "seedIndex";
export const BOARD_SIZE_PARAM = "boardSize";

export const QueensPlayer = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const startingBoardSize =
    parseInt(searchParams.get(BOARD_SIZE_PARAM)) || undefined;
  const [board, setBoard] = React.useState<Board>(INITIAL_BOARD);
  const [boardSize, setBoardSize] = React.useState(
    startingBoardSize || SIDE_LENGTH_OPTIONS[0]
  );
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
  } = useNavigateBoards({ sideLength: boardSize });

  React.useEffect(() => {
    setSearchParams({
      [BOARD_SIZE_PARAM]: boardSize.toString(),
      [SEED_INDEX_PARAM]: currentBoardIndex.toString(),
    });
  }, [boardSize, currentBoardIndex, setSearchParams]);

  const saveBoard = React.useCallback(
    ({ board, didWin }: { board: Board; didWin: boolean }) => {
      saveBoardProgress({
        newTimeStorageObject: {
          time: new Date().getTime() - startTime,
          isFinished: didWin,
          boardState: didWin ? undefined : boardToTokens(board),
          starPositions: didWin ? getStarPositions(board) : undefined,
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

      setTimeTaken(timeTaken);
    },
    [setHasWon, startTime]
  );

  React.useEffect(() => {
    const seeds = getSeeds(boardSize);
    const newBoard = generateBoardFromSeedV2(
      boardSize,
      seeds[currentBoardIndex]
    );
    const { isFinished, time, starPositions }: TimeStorageObject =
      getStorageTimeObject({
        boardSize: boardSize,
        seedIndex: currentBoardIndex,
      });

    if (isFinished) {
      starPositions?.forEach(({ row, col }) => placeQueen(newBoard, row, col));
      setHasWon(true);
      setTimeTaken(time);
    } else {
      console.log("resetting time");
      setStartTime(new Date().getTime());
      setHasWon(false);
    }

    addBordersToBoard(newBoard);
    console.log("ADDED BORDERS");
    console.log({ newBoard });
    setBoard(newBoard);
  }, [currentBoardIndex, boardSize]);

  return (
    <MainContainer
      gap="24px"
      //This bottom padding stops mobile from cutting off right below the text
      paddingBottom={40}
    >
      <h1>Play Queens!</h1>
      <Card
        style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
      >
        These boards are procedurally generated. They are guaranteed to be
        solvable without guessing!
      </Card>
      <LevelsProgress boardSize={boardSize} width={INSTRUCTIONS_WIDTH} />
      <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
      {!hasWon ? (
        <Timer startTime={startTime} />
      ) : (
        <WinTime timeTaken={timeTaken} />
      )}
      <PlayableBoard
        initialBoard={board}
        onWin={onWin}
        saveBoard={saveBoard}
        hasWon={hasWon}
      />
      <Stack gap={2} direction="row">
        <PrimaryButton fullWidth onClick={prevBoard} disabled={disablePrev}>
          Previous board
        </PrimaryButton>
        <PrimaryButton fullWidth onClick={nextBoard} disabled={disableNext}>
          Next board
        </PrimaryButton>
      </Stack>
      board {currentBoardIndex + 1} of {maxBoardIndex}
      {true && (
        <PrimaryButton
          variant="text"
          onClick={() => navigate(PATHS.levelSelect, { replace: false })}
        >
          Select level
        </PrimaryButton>
      )}
    </MainContainer>
  );
};
