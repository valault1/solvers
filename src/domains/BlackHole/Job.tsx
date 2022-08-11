// items to feed the black hole
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Item } from "domains/BlackHole/sharedTypes";
import { items } from "domains/BlackHole/shop/items";
import * as React from "react";

type JobProps = {
  cash: number;
  getPaid: (amount: number) => void;
};

const JobContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

const RowContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  width: "100%",
}));

export const Job: React.VFC<JobProps> = ({ cash, getPaid }) => {
  return (
    <JobContainer>
      <div>current cash: ${cash}</div>
      <br></br>
      <Button variant="contained" disableRipple onClick={() => getPaid(2)}>
        {"Do your job (acquire $2)"}
      </Button>
    </JobContainer>
  );
};
