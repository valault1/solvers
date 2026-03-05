import { promises as fs } from "fs";

const PROD_DIR = "./server/datads//";
// when testing, this app is rudn from the main project folder
const TEST_DIR = "./backend/server/datasd//";

export const runTest = async (numOperations: number) => {
  let isProd = true;

  const getFileName = (i: number) =>
    `${isProd ? PROD_DIR : TEST_DIR}/benchmark-${i}.json`;
  const getBaseFile = () => `${isProd ? PROD_DIR : TEST_DIR}/benchmark.json`;

  // attempt to read the file. If it doesn't exist, go to test.
  try {
    await fs.readFile(getBaseFile(), "utf-8");
  } catch (e) {
    isProd = false;
  }

  const num = numOperations;
  const totalStartTime = new Date().getTime();
  let startTime = totalStartTime;

  let json = JSON.parse(await fs.readFile(getBaseFile(), "utf-8"));

  // write test
  for (let i = 0; i < num; i++) {
    await fs.writeFile(getFileName(i), JSON.stringify(json), "utf-8");
  }
  const writeTime = new Date().getTime() - startTime;
  startTime = new Date().getTime();

  // read test
  for (let i = 0; i < num; i++) {
    const text = await fs.readFile(getFileName(i), "utf-8");
    // parse the file, to help test performance
    const throwaway = JSON.parse(text);
  }

  const readTime = new Date().getTime() - startTime;
  startTime = new Date().getTime();

  // deleteTest
  for (let i = 0; i < num; i++) {
    await fs.unlink(getFileName(i));
  }

  const deleteTime = new Date().getTime() - startTime;

  const description = `ran ${num} operations on a JSON file.`;

  return {
    readTime,
    writeTime,
    deleteTime,
    totalTime: new Date().getTime() - totalStartTime,
    description,
  };
};
