import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { CheckCircle, Circle, Error as ErrorIcon } from "@mui/icons-material";
import {
  INSTRUCTIONS_PADDING,
  INSTRUCTIONS_WIDTH,
} from "domains/Queens/components/Instructions";

export type Step = {
  error?: string;
  title: string;
  description: string;
  time?: number;
  isLoading?: boolean;
  isFinished?: boolean;
  finishedContent?: React.ReactNode;
};

export type StepsDisplayProps = {
  steps: Step[];
};

const StepsDisplay: React.FC<StepsDisplayProps> = ({ steps }) => {
  const getIcon = (step: Step) => {
    if (step.error) {
      return <ErrorIcon color="error" />;
    }
    if (step.isLoading) {
      return <CircularProgress size={20} />;
    }
    if (step.isFinished) {
      return <CheckCircle color="success" />;
    }

    return <Circle />;
  };
  return (
    <Stack maxWidth={INSTRUCTIONS_PADDING * 2 + INSTRUCTIONS_WIDTH}>
      {steps.map((step) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                width="100%"
              >
                <Stack
                  direction="row"
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {getIcon(step)} {step.title}
                </Stack>
                {!!step.time && `Finished in ${step.time / 1000}s`}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {step.description}
              <br /> {step.finishedContent}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};

export default StepsDisplay;
