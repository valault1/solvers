import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { BenchmarkResult } from "domains/Benchmarks/sharedTypes";

import * as React from "react";

export const ResultCard = ({ result }: { result: BenchmarkResult }) => {
  return (
    <Card>
      <CardHeader title={result.hostname} />
      <CardContent>
        <Stack>
          <div>Geekbench single core: {result.geekbench[0].single}</div>
          <div>Geekbench multi core: {result.geekbench[0].multi}</div>
        </Stack>
      </CardContent>
    </Card>
  );
};
