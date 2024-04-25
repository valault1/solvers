import { DetailsPaneState } from "domains/BuildALot/sharedTypes";
import React from "react";

export const useDetailsPaneState = ({
  onClickLot,
  unselectLot,
}: {
  onClickLot: (index: number) => void;
  unselectLot: () => void;
}) => {
  const [detailsPaneState, setDetailsPaneState] =
    React.useState<DetailsPaneState>("infoScreen");

  const clickLotHandler = (index: number) => {
    onClickLot(index);
    setDetailsPaneState("lotActions");
  };

  const unselectLotHandler = () => {
    unselectLot();
    setDetailsPaneState("infoScreen");
  };

  const lumberShopClickHandler = () => {
    setDetailsPaneState("lumberShop");
    unselectLot();
  };
  const workshopClickHandler = () => {
    setDetailsPaneState("workshop");
    unselectLot();
  };
  const blueprintsClickHandler = () => {
    setDetailsPaneState("blueprints");
    unselectLot();
  };

  return {
    detailsPaneState,
    lumberShopClickHandler,
    workshopClickHandler,
    blueprintsClickHandler,
    unselectLotHandler,
    clickLotHandler,
    setDetailsPaneState,
  };
};
