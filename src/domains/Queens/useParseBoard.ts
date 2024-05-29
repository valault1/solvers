import { PixelArray } from "domains/Queens/useImageParsing";

export type Token = "Q" | "X" | "";
export type Board = Token[][];

export const useParseBoard = ({ pixelArray }: { pixelArray: PixelArray }) => {
  const board: Board = [];
  return { board };
};
