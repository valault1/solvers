import styled from "@emotion/styled";
import { PrimaryButton } from "components/Form.elements";
import { Action } from "domains/BuildALot/features/DetailsPane/DetailsPaneController";
import * as React from "react";

const MainWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  gap: 10,
});

const ActionsWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",

  gap: 10,
});

export const ActionIconWrapper = styled.div<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    ...(isSelected ? { border: "1px solid" } : {}),
  })
);

export const ActionsBar = ({
  actions,
  selectedActionIndex,
  setSelectedActionIndex,
  onClickPerformJob,
}: {
  actions: Action[];
  selectedActionIndex: number;
  setSelectedActionIndex: (newIndex: number) => void;
  onClickPerformJob: () => void;
}) => {
  return (
    <MainWrapper>
      <ActionsWrapper>
        {actions.map((action, index) => {
          return (
            <ActionIconWrapper
              isSelected={index === selectedActionIndex}
              onClick={() => {
                setSelectedActionIndex(index);
              }}
            >
              {action.icon}
            </ActionIconWrapper>
          );
        })}
      </ActionsWrapper>
      <PrimaryButton onClick={onClickPerformJob}>Perform action</PrimaryButton>
    </MainWrapper>
  );
};
