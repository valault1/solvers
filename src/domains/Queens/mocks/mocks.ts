import { rotateBoard } from "domains/Queens/helpers/parseBoard";
import { BlankBoard, BoardColor } from "domains/Queens/sharedTypes";

const repeated = (color: BoardColor, num: number) => {
  return Array(num).fill(color);
};

export const MOCK_BLANK_BOARD: BlankBoard = rotateBoard([
  [...repeated("lightBlue", 3), ...repeated("yellow", 6)],
  [
    ...repeated("lightBlue", 1),
    ...repeated("lightOrange", 1),
    ...repeated("lightBlue", 1),
    ...repeated("red", 2),
    ...repeated("yellow", 1),
    ...repeated("red", 2),
    ...repeated("yellow", 1),
  ],
  [
    ...repeated("lightBlue", 1),
    ...repeated("lightOrange", 2),
    ...repeated("red", 5),
    ...repeated("yellow", 1),
  ],
  [
    ...repeated("purple", 3),
    ...repeated("gray", 1),
    ...repeated("lightGreen", 1),
    ...repeated("gray", 1),
    ...repeated("red", 2),
    ...repeated("yellow", 1),
  ],
  [
    ...repeated("purple", 3),
    ...repeated("gray", 1),
    ...repeated("lightGreen", 1),
    ...repeated("gray", 1),
    ...repeated("yellow", 3),
  ],
  [...repeated("purple", 3), ...repeated("gray", 3), ...repeated("yellow", 3)],
  [...repeated("purple", 6), ...repeated("pink", 2), ...repeated("teal", 1)],
  [
    ...repeated("purple", 6),
    ...repeated("teal", 1),
    ...repeated("pink", 1),
    ...repeated("teal", 1),
  ],
  [...repeated("purple", 6), ...repeated("teal", 3)],
]);
