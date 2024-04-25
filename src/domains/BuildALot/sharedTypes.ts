import { ActionType } from "domains/BuildALot/blueprints";
import { Action } from "domains/BuildALot/features/DetailsPane/DetailsPaneController";

export type ConstructionCost = {
  workers?: number;
  lumber?: number;
  // job time in seconds
  jobTime?: number;
  cash?: string;
};

export type HomeUpgradeDefinition = {
  jobCost?: ConstructionCost;
  homeValue: string;
  actions: ActionType[];
};

export type HomeBlueprint = {
  id: string;
  displayName: string;
  base: HomeUpgradeDefinition;
  oneStar: HomeUpgradeDefinition;
  twoStars: HomeUpgradeDefinition;
  threeStars: HomeUpgradeDefinition;
  fourStars: HomeUpgradeDefinition;
};

export type GameState = {
  cash: string;
  totalWorkers: number;
  availableWorkers: number;
  lumber: number;
  lots: Lot[];
};

export type Home = {
  blueprintId: string;
  upgradeLevel: UpgradeLevel;
  nextUpgradeLevel?: UpgradeLevel;
  actions: Action[];
};

export type Job = {
  onFinishJob: () => void;
  startTime: Date;
  // time in seconds
  timeToFinish: number;
  // this is used if a job is paused
  timeElapsed: number;
};

export type Lot = {
  building?: Home;
  currentJob?: Job;
};

export type UpgradeLevel = "base" | "oneStar" | "twoStars" | "threeStars";

export type DetailsPaneState =
  | "workshop"
  | "lumberShop"
  | "lotActions"
  | "infoScreen"
  | "blueprints";
