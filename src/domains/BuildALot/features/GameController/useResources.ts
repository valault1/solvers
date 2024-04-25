import {
  formatCurrency,
  formatNumber,
} from "domains/BuildALot/features/GameController/helpers";
import { GameState } from "domains/BuildALot/sharedTypes";
import React from "react";

export type UseResourcesProps = {
  initialState: GameState;
};

export type CostFunction = (amount: number | string) => void;

export const useResources = ({ initialState }: UseResourcesProps) => {
  const [cash, setCash] = React.useState(initialState.cash);
  const [totalWorkers, setTotalWorkers] = React.useState(
    initialState.totalWorkers
  );
  const [availableWorkers, setAvailableWorkers] = React.useState(
    initialState.availableWorkers
  );
  const [lumber, setLumber] = React.useState(initialState.lumber);

  const addCash = React.useCallback(
    (amount: number | string) =>
      setCash((prev) => {
        const num = formatNumber(amount);
        const prevNum = formatNumber(prev);
        return formatCurrency(num + prevNum);
      }),
    [setCash]
  );

  const subtractCash = React.useCallback(
    (amount: number | string) =>
      setCash((prev) => {
        const num = formatNumber(amount);
        const prevNum = formatNumber(prev);
        return formatCurrency(prevNum - num);
      }),
    [setCash]
  );

  const addAvailableWorkers = React.useCallback(
    (amount: number) => setAvailableWorkers((prev) => prev + amount),
    [setAvailableWorkers]
  );
  const subtractAvailableWorkers = React.useCallback(
    (amount: number) => setAvailableWorkers((prev) => prev - amount),
    [setAvailableWorkers]
  );

  const addTotalWorkers = React.useCallback(
    (amount: number) => {
      setTotalWorkers((prev) => prev + amount);
      addAvailableWorkers(amount);
    },
    [setTotalWorkers, addAvailableWorkers]
  );

  const addLumber = React.useCallback(
    (amount: number) => setLumber((prev) => prev + amount),
    [setLumber]
  );
  const subtractLumber = React.useCallback(
    (amount: number) => setLumber((prev) => prev - amount),
    [setLumber]
  );

  return {
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
  };
};
