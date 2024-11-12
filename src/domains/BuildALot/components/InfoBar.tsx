import styled from "@emotion/styled";
import {
  CashIcon,
  LumberIcon,
  RentIcon,
  WorkersIcon,
} from "domains/BuildALot/features/GameController/icons";
import { ProgressBar } from "domains/BuildALot/components/ProgressBar";
import { GameState } from "domains/BuildALot/sharedTypes";
import React from "react";

const InfoBarContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  alignItems: "center",
});

const RentCollectionWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  alignItems: "center",
});

export type InfoBarProps = {
  gameState: GameState;
};

export const InfoBar = ({ gameState }: InfoBarProps) => {
  // displays the resources and rent progress
  return (
    <InfoBarContainer>
      <CashIcon /> {gameState.cash}
      <WorkersIcon /> {gameState.availableWorkers} / {gameState.totalWorkers}
      <LumberIcon /> {gameState.lumber}
      <RentCollectionWrapper>
        <RentIcon /> <ProgressBar progress={0.5} />
      </RentCollectionWrapper>
    </InfoBarContainer>
  );
};
