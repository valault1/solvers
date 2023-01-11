import { WordcountDataPoint } from "domains/Wordcounter/sharedTypes";
import * as React from "react";

const getTotals = (allDataPoints: WordcountDataPoint[]) => {
  let totalWordCount = 0;
  let totalKeystrokes = 0;
  allDataPoints.forEach((dataPoint) => {
    totalWordCount += dataPoint.wordcount;
    totalKeystrokes += dataPoint.keystrokes;
  });
  return { totalWordCount, totalKeystrokes };
};

export const useFilteredDataPoints = (allDataPoints: WordcountDataPoint[]) => {
  const { totalWordCount, totalKeystrokes } = React.useMemo(
    () => getTotals(allDataPoints),
    [allDataPoints]
  );
  console.log({ totalWordCount, totalKeystrokes });
  return {
    totalWordCount,
    totalKeystrokes,
  };
};
