import { solveBoard } from "domains/Queens/helpers/solveBoard";
import { BlankBoard, Board } from "domains/Queens/sharedTypes";
import * as React from "react";

export const useAsyncSolveBoard = ({
  blankBoard,
}: {
  blankBoard: BlankBoard;
}) => {
  const [solvedBoard, setSolvedBoard] = React.useState<Board>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const result = solveBoard(blankBoard);
      setSolvedBoard(result);
      setLoading(false);
    });
  }, [blankBoard]);
  return {
    loading,
    solvedBoard,
  };
};
