import styled from "@emotion/styled";
import { Action } from "domains/BuildALot/features/DetailsPane/DetailsPaneController";
import * as React from "react";

export const DescriptionWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 12,
});

export const ActionDescription = ({ action }: { action: Action }) => {
  return (
    <DescriptionWrapper>
      <div>{action.descriptionText}</div>
      <div>
        workers: {action.costs.workers}
        <br />
        lumber: {action.costs.lumber}
        <br />
        time: {action.costs.jobTime}
      </div>
    </DescriptionWrapper>
  );
};
