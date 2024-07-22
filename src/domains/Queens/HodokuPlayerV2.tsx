import { Card, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";
import { PlayableBoard } from "domains/Queens/components/PlayableBoard";
import {
  BOARD_SIZE_PARAM,
  useNavigateBoards,
} from "domains/Queens/hooks/useNavigateBoards";
import { getSeeds } from "domains/Queens/boards/seeds";

import * as React from "react";
import { TimerDisplay } from "domains/Queens/components/TimerDisplay";
import { WinTime } from "domains/Queens/components/Time";
import {
  TimeStorageObject,
  boardToTokens,
  getStorageTimeObject,
  saveBoardProgress,
} from "domains/Queens/helpers/localStorageHelper";
import { Board } from "domains/Queens/sharedTypes";
import {
  addBordersToBoard,
  generateBoardFromSeedStatic,
} from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import {
  checkForVictory,
  getStarPositions,
  placeQueen,
} from "domains/Queens/helpers/solver/solveBoard";
import { BoardSizeSelect } from "domains/Queens/components/BoardSizeSelect";
import { useNavigate } from "react-router-dom";
import { PATHS } from "shared/helpers/paths";

const DEFAULT_SEED_INDEX = 0;
export const DEFAULT_SIDE_LENGTH = 8;
const INITIAL_BOARD = generateBoardFromSeedStatic(
  DEFAULT_SIDE_LENGTH,
  getSeeds(DEFAULT_SIDE_LENGTH)[DEFAULT_SEED_INDEX]
);

export const HodokuPlayerV2 = () => {
  const navigate = useNavigate();

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

  const saveBoard = React.useCallback(
    (board: Board) => {
      const didWin = checkForVictory(board);
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
      setStartTime(new Date().getTime());
      setHasWon(false);
    }

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
      {/* <LevelsProgress boardSize={boardSize} width={INSTRUCTIONS_WIDTH} /> */}
      <BoardSizeSelect onChange={setBoardSize} value={boardSize} />
      {!hasWon ? (
        <TimerDisplay startTime={startTime} />
      ) : (
        <WinTime timeTaken={timeTaken} />
      )}
      {/* <PlayableBoard initialBoard={board} onWin={onWin} hasWon={hasWon} /> */}
      <Stack gap={2} direction="row">
        <PrimaryButton fullWidth onClick={prevBoard} disabled={disablePrev}>
          Previous board
        </PrimaryButton>
        <PrimaryButton fullWidth onClick={nextBoard} disabled={disableNext}>
          Next board
        </PrimaryButton>
      </Stack>
      board {currentBoardIndex + 1} of {maxBoardIndex}
      <PrimaryButton
        variant="text"
        onClick={() =>
          navigate(`${PATHS.levelSelect}?${BOARD_SIZE_PARAM}=${boardSize}`)
        }
      >
        Select level
      </PrimaryButton>
      {false && (
        <PrimaryButton
          variant="text"
          onClick={() => navigate(`${PATHS.multiplayerHodoku}`)}
        >
          Multiplayer
        </PrimaryButton>
      )}
    </MainContainer>
  );
};
