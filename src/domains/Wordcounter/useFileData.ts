import { WordcountDataPoint } from "domains/Wordcounter/sharedTypes";
import * as React from "react";

const fileDataTemplate = "*-wordcounter-log.txt";

const testFilePath = "file:///Users/valault/wordcounter/wordcounter.log";

const readTextFile = (
  file: File | undefined,
  onLoadFile: (text: string) => void
) => {
  if (!file) return;
  var fReader = new FileReader();
  fReader.readAsText(file);
  fReader.onloadend = (event) => {
    // @ts-ignore
    onLoadFile(event.target.result);
  };
};

const processText = (text: string): WordcountDataPoint[] => {
  if (!text) return [];
  const lines = text.split("\n");
  const dataPointsText = lines.filter((line) => {
    const arr = line.split(",");
    if (arr.length !== 4) return false;
    if (
      isNaN(parseInt(arr[1])) ||
      isNaN(parseInt(arr[2])) ||
      isNaN(parseInt(arr[3]))
    )
      return false;

    return true;
  });
  console.log({ dataPointsText });
  const dataPoints: WordcountDataPoint[] = dataPointsText.map((line) => {
    const arr = line.split(",");
    return {
      time: new Date(arr[0]),
      interval: parseInt(arr[1]),
      wordcount: parseInt(arr[2]),
      keystrokes: parseInt(arr[3]),
    };
  });
  return dataPoints;
};

export const useFileData = (dataFile?: File) => {
  const [rawText, setRawText] = React.useState("");
  const [allDataPoints, setAllDataPoints] = React.useState<
    WordcountDataPoint[]
  >([]);
  console.log("in useFileData");
  console.log({ rawText, allDataPoints, dataFile });
  React.useEffect(
    () => readTextFile(dataFile, setRawText),
    [dataFile, setRawText]
  );
  React.useEffect(() => setAllDataPoints(processText(rawText)), [rawText]);

  return { allDataPoints };
};
