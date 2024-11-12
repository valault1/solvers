import styled from "@emotion/styled";
import { controllers } from "chart.js";
import { PrimaryButton } from "components/Form.elements";
import { ActionDescription } from "domains/BuildALot/features/DetailsPane/ActionDescription";
import { ActionsBar } from "domains/BuildALot/features/DetailsPane/ActionsBar";
import {
  ConstructionCost,
  DetailsPaneState,
  Job,
  Lot,
} from "domains/BuildALot/sharedTypes";
import * as React from "react";

export const MainWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

export const ActionDescriptionContainer = styled.div(() => ({
  flex: 1,
  borderRight: "1px solid",
}));

export const ActionsBarContainer = styled.div(() => ({
  flex: 4,
  padding: 12,
}));

export const TopBarWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  padding: 4,
  gap: "8px",
  borderBottom: "2px solid",
});

export const ContentWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  flex: 4,
  padding: 12,
});

export type ActionBlueprint = Omit<
  Action,
  "performAction" | "cleanupAfterAction"
>;

export type Action = {
  descriptionText: string;
  costs: ConstructionCost;
  performAction: () => void;
  cleanupAfterAction: () => void;
  icon: React.ReactNode;
  name: string;
  disabled?: boolean;
};

export const DetailsPaneController = ({
  detailsPaneState,
  actions,
  createJobOnLot,
  selectedLotIndex,
  onClickWorkshop,
  onClickLumberShop,
  onClickBlueprints,
}: {
  detailsPaneState: DetailsPaneState;
  onClickWorkshop: () => void;
  onClickLumberShop: () => void;
  onClickBlueprints: () => void;
  actions: Action[];
  createJobOnLot: (index: number, job?: Job) => void;
  selectedLotIndex?: number;
}) => {
  const [selectedActionIndex, setSelectedActionIndex] = React.useState(0);
  const selectedAction = actions[selectedActionIndex];
  const onClickPerformJob = () => {
    const newJob: Job = {
      startTime: new Date(),
      timeElapsed: 0,
      timeToFinish: selectedAction.costs.jobTime,
      onFinishJob: selectedAction.cleanupAfterAction,
    };
    console.log("creating job");
    console.log({ selectedLotIndex, newJob });
    createJobOnLot(selectedLotIndex, newJob);
    selectedAction.performAction();
  };

  const action = actions[selectedActionIndex];

  return (
    <MainWrapper>
      <TopBarWrapper>
        <PrimaryButton onClick={onClickWorkshop}>Workshop</PrimaryButton>
        <PrimaryButton onClick={onClickLumberShop}>Lumber</PrimaryButton>
        <PrimaryButton onClick={onClickBlueprints}>Blueprints</PrimaryButton>
      </TopBarWrapper>
      <ContentWrapper>
        {detailsPaneState === "lotActions" && (
          <>
            {action && (
              <ActionDescriptionContainer>
                <ActionDescription action={actions[selectedActionIndex]} />
              </ActionDescriptionContainer>
            )}
            <ActionsBarContainer>
              <ActionsBar
                actions={actions}
                selectedActionIndex={selectedActionIndex}
                setSelectedActionIndex={setSelectedActionIndex}
                onClickPerformJob={onClickPerformJob}
              />
            </ActionsBarContainer>
          </>
        )}
        {detailsPaneState === "infoScreen" && <>infoScreen</>}
        {detailsPaneState === "workshop" && <>workshop</>}
        {detailsPaneState === "lumberShop" && <>lumberShop</>}
        {detailsPaneState === "blueprints" && <>blueprints</>}
      </ContentWrapper>
    </MainWrapper>
  );
};
