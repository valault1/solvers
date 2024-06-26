import fs from "fs";
import { Seeds } from "./Seeds";

export type SeedInfo = {
  filePath: string;
  preExistingSeeds: number[];
  newSeeds: number[];
  boardsGenerated?: number;
  timeTaken?: number;
};

const variableToFileContent = ({
  variableName,
  value,
}: {
  variableName: string;
  value: any;
}) => {
  return `export const ${variableName} = ${JSON.stringify(value)};`;
};

const variablesToFileContent = (variables: { [key: string]: any }) => {
  return Object.keys(variables)
    .map((variableName) =>
      variableToFileContent({ variableName, value: variables[variableName] })
    )
    .join("\n");
};

const readVariableFromFileContent = ({
  fileContent,
  variableName,
  defaultValue = undefined,
}: {
  fileContent: string;
  variableName: string;
  defaultValue?: any;
}) => {
  if (!fileContent) {
    console.log(`no file content; returnign default value: ${defaultValue}`);
  }
  try {
    const lines = fileContent.split("\n");
    const lineWithVariable = lines.find((line) =>
      line.includes(`export const ${variableName} = `)
    );
    const variableValueWithSemicolon = lineWithVariable.split(
      `export const ${variableName} = `
    )[1];
    const variableValue = variableValueWithSemicolon.slice(
      0,
      variableValueWithSemicolon.length - 1
    );
    return JSON.parse(variableValue);
  } catch (e) {
    console.log(
      `Couldn't find variable ${variableName} in file content; returning default value: ${defaultValue}`
    );
    return defaultValue;
  }
};

export const getPreExistingSeeds = (filePath: string) => {
  let fileContent = "";
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.log(
      `Couldn't read in existing seeds for filepath ${filePath}  - starting with no seeds. error: ${e}`
    );
  }
  const seeds = readVariableFromFileContent({
    fileContent,
    variableName: "seeds",
    defaultValue: [],
  });

  return seeds;
};

export const writeSeedsToFile = (seedObject: SeedInfo, newSeeds: number[]) => {
  const content = variableToFileContent({
    variableName: "seeds",
    value: [...seedObject.preExistingSeeds, ...newSeeds],
  });

  try {
    fs.writeFileSync(seedObject.filePath, content);
    console.log("Wrote seeds to file! " + seedObject.filePath);
  } catch (err) {
    console.error(
      `An error occurred while writing the seeds to file: ${err.message}`
    );
  }
};

export const readSeedsFromFile = (boardSize: number) => {
  const filePath = `../src/domains/Queens/boards/seeds${boardSize}.v3.ts`;
  let fileContent = "";
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.log(
      `Couldn't read in existing seeds for filepath ${filePath}  - starting with no seeds. error: ${e}`
    );
  }
  const seeds = readVariableFromFileContent({
    fileContent,
    variableName: "seeds",
    defaultValue: [],
  });
  const timesTakenSeconds = readVariableFromFileContent({
    fileContent,
    variableName: "timesTakenSeconds",
    defaultValue: [],
  });
  const boardsGenerated = readVariableFromFileContent({
    fileContent,
    variableName: "boardsGenerated",
    defaultValue: [],
  });

  return new Seeds({
    seeds,
    timesTakenSeconds,
    boardsGenerated,
    filePath,
    boardSize,
  });
};

const sum = (arr: number[]) => arr.reduce((partialSum, a) => partialSum + a, 0);

export const writeSeedsObjectToFile = (seeds: Seeds) => {
  const content = variablesToFileContent({
    boardSize: seeds.boardSize,
    seeds: seeds.seeds,
    timesTakenSeconds: seeds.timesTakenSeconds,
    boardsGenerated: seeds.boardsGenerated,
    numSeeds: seeds.seeds.length,
    totalTimeTaken: sum(seeds.timesTakenSeconds),
    totalBoardsGenerated: sum(seeds.boardsGenerated),
    averageTimeTakenPerSeed:
      sum(seeds.timesTakenSeconds) / seeds.seeds.length || 1,
    averageBoardsGeneratedPerSeed:
      sum(seeds.boardsGenerated) / seeds.seeds.length || 1,
    averageTimePerAttemptMs:
      (sum(seeds.timesTakenSeconds) * 1000) / sum(seeds.boardsGenerated),
  });

  try {
    fs.writeFileSync(seeds.filePath, content);
    console.log("Wrote seeds to file! " + seeds.filePath);
  } catch (err) {
    console.error(
      `An error occurred while writing the seeds to file: ${err.message}`
    );
  }
};
