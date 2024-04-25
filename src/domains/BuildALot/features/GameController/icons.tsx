import {
  Add,
  AddHome,
  Carpenter,
  Handyman,
  Home,
  Paid,
  Savings,
  Sell,
  Upgrade,
} from "@mui/icons-material";
import React from "react";

export type FontSize = "small" | "inherit" | "large" | "medium";
export type IconProps = { fontSize?: FontSize };

export const WorkersIcon = ({ fontSize }: IconProps) => (
  <Handyman fontSize={fontSize} />
);
export const UpgradeIcon = ({ fontSize }: IconProps) => (
  <Upgrade fontSize={fontSize} />
);

export const SellIcon = ({ fontSize }: IconProps) => (
  <Sell fontSize={fontSize} />
);

export const CashIcon = ({ fontSize }: IconProps) => (
  <Paid fontSize={fontSize} />
);

export const LumberIcon = ({ fontSize }: IconProps) => (
  <Carpenter fontSize={fontSize} />
);

export const RentIcon = ({ fontSize }: IconProps) => (
  <Savings fontSize={fontSize} />
);

export const EmptyLotIcon = ({ fontSize }: IconProps) => (
  <Add fontSize={fontSize} />
);

export const ConstructBuildingIcon = ({ fontSize }: IconProps) => (
  <AddHome fontSize={fontSize} />
);

export const BuildingIcon = ({ fontSize }: IconProps) => (
  <Home fontSize={fontSize} />
);
