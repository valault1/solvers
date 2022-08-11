// items to feed the black hole
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Item, ItemList } from "domains/BlackHole/sharedTypes";
import { items } from "domains/BlackHole/shop/items";
import * as React from "react";

type MassDisplayProps = {
  mass: number;
};

const MassContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  width: 300,
  gap: 8,
}));

const massObjects = [
  {
    name: "electron",
    threshold: 0,
  },
  {
    name: "proton",
    threshold: 0,
  },
  {
    name: "The universe",
    threshold: 1e60,
  },
];

export const MassDisplay: React.VFC<MassDisplayProps> = ({ mass }) => {
  const getMassComparisonText = React.useMemo(() => {
    var objectToCompare = null;
    for (
      let i = 0;
      massObjects[i].threshold >= mass && i < massObjects.length;
      i++
    ) {
      objectToCompare = massObjects[i];
    }
    return objectToCompare
      ? `That's about as massive as a ${objectToCompare.name}`
      : "That's not very massive at all.";
  }, [mass]);
  return (
    <MassContainer>
      <div>Current mass:</div>
      <div>{mass} kg </div>
      <div>{getMassComparisonText}</div>
    </MassContainer>
  );
};
