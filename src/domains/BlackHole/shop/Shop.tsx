// items to feed the black hole
import styled from "@emotion/styled";
import { Item } from "domains/BlackHole/sharedTypes";
import { items } from "domains/BlackHole/shop/items";
import * as React from "react";

type ShopProps = {
  cash: number;
  inventory: Item[];
  addItemToInventory: (item: Item) => void;
};

const ShopContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  width: 300,
  gap: 8,
}));

const RowContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  width: "100%",
}));

export const Shop: React.VFC<ShopProps> = ({
  cash,
  inventory,
  addItemToInventory,
}) => {
  return (
    <ShopContainer>
      <div>current cash: {cash}</div>
      <br></br>
      {items.map((item) => {
        return (
          <RowContainer>
            <button onClick={() => addItemToInventory(item)}>
              Buy 1 {item.name}
            </button>
            <div>
              Owned:
              {inventory.filter((a) => a.name === item.name).length}
            </div>
          </RowContainer>
        );
      })}
    </ShopContainer>
  );
};
