import {
  getCatCoords,
  getPossibleCatMoves,
} from "domains/TrapTheCat/helpers/makeCatMove";
import {
  HexBoard,
  CAT_BOARD_HEIGHT,
  CAT_BOARD_WIDTH,
} from "domains/TrapTheCat/sharedTypes";
import { GenericWinner } from "shared/hooks/useWinnerCounts";

export const trapTheCatCheckForWinner = ({ board }: { board: HexBoard }) => {
  let catCoords = getCatCoords({ board });
  // check if the cat can move
  let possibleMoves = getPossibleCatMoves({ board, catCoords });
  if (possibleMoves.length === 0) return GenericWinner.PLAYER1;
  if (
    catCoords[0] === 0 ||
    catCoords[0] === CAT_BOARD_HEIGHT - 1 ||
    catCoords[1] === 0 ||
    catCoords[1] === CAT_BOARD_WIDTH - 1
  ) {
    return GenericWinner.PLAYER2;
  }

  return GenericWinner.NONE;
};
