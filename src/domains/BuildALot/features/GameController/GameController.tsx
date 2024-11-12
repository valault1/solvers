import styled from "@emotion/styled";
import { theme } from "components/theme/theme";
import {
  Action,
  DetailsPaneController,
} from "domains/BuildALot/features/DetailsPane/DetailsPaneController";
import {
  SellIcon,
  UpgradeIcon,
} from "domains/BuildALot/features/GameController/icons";
import { InfoBar } from "domains/BuildALot/components/InfoBar";
import { useResources } from "domains/BuildALot/features/GameController/useResources";
import { GameState } from "domains/BuildALot/sharedTypes";
import * as React from "react";
import { useLots } from "domains/BuildALot/features/Lots/useLots";
import { Lots } from "domains/BuildALot/features/Lots/Lots";
import { useDetailsPaneActions } from "domains/BuildALot/features/DetailsPane/useDetailsPaneActions";
import { useDetailsPaneState } from "domains/BuildALot/features/DetailsPane/useDetailsPaneState";

const GameContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "99%",
  height: "700px",
  color: theme.colors.textPrimary,
});

const TopGameSection = styled.div(() => ({
  flex: 5,
  border: "1px solid",
  padding: 12,
}));

const DetailsPaneContainer = styled.div(() => ({
  flex: 2,
  border: "1px solid",
}));

const INITIAL_STATE: GameState = {
  totalWorkers: 3,
  availableWorkers: 3,
  lumber: 1000,
  cash: "$100,000",
  lots: [{}, {}, {}, {}, {}],
};

export const GameController = () => {
  const {
    cash,
    totalWorkers,
    availableWorkers,
    lumber,
    addCash,
    subtractCash,
    addTotalWorkers,
    addAvailableWorkers,
    subtractAvailableWorkers,
    addLumber,
    subtractLumber,
  } = useResources({ initialState: INITIAL_STATE });

  const initialLots = INITIAL_STATE.lots;
  const {
    lots,
    buildOnLot,
    onClickLot,
    selectedLotIndex,
    unselectLot,
    removeJob,
    createJobOnLot,
  } = useLots({
    initialLots,
  });

  const gameState: GameState = {
    cash,
    totalWorkers,
    availableWorkers,
    lumber,
    lots,
  };

  const { actions } = useDetailsPaneActions({
    selectedLot: lots[selectedLotIndex],
    selectedLotIndex,
    addAvailableWorkers,
    subtractAvailableWorkers,
    addLumber,
    subtractLumber,
    buildOnLot,
  });

  const {
    detailsPaneState,
    workshopClickHandler,
    blueprintsClickHandler,
    lumberShopClickHandler,
    clickLotHandler,
    unselectLotHandler,
  } = useDetailsPaneState({ onClickLot, unselectLot });

  return (
    <GameContainer>
      <InfoBar gameState={gameState} />
      <TopGameSection onClick={unselectLotHandler}>
        <Lots
          lots={lots}
          selectedLotIndex={selectedLotIndex}
          onClickLot={clickLotHandler}
          createJobOnLot={createJobOnLot}
        />
      </TopGameSection>
      <DetailsPaneContainer>
        <DetailsPaneController
          actions={actions}
          createJobOnLot={createJobOnLot}
          selectedLotIndex={selectedLotIndex}
          detailsPaneState={detailsPaneState}
          onClickWorkshop={workshopClickHandler}
          onClickBlueprints={blueprintsClickHandler}
          onClickLumberShop={lumberShopClickHandler}
        />
      </DetailsPaneContainer>
    </GameContainer>
  );
};
