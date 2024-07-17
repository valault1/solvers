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
    const lines = fileContent
      .replace(/\n/g, "")
      //.replace(/\s/g, "")
      .split("export const ");

    const lineWithVariable = lines.find((line) =>
      line.includes(`${variableName} = `)
    );
    const variableValueWithSemicolon = lineWithVariable.split(
      `${variableName} = `
    )[1];
    let variableValue = variableValueWithSemicolon.slice(
      0,
      variableValueWithSemicolon.length - 1
    );
    if (variableValue.charAt(variableValue.length - 2) === ",") {
      console.log("found comma");
      variableValue = variableValue.slice(0, variableValue.length - 2) + "]";
    }

    const val = JSON.parse(variableValue);
    if (val.length && variableName === "seeds") {
      // dedup existing seeds
      const sorted: number[] = Array.from(new Set(val)) as number[];
      sorted.sort((a, b) => a - b);
      console.log(sorted);
      return sorted;
    }
    return val;
  } catch (e) {
    console.log(
      `Couldn't find variable ${variableName} in file content; returning default value: ${defaultValue}`
    );
    console.log(e);
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
  const filePath = `../src/domains/Queens/boards/seeds${boardSize}.v5.ts`;
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
  const lastSeedTried = readVariableFromFileContent({
    fileContent,
    variableName: "lastSeedTried",
    defaultValue: 0,
  });

  return new Seeds({
    seeds,
    timesTakenSeconds,
    boardsGenerated,
    filePath,
    boardSize,
    lastSeedTried,
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
    lastSeedTried: seeds.lastSeedTried,
    totalTimeTaken: sum(seeds.timesTakenSeconds),
    totalBoardsGenerated: sum(seeds.boardsGenerated),
    averageTimeTakenPerSeed:
      sum(seeds.timesTakenSeconds) / seeds.seeds.length || 0,
    averageBoardsGeneratedPerSeed:
      sum(seeds.boardsGenerated) / seeds.seeds.length || 1,
    averageTimePerAttemptMs:
      (sum(seeds.timesTakenSeconds) * 1000) / sum(seeds.boardsGenerated),
  });

  const contentWithTsIgnore = `// @ts-nocheck\n${content}`;

  try {
    fs.writeFileSync(seeds.filePath, contentWithTsIgnore);
    console.log("Wrote seeds to file! " + seeds.filePath);
  } catch (err) {
    console.error(
      `An error occurred while writing the seeds to file: ${err.message}`
    );
  }
};
