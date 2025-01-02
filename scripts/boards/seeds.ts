import { allSeeds } from "domains/Queens/boards/allSeeds";

export const SIDE_LENGTH_OPTIONS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20];

export const getSeeds = (sideLength: number) => {
  // @ts-ignore
  const result: number[] = allSeeds[sideLength.toString()] || [];
  return result;
};
