import { promises as fs } from "fs";
import { LevelPack, Seed, SeedsBySize } from "../frontend/sharedTypes";

export const SIDE_LENGTH_OPTIONS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 20];

const solversPath = `${__dirname}/../../../../../..`;
const getSeedsPaths = (size: number) => {
  const supportedVersions = [4, 5, 6];

  return supportedVersions.map(
    (version) => `${solversPath}/scripts/boards/seeds${size}.v${version}.ts`
  );
};

export const currentAppSeedsPath = `${solversPath}/src/domains/Queens/boards/allSeeds.ts`;

const seedIsUsed = (seed: number, currentSeeds: number[]) => {
  return currentSeeds.includes(seed);
};

// reads all seeds, and processes them. This can take a while.
export const processNewSeeds = async () => {
  console.log({ currentAppSeedsPath });
  const initialSeedsBySize = await getAllSeeds();

  const currentSeedsFileContent = await fs.readFile(
    currentAppSeedsPath,
    "utf-8"
  );
  //console.log({ currentSeedsFileContent });
  //console.log({ testString: JSON.stringify({ test: "a" }) });
  const mainPackSeeds: { [key: string]: number[] } =
    readVariableFromFileContent({
      fileContent: currentSeedsFileContent,
      variableName: "allSeeds",
      defaultValue: {},
    });

  const unusedSeeds: { [key: number]: number[] } = {};

  Object.keys(initialSeedsBySize).forEach((sizeAsStr) => {
    const size = Number(sizeAsStr);
    const initialSeeds = initialSeedsBySize[sizeAsStr];
    const currentSeeds: number[] = mainPackSeeds[sizeAsStr];
    console.log(
      `size ${size}: total seeds found ${initialSeeds.length}; num currentSeeds: ${currentSeeds.length}`
    );

    initialSeeds.forEach((seed) => {
      if (!seedIsUsed(seed.value, currentSeeds)) {
        if (unusedSeeds[sizeAsStr]) {
          unusedSeeds[sizeAsStr].push(seed.value);
        } else unusedSeeds[sizeAsStr] = [seed.value];
      }
    });
  });
  // dedup unusedSeeds
  Object.keys(unusedSeeds).forEach((size) => {
    unusedSeeds[size] = Array.from(new Set(unusedSeeds[size])) as number[];
  });

  console.log({ unusedSeeds: JSON.stringify(unusedSeeds) });

  return { unusedSeeds, mainPackSeeds };
};

export const getAllSeeds = async (): Promise<SeedsBySize> => {
  let result: SeedsBySize = {};

  await Promise.all(
    SIDE_LENGTH_OPTIONS.map(async (size) => {
      const paths = getSeedsPaths(size);
      await Promise.all(
        paths.map(async (path) => {
          try {
            const fileContent = await fs.readFile(path, "utf-8");
            const stats = await fs.stat(path);
            //console.log(`path: ${getSeedsPath(size)}`);
            //console.log(`file last modified: ${stats.mtime}`);
            const seedValues: number[] = readVariableFromFileContent({
              fileContent,
              variableName: "seeds",
              defaultValue: [],
            });
            console.log(`Got ${seedValues.length} seeds for size ${size}`);
            const seeds: Seed[] = seedValues.map((value) => ({
              value,
              size,
            }));
            if (!!result[size.toString()]) {
              result[size.toString()] = [...result[size.toString()], ...seeds];
            } else result[size.toString()] = seeds;
          } catch (e) {
            console.log("file not found");
          }
        })
      );
    })
  );
  console.log({ result });

  return result;
};

const readVariableFromFileContent = ({
  fileContent,
  variableName,
  defaultValue = undefined,
  shouldDedup = false,
}: {
  fileContent: string;
  variableName: string;
  defaultValue?: any;
  shouldDedup?: boolean;
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
    const variableValueWithSemicolon = lineWithVariable?.split(
      `${variableName} = `
    )[1];
    let variableValue = variableValueWithSemicolon;

    if (variableValue?.charAt(variableValue.length - 1) === ";") {
      variableValue = variableValue?.slice(0, variableValue.length - 1);
    }

    if (variableValue?.charAt(variableValue.length - 2) === ",") {
      variableValue = variableValue.slice(0, variableValue.length - 2) + "]";
    }
    console.log(`parsing for name: ${variableName}`);
    //console.log({ variableValue });
    console.log(
      `Last 10 digits of object: ${variableValue?.slice(
        variableValue.length - 10
      )}`
    );
    const val = JSON.parse(variableValue || "");
    if (val.length && variableName === "seeds") {
      // dedup existing seeds
      const sorted: number[] = shouldDedup
        ? (Array.from(new Set(val)) as number[])
        : val;
      sorted.sort((a, b) => a - b);
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

const readObjectFromFileContent = ({
  fileContent,
  variableName,
  defaultValue = undefined,
  hasSemicolon = true,
}: {
  fileContent: string;
  variableName: string;
  defaultValue?: any;
  hasSemicolon?: boolean;
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
    const variableValueWithSemicolon = lineWithVariable?.split(
      `${variableName} = `
    )[1];
    let variableValue = variableValueWithSemicolon?.slice(
      0,
      variableValueWithSemicolon.length - 1
    );
    if (variableValue?.charAt(variableValue.length - 2) === ",") {
      variableValue = variableValue.slice(0, variableValue.length - 2) + "]";
    }
    console.log(`parsing for name: ${variableName}`);
    console.log({ variableValue });
    console.log(
      `Last 10 digits of object: ${variableValue?.slice(
        variableValue.length - 10
      )}`
    );
    const val = JSON.parse(variableValue || "");
    if (val.length && variableName === "seeds") {
      // dedup existing seeds
      const sorted: number[] = Array.from(new Set(val)) as number[];
      sorted.sort((a, b) => a - b);
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
