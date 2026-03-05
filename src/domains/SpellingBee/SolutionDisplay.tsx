import { Card, Stack } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 8px;
`;

const WordCard = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const SolutionDisplay = ({ words }: { words: string[] }) => {
  const [crossedOutIndices, setCrossedOutIndices] = React.useState<{
    [key: number]: boolean;
  }>({});

  return (
    <Card sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <b>Possible Words</b>
        <div>
          Note: some words may be too obscure to be accepted in Spelling Bee.
        </div>
        <WordGrid>
          {words.map((word, i) => (
            <WordCard
              key={i}
              onClick={() =>
                setCrossedOutIndices((prev) => {
                  const newCrossedOutIndices = { ...prev };
                  newCrossedOutIndices[i] = !newCrossedOutIndices[i];
                  return newCrossedOutIndices;
                })
              }
            >
              {crossedOutIndices[i] ? <s>{word}</s> : word}
            </WordCard>
          ))}
        </WordGrid>
      </Stack>
    </Card>
  );
};
