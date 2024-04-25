import styled from "@emotion/styled";
import { ProgressBar } from "domains/BuildALot/components/ProgressBar";
import { EmptyLotIcon } from "domains/BuildALot/features/GameController/icons";
import { Job, Lot } from "domains/BuildALot/sharedTypes";
import React from "react";

const JobBarWrapper = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));

// in ms
const INTERVAL_TO_UPDATE_PROGRESS = 100;
export const JobBarController = ({
  job,
  clearCurrentJob,
}: {
  job: Job;
  clearCurrentJob: () => void;
}) => {
  const [progress, setProgress] = React.useState(
    job.timeElapsed || 0 / job.timeToFinish
  );

  React.useEffect(() => {
    const updateProgress = () => {
      const newTimeElapsed =
        (new Date().getTime() - job.startTime.getTime()) / 1000;

      if (newTimeElapsed > job.timeToFinish) {
        job.onFinishJob();
        clearCurrentJob();
      }
      const newProgress = newTimeElapsed / job.timeToFinish;
      setProgress(newProgress);
    };
    const interval = setInterval(updateProgress, INTERVAL_TO_UPDATE_PROGRESS);
    return () => clearInterval(interval);
  });

  return (
    <JobBarWrapper>
      <ProgressBar progress={progress} />
    </JobBarWrapper>
  );
};
