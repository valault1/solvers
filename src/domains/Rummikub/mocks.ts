import { TileData } from "domains/Rummikub/sharedTypes";
import nextId from "react-id-generator";

export const testBoard1: TileData[][] = [
  [
    {
      id: "zzz",
      color: "blue",
      number: 6,
    },
    {
      id: "zzx",
      color: "blue",
      number: 7,
    },
    {
      id: "zzy",
      color: "blue",
      number: 8,
    },
    {
      id: "zzw",
      color: "blue",
      number: 9,
    },
  ],
  [
    {
      id: "zzu",
      color: "black",
      number: 6,
    },
    {
      id: "zzv",
      color: "red",
      number: 6,
    },
    {
      id: "zzt",
      color: "orange",
      number: 6,
    },
  ],
];

export const testYourTiles1: TileData[] = [
  {
    id: "zzs",
    color: "blue",
    number: 5,
  },
  {
    id: "zzr",
    color: "blue",
    number: 6,
  },
  {
    id: "zzq",
    color: "blue",
    number: 7,
  },
];

export const testBoard2: TileData[][] = [
  ...testBoard1,
  [
    {
      id: "zcq",
      color: "black",
      number: 5,
    },
    {
      id: "zbq",
      color: "red",
      number: 5,
    },
    {
      id: "zaq",
      color: "orange",
      number: 5,
    },
  ],
  [
    {
      id: "zxq",
      color: "black",
      number: 7,
    },
    {
      id: "zyq",
      color: "red",
      number: 7,
    },
    {
      id: "zwq",
      color: "orange",
      number: 7,
    },
  ],
];

export const testMove: TileData[] = [
  {
    id: "zzv",
    color: "red",
    number: 6,
  },
  {
    id: "zzt",
    color: "orange",
    number: 6,
  },
  {
    id: "zzr",
    color: "blue",
    number: 6,
  },
];
