import React from "react";
import { Card, Stack } from "@mui/material";

export const INSTRUCTIONS_WIDTH = 350;
export const INSTRUCTIONS_PADDING = 20;

const Instructions = () => {
  return (
    <Card
      style={{ padding: INSTRUCTIONS_PADDING, maxWidth: INSTRUCTIONS_WIDTH }}
    >
      <Stack justifyContent="center" alignItems="center" gap="12px">
        <b>
          <u>Instructions</u>
        </b>
        <div>
          1. Take a screenshot of today's Queens board. (Don't worry about
          cropping it - just upload the whole screenshot!)
        </div>
        <div>
          2. Upload the screenshot, and our solver will process the image and
          display a solved board.
        </div>
        <div>
          3. Put in the solution, and look like a genius with your lightning
          fast time!
        </div>
      </Stack>
    </Card>
  );
};

export default Instructions;
