import { Home, Job, Lot } from "domains/BuildALot/sharedTypes";
import React from "react";

export type UseLotsProps = {
  initialLots: Lot[];
};

export const useLots = ({ initialLots }: UseLotsProps) => {
  const [lots, setLots] = React.useState(initialLots);
  const [selectedLotIndex, setSelectedLotIndex] = React.useState<
    number | undefined
  >(undefined);

  const buildOnLot = ({ lotIndex, home }: { lotIndex: number; home: Home }) => {
    setLots((prev) => {
      const newLots = [...prev];
      if (newLots[lotIndex]) {
        newLots[lotIndex].building = home;
      }

      return newLots;
    });
  };

  const removeJob = (lotIndex: number) => {
    setLots((prev) => {
      const newLots = [...prev];
      newLots[lotIndex].currentJob = undefined;
      return newLots;
    });
  };

  const createJobOnLot = (lotIndex: number, job?: Job) => {
    setLots((prev) => {
      const newLots = [...prev];
      newLots[lotIndex].currentJob = job;
      return newLots;
    });
  };

  const onClickLot = (index: number) => {
    setSelectedLotIndex(index);
  };

  const unselectLot = () => {
    setSelectedLotIndex(undefined);
  };

  return {
    lots,
    buildOnLot,
    removeJob,
    createJobOnLot,
    selectedLotIndex,
    onClickLot,
    unselectLot,
  };
};
