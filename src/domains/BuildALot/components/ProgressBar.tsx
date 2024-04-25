import { Box, LinearProgress } from "@mui/material";
import React from "react";

export type ProgressBarProps = {
  //progress as a decimal percentage
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <Box sx={{ width: "50px" }}>
      <LinearProgress
        color={"secondary"}
        variant="determinate"
        value={progress * 100}
      />
    </Box>
  );
};
