import styled from "@emotion/styled";
import { Item } from "domains/BlackHole/sharedTypes";
import * as React from "react";

type BlackHoleProps = {
  mass: number;
  incrementMass: (amount: number) => void;
  inventory: Item[];
  removeItemFromInventory: (index: number) => void;
};

const BlackHoleContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const BlackHole: React.VFC<BlackHoleProps> = ({
  mass,
  incrementMass,
  inventory,
  removeItemFromInventory,
}) => {
  return (
    <BlackHoleContainer>
      <div>current mass: {mass}</div>
      <img
        src={require("domains/BlackHole/assets/black-hole.jpeg")}
        alt={"black hole"}
      />
      {inventory.map((item, index) => {
        return (
          <button
            onClick={() => {
              removeItemFromInventory(index);
              incrementMass(item.mass);
            }}
          >
            Throw in 1 {item.name}
          </button>
        );
      })}
    </BlackHoleContainer>
  );
};
