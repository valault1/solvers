// this migration was for the first time we changed the seed arrays.

import { SIDE_LENGTH_OPTIONS, getSeeds } from "domains/Queens/boards/seeds";
import { generateBoardFromSeedStatic } from "domains/Queens/helpers/boardGenerators/generateNewBoard";
import { solveBoardDeterministically } from "domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import {
  getStorageTimeObject,
  saveBoardProgress,
} from "domains/Queens/helpers/localStorageHelper";
import { getStarPositions } from "domains/Queens/helpers/solver/solveBoard";
import { Timer } from "shared/helpers/Timer";

// This cleared all currently saved levels and times.
const clearOldLevelsMigrationKey = "hasRunClearOldLevelsMigration";

// the fix saved stars migration was for after we deduped the seed arrays.
// This time, we wanted to keep the saved levels and times, but we needed to fix the saved stars.
const fixSavedStarsMigration = "hasRunFixSavedStarsMigration";

export const runClearOldLevelsMigration = () => {
  const hasRunMigration = localStorage.getItem(clearOldLevelsMigrationKey);
  if (hasRunMigration) {
    return;
  }

  console.log("RUNNING MIGRATION: clearOldLevelsMigration");
  localStorage.clear();
  localStorage.setItem(clearOldLevelsMigrationKey, "true");
};

export const runFixSavedStarsMigration = () => {
  console.log("Checking whether to run migration: fixSavedStarsMigration");
  const hasRunMigration = localStorage.getItem(fixSavedStarsMigration);
  if (hasRunMigration) {
    console.log("Has already run migration");
    return;
  }
  console.log("RUNNING MIGRATION: fixSavedStarsMigration");
  const timer = new Timer();

  for (let size of SIDE_LENGTH_OPTIONS) {
    const seeds = getSeeds(size);
    console.log("Checking size: ", size);
    seeds.forEach((seed, i) => {
      try {
        const currentTimeObject = getStorageTimeObject({
          seedIndex: i,
          boardSize: size,
        });
        if (currentTimeObject.isFinished) {
          const board = generateBoardFromSeedStatic(size, seed);
          const isValidBoard = solveBoardDeterministically(board);
          if (isValidBoard) {
            const starPositions = getStarPositions(board);
            saveBoardProgress({
              seedIndex: i,
              boardSize: size,
              newTimeStorageObject: { ...currentTimeObject, starPositions },
            });
          } else {
            console.log("COULD NOT SOLVE BOARD");
            console.log({ i, seed, size, seeds });
          }
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    });
  }
  console.log(`finished migration in ${timer.getSeconds()} seconds`);
  localStorage.setItem(fixSavedStarsMigration, "true");
};
