import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import * as React from "react";
import { ResourceAmount } from "./ResourceAmount";
import { useResources } from "./useResources";

const AUTOCLIPPER_RATE = 1;

export const Main: React.VFC = () => {
  //const [lastTimeStamp, setLastTimeStamp] = React.useState(Date.now());
  const {
    getFormattedNumPaperclips,
    getFormattedNumAutoclippers,
    makePaperClip,
    makeAutoclipper,
  } = useResources();
  return (
    <Stack>
      <ResourceAmount
        label="Paperclips: "
        formula={getFormattedNumPaperclips}
      />
      <PrimaryButton onClick={makePaperClip}>Make paperclip</PrimaryButton>

      <ResourceAmount
        label="Autoclippers: "
        formula={getFormattedNumAutoclippers}
      />
      <PrimaryButton onClick={makeAutoclipper}>Make autoclipper</PrimaryButton>
    </Stack>
  );
};
