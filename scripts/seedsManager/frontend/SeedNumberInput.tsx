import { Button, Input } from "@mui/material";
import * as React from "react";

export const SeedNumberInput = ({
  onSubmit,
}: {
  onSubmit: (newNumSeeds: number) => void;
}) => {
  const [value, setValue] = React.useState("0");
  return (
    <>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />{" "}
      <Button
        onClick={() => {
          const valueAsNumber = Number(value);
          if (!isNaN(valueAsNumber)) onSubmit(valueAsNumber);
        }}
      >
        Submit{" "}
      </Button>
    </>
  );
};
