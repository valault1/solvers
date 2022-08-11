// items to feed the black hole
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Item, ItemList } from "domains/BlackHole/sharedTypes";
import { items } from "domains/BlackHole/shop/items";
import * as React from "react";

type ShopProps = {
  cash: number;
  inventory: ItemList[];
  addItemToInventory: (item: Item) => void;
  payForItem: (amount: number) => void;
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
  payForItem,
}) => {
  return (
    <ShopContainer>
      <div>current cash: ${cash}</div>
      <br></br>
      {items.map((item) => {
        return (
          <RowContainer>
            <Button
              variant="contained"
              disabled={item.cost > cash}
              onClick={() => {
                addItemToInventory(item);
                payForItem(item.cost);
              }}
            >
              Buy 1 {item.name}
              <br />${item.cost}
            </Button>
            <div>
              Owned:
              {
                inventory.find((itemList) => itemList.item.id === item.id)
                  ?.quantity
              }
            </div>
          </RowContainer>
        );
      })}
    </ShopContainer>
  );
};
