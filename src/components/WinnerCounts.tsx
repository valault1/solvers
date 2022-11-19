import * as React from "react";
import { Winner } from "shared/hooks/useWinnerCounts";

const getWinnerCountText = (winner: Winner) => {
  if (winner === "COMPUTER") return "Computer wins:";
  if (winner === "PLAYER1_AGAINST_COMP") return "Your Wins:";
  if (winner === "TIE_AGAINST_COMP") return "ties:";
  if (winner === "PLAYER1") return "User 1 wins:";
  if (winner === "PLAYER2") return "User 2 wins:";
  if (winner === "TIE") return "ties:";
  else return "";
};

export const WinnerCounts = ({
  winnerCounts,
  hideTies = false,
}: {
  winnerCounts: {
    [key: string]: number;
  };
  hideTies?: boolean;
}) => {
  const winPercentage =
    winnerCounts["PLAYER1_AGAINST_COMP"] /
    (winnerCounts["PLAYER1_AGAINST_COMP"] + winnerCounts["COMPUTER"]);
  const winPercentageString = winPercentage
    ? Number(winPercentage).toLocaleString(undefined, {
        style: "percent",
      })
    : "";
  return (
    <>
      {Object.keys(winnerCounts).map((winnerType) => {
        if (
          hideTies &&
          (winnerType === "TIE_AGAINST_COMP" || winnerType === "TIE")
        )
          return null;
        return (
          <div key={winnerType}>
            {`${getWinnerCountText(winnerType)} ${winnerCounts[winnerType]}`}
          </div>
        );
      })}
      {winPercentageString && (
        <div key="WinPercent">Win percentage: {winPercentageString}</div>
      )}
    </>
  );
};
