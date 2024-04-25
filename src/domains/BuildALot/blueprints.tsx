import { ActionBlueprint } from "domains/BuildALot/features/DetailsPane/DetailsPaneController";
import {
  SellIcon,
  UpgradeIcon,
} from "domains/BuildALot/features/GameController/icons";
import { HomeBlueprint } from "domains/BuildALot/sharedTypes";
import React from "react";

export const ACTION_BLUEPRINTS = {
  SELL: {
    descriptionText: "Sell this home.",
    name: "Sell",
    icon: <SellIcon />,
  },
  UPGRADE: {
    descriptionText: "Upgrade this home.",
    name: "Upgrade",
    icon: <UpgradeIcon />,
  },
};

export type ActionType = keyof typeof ACTION_BLUEPRINTS;

export const RAMBLER: HomeBlueprint = {
  id: "RAMBLER",
  displayName: "Rambler",
  base: {
    jobCost: {
      workers: 2,
      lumber: 300,
      jobTime: 10,
    },
    homeValue: "$50,000",
    actions: ["SELL", "UPGRADE"],
  },
  oneStar: {
    jobCost: {
      workers: 1,
      lumber: 150,
      jobTime: 7,
    },
    homeValue: "$55,000",
    actions: ["SELL", "UPGRADE"],
  },
  twoStars: {
    jobCost: {
      workers: 2,
      lumber: 200,
      jobTime: 8,
    },
    homeValue: "$60,000",
    actions: ["SELL", "UPGRADE"],
  },
  threeStars: {
    jobCost: {
      workers: 2,
      lumber: 250,
      jobTime: 9,
    },
    homeValue: "$70,000",
    actions: ["SELL", "UPGRADE"],
  },
  fourStars: {
    jobCost: {
      workers: 2,
      lumber: 300,
      jobTime: 10,
    },
    homeValue: "$100,000",
    actions: ["SELL"],
  },
};

export const COLONIAL: HomeBlueprint = {
  id: "COLONIAL",
  displayName: "Colonial",
  base: {
    jobCost: {
      workers: 2,
      lumber: 300,
      jobTime: 10,
    },
    homeValue: "$50,000",
    actions: ["SELL", "UPGRADE"],
  },
  oneStar: {
    jobCost: {
      workers: 1,
      lumber: 150,
      jobTime: 7,
    },
    homeValue: "$55,000",
    actions: ["SELL", "UPGRADE"],
  },
  twoStars: {
    jobCost: {
      workers: 2,
      lumber: 200,
      jobTime: 8,
    },
    homeValue: "$60,000",
    actions: ["SELL", "UPGRADE"],
  },
  threeStars: {
    jobCost: {
      workers: 2,
      lumber: 250,
      jobTime: 9,
    },
    homeValue: "$70,000",
    actions: ["SELL", "UPGRADE"],
  },
  fourStars: {
    jobCost: {
      workers: 2,
      lumber: 300,
      jobTime: 10,
    },
    homeValue: "$100,000",
    actions: ["SELL"],
  },
};

// const convertActionTypeToActionBlueprint = (actionType: ActionType): ActionBlueprint => {
//   if
// }

export const HOME_BLUEPRINTS = [RAMBLER, COLONIAL];
