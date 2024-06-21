import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { Test } from "domains/Testing/sharedTypes";
import * as React from "react";

export const TestController = ({ test }: { test: Test }) => {
  const [result, setResult] = React.useState<any>();
  const [timeInSeconds, setTimeInSeconds] = React.useState<number>();

  const runTest = () => {
    let startTime = new Date().getTime();
    const res = test.functionToTest(...test.defaultInputs);
    let runTime = new Date().getTime() - startTime;
    setTimeInSeconds(runTime / 1000);
    setResult(res);
  };

  const resultComponent = React.useMemo(() => {
    return test.resultDisplayComponent(result);
  }, [result, test]);
  if (test.isHidden) return null;
  return (
    <Stack direction="column" gap={2}>
      Testing function {test.functionName}
      <PrimaryButton onClick={runTest}>
        Run function {test.functionName}
      </PrimaryButton>
      {timeInSeconds !== undefined && <div>Time to run: {timeInSeconds} s</div>}
      {result && resultComponent}
    </Stack>
  );
};
