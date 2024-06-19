import { RNG } from "domains/Queens/helpers/randomNum";

export const testRandomNums = (
  numTests = 10000,
  rangeBegin = 100,
  rangeEnd = 199
) => {
  const rng = new RNG(123);
  const testDict: Record<number, number> = {};
  for (let i = 0; i < numTests; i++) {
    const randomNum = rng.getRandomNumInRangeInclusive(rangeBegin, rangeEnd);
    testDict[randomNum] = testDict[randomNum] ? testDict[randomNum] + 1 : 1;
  }
  console.log(testDict);
};

/*

PROBLEM SEEDS:
6613781
2356095
1983471
*/
