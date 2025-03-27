import { promises as fs } from "fs";

const DIR = "./backend/server/data/";

const getFileName = (i: number) => `${DIR}benchmark-${i}.json`;

export const runTest = async (numOperations: number) => {
  const num = numOperations;
  const totalStartTime = new Date().getTime();
  let startTime = totalStartTime;

  let json = JSON.parse(await fs.readFile(`${DIR}benchmark.json`, "utf-8"));

  // write test
  for (let i = 0; i < num; i++) {
    await fs.writeFile(getFileName(i), JSON.stringify(json), "utf-8");
  }
  const writeTime = new Date().getTime() - startTime;
  startTime = new Date().getTime();

  // read test
  for (let i = 0; i < num; i++) {
    const text = await fs.readFile(getFileName(i), "utf-8");
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
