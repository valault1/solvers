import styled from "@emotion/styled";
import { PrimaryButton } from "components/Form.elements";
import { MassDisplay } from "domains/BlackHole/components/MassDisplay";
import { Item, ItemList } from "domains/BlackHole/sharedTypes";
import * as React from "react";

type BlackHoleProps = {
  mass: number;
  incrementMass: (amount: number) => void;
  inventory: ItemList[];
  removeItemFromInventory: (item: Item) => void;
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
      <MassDisplay mass={mass} />
      <img
        src={require("domains/BlackHole/assets/black-hole.jpeg")}
        alt={"black hole"}
      />
      {inventory.map((itemList, index) => {
        return (
          <PrimaryButton
            disabled={itemList.quantity <= 0}
            onClick={() => {
              removeItemFromInventory(itemList.item);
              incrementMass(itemList.item.mass);
            }}
          >
            Throw in 1 {itemList.item.name} ({itemList.quantity} left)
          </PrimaryButton>
        );
      })}
    </BlackHoleContainer>
  );
};
