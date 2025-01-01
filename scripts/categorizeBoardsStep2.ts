// @ts-nocheck
import allSeedsByDifficulty from "./allSeedsByDifficulty";
import DAILY_BOARDS from "../src/domains/Queens/boards/dailyBoardsList";
import fs from "fs";

export const START_DATE = new Date("07/03/24");
const msInDay = 24 * 60 * 60 * 1000;

const MAX_BOARDS_TO_USE = 5 * 365 + 1;

const seedsByDifficulty: any =
  allSeedsByDifficulty.allSeedsByDifficulty["12"].seedsByDifficulty;

const dailyBoards: any = DAILY_BOARDS.DAILY_BOARDS;

const unusedBoards = seedsByDifficulty.filter(
  (seedObj) =>
    !dailyBoards.find((dailyBoard) => dailyBoard.seed === seedObj.seed)
);

const boardsInDailyNotInDifficulty = dailyBoards.filter(
  (seedObj) =>
    !seedsByDifficulty.find((dailyBoard) => dailyBoard.seed === seedObj.seed)
);

const dedupedSeedsByDifficulty = seedsByDifficulty.filter(
  (seedObj, index) =>
    seedsByDifficulty.findIndex(
      (seedObj2) => seedObj2.seed === seedObj.seed
    ) === index
);

const dedupedDailyBoards = dailyBoards.filter(
  (seedObj, index) =>
    dailyBoards.findIndex((seedObj2) => seedObj2.seed === seedObj.seed) ===
    index
);

unusedBoards.sort((a, b) => a.index - b.index);

// ok. the boards are all good! the problem was that 4 of the boards in dailyBoard are duplicates,
// and 8 of the boards in dailyBoards are not in the seedsByDifficulty.
// so, 12170 boards in seedsByDIfficulty, 213 boards in dailyBoards, resulting in 11969 boards in unusedBoards.
console.log(
  `totalBoards: ${seedsByDifficulty.length}, current dailyBoards: ${dailyBoards.length}, unusedBoards: ${unusedBoards.length}`
);

const finalDailyBoards = [
  ...dailyBoards,
  ...unusedBoards.map((b) => ({ seed: b.seed })),
];

const finalDailyBoardsWithDates = finalDailyBoards.map(({ seed }, idx) => {
  const date = new Date(START_DATE.getTime() + idx * msInDay);
  const dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD
  return { seed, date: dateString };
});

console.log(finalDailyBoardsWithDates);
const content = `export const DAILY_BOARDS_WITH_DATES = ${JSON.stringify(
  finalDailyBoardsWithDates
)}
\n\n
export const DAILY_BOARDS = ${JSON.stringify(
  finalDailyBoards.slice(0, MAX_BOARDS_TO_USE).map((b) => b.seed)
)}
`;
try {
  fs.writeFileSync("categorizedBoards.ts", content);
  console.log("Wrote to file!");
} catch (err) {
  console.log(
    "An error occurred while writing the seeds to file: " + err.message
  );
}
