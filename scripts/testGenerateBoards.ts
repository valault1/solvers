import { Stopwatch } from "./Stopwatch";
import boardGenerator from "../src/domains/Queens/helpers/boardGenerators/generateNewBoard.test";
import fs from "fs";

const generateBoardAndTestForDeterminism =
  //@ts-ignore
  boardGenerator.generateBoardAndTestForDeterminism;

const testName = process.argv[2] || "UNNAMED_TEST";
const resultsFilePath = "./testResults/_testResults.v3.log";
const boardSize = 8;
const timeBoardGeneration = async () => {
  const maxSeedsToFind = 10;
  let numSeedsFound = 0;
  let numBoardsGenerated = 0;
  let totalTimeTaken = 0;
  const attemptTimer = new Stopwatch();
  for (let i = 0; i < maxSeedsToFind; i++) {
    attemptTimer.start();
    const { isDeterministic, boardsGenerated } =
      await generateBoardAndTestForDeterminism({
        sideLength: boardSize,
      });
    attemptTimer.stop();
    totalTimeTaken += attemptTimer.getTime();
    numBoardsGenerated += boardsGenerated;
    if (isDeterministic) {
      numSeedsFound++;
    }
    console.log("found seed " + i);
  }
  let content = `test name: ${testName}\n`;
  content += `time of test: ${new Date().toISOString()}\n`;
  content += `Board size: ${boardSize}\n`;
  content += `Found ${numSeedsFound} seeds in ${numBoardsGenerated} boards\n`;
  content += `Average ms per seed:  ${totalTimeTaken / numSeedsFound}\n`;
  content += `Average boards per seed: ${numBoardsGenerated / numSeedsFound}\n`;
  content += "----------------------------------\n\n";
  console.log(content);
  fs.appendFileSync(resultsFilePath, content);
};

timeBoardGeneration();
