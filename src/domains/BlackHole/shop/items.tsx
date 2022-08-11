import { Item, ItemList } from "domains/BlackHole/sharedTypes";

export const items: Item[] = [
  {
    id: "1",
    name: "electron",
    mass: 9.1093837e-31,
    description: "One of the smallest things known to man",
    cost: 1,
  },
  {
    id: "2",
    name: "proton",
    mass: 1.67262192e-27,
    description: "Much bigger than an electron",
    cost: 1000,
  },
];

export const emptyInventory: ItemList[] = items.map((item) => {
  return {
    item,
    quantity: 0,
  };
});
