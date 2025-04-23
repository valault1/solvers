import { Stack } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { mockResult } from "domains/Benchmarks/mocks";
import { ResultCard } from "domains/Benchmarks/ResultCard";

import * as React from "react";

export const Benchmarks: React.VFC = () => {
  return (
    <MainContainer>
      <Stack>
        Recent Benchmarks
        <Stack>
          <ResultCard result={mockResult} />
        </Stack>
      </Stack>
    </MainContainer>
  );
};
