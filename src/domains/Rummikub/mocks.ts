import { TileData } from "domains/Rummikub/sharedTypes";
import nextId from "react-id-generator";

export const testBoard: TileData[][] = [
  [
    {
      id: "1",
      color: "blue",
      number: 6,
    },
    {
      id: "2",
      color: "blue",
      number: 7,
    },
    {
      id: "3",
      color: "blue",
      number: 8,
    },
    {
      id: "4",
      color: "blue",
      number: 9,
    },
  ],
  [
    {
      id: "5",
      color: "black",
      number: 6,
    },
    {
      id: "6",
      color: "red",
      number: 6,
    },
    {
      id: "7",
      color: "orange",
      number: 6,
    },
  ],
];

export const testYourTiles: TileData[] = [
  {
    id: "8",
    color: "blue",
    number: 5,
  },
  {
    id: "9",
    color: "blue",
    number: 6,
  },
  {
    id: "10",
    color: "blue",
    number: 7,
  },
];
