import { HOME_BLUEPRINTS } from "domains/BuildALot/blueprints";
import {
  Action,
  ActionBlueprint,
} from "domains/BuildALot/features/DetailsPane/DetailsPaneController";
import { ConstructBuildingIcon } from "domains/BuildALot/features/GameController/icons";
import { CostFunction } from "domains/BuildALot/features/GameController/useResources";
import { Home, HomeBlueprint, Lot } from "domains/BuildALot/sharedTypes";
import * as React from "react";

export const EMPTY_LOT_ACTION_BLUEPRINTS: ActionBlueprint[] =
  HOME_BLUEPRINTS.map((homeBlueprint) => {
    return {
      name: `Construct ${homeBlueprint.displayName}`,
      descriptionText: `Build a ${homeBlueprint.displayName}`,
      icon: <ConstructBuildingIcon />,
      costs: homeBlueprint.base.jobCost,
    };
  });

export type UseDetailsPaneActionsProps = {
  selectedLot?: Lot;
  selectedLotIndex?: number;
  addAvailableWorkers: CostFunction;
  subtractAvailableWorkers: CostFunction;
  addLumber: CostFunction;
  subtractLumber: CostFunction;
  buildOnLot: ({ lotIndex, home }: { lotIndex: number; home: Home }) => void;
};
export const useDetailsPaneActions = ({
  selectedLot,
  selectedLotIndex,
  addAvailableWorkers,
  subtractAvailableWorkers,
  addLumber,
  subtractLumber,
  buildOnLot,
}: UseDetailsPaneActionsProps) => {
  console.log({ mainHookSelectedLotIndex: selectedLotIndex });
  const performAction = React.useCallback(
    (homeBlueprint: HomeBlueprint) => {
      const costs = homeBlueprint.base.jobCost;
      subtractAvailableWorkers(costs.workers || 0);
      subtractLumber(costs.lumber || 0);
    },
    [subtractAvailableWorkers, subtractLumber]
  );
  const cleanupAfterAction = React.useCallback(
    (homeBlueprint: HomeBlueprint, lotIndex: number) => {
      const newHome: Home = {
        blueprintId: homeBlueprint.id,
        upgradeLevel: "base",
        actions: [],
      };
      const costs = homeBlueprint.base.jobCost;
      console.log("Performing cleanup!");
      console.log({ costs, lotIndex, newHome });
      addAvailableWorkers(costs.workers || 0);
      buildOnLot({ lotIndex: lotIndex, home: newHome });
    },
    [buildOnLot, addAvailableWorkers]
  );
  const createBuildAction = React.useCallback(
    (homeBlueprint: HomeBlueprint, lotIndex: number): Action => {
      console.log("building actions");
      console.log({ homeBlueprint, lotIndex });
      return {
        name: `Construct ${homeBlueprint.displayName}`,
        descriptionText: `Build a ${homeBlueprint.displayName}`,
        icon: <ConstructBuildingIcon />,
        costs: homeBlueprint.base.jobCost,
        performAction: () => performAction(homeBlueprint),
        cleanupAfterAction: () => cleanupAfterAction(homeBlueprint, lotIndex),
      };
    },
    [cleanupAfterAction, performAction]
  );

  const emptyLotActions = React.useMemo(() => {
    console.log("creating emptyLotActions");
    console.log({ selectedLotIndex });
    return HOME_BLUEPRINTS.map((blueprint) =>
      createBuildAction(blueprint, selectedLotIndex)
    );
  }, [selectedLotIndex, createBuildAction]);

  let actions: Action[] = [];
  if (!selectedLot?.building) {
    actions = emptyLotActions;
  } else {
    //todo: use the actions from the home
    actions = [];
  }

  return { actions };
};
