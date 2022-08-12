export type Item = {
  id: string;
  mass: number;
  description: string;
  name: string;
  cost: number;
  source?: string;
};

export type ItemList = {
  item: Item;
  quantity: number;
};
