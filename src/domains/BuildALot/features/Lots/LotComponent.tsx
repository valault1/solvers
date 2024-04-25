import styled from "@emotion/styled";
import {
  BuildingIcon,
  EmptyLotIcon,
} from "domains/BuildALot/features/GameController/icons";
import { Lot } from "domains/BuildALot/sharedTypes";
import React from "react";

const LotWrapper = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));

export const LotComponent = ({ lot }: { lot: Lot }) => {
  return (
    <LotWrapper>
      {!lot.building && <EmptyLotIcon fontSize={"large"} />}
      {lot.building && <BuildingIcon fontSize={"large"} />}
    </LotWrapper>
  );
};
