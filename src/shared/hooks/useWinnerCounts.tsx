import * as React from "react";

export const MultiplayerWinners: {
  [key: string]: string;
} = {
  PLAYER1: "PLAYER1",
  PLAYER2: "PLAYER2",
  TIE: "TIE",
};

export const SinglePlayerWinners: {
  [key: string]: string;
} = {
  PLAYER1_AGAINST_COMP: "PLAYER1_AGAINST_COMP",
  COMPUTER: "COMPUTER",
  TIE_AGAINST_COMP: "TIE_AGAINST_COMP",
};

export const AnyGameWinners: {
  [key: string]: string;
} = {
  NONE: "NONE",
};

export const Winners = {
  ...SinglePlayerWinners,
  ...MultiplayerWinners,
  ...AnyGameWinners,
};
export type Winner = keyof typeof Winners;

export enum GenericWinner {
  PLAYER1 = "PLAYER1",
  PLAYER2 = "PLAYER2",
  TIE = "TIE",
  NONE = "NONE",
}

export const getWinnerText = (winner: Winner) => {
  if (winner === "COMPUTER") return "Computer wins!";
  if (winner === "PLAYER1_AGAINST_COMP") return "You win!";
  if (winner === "TIE_AGAINST_COMP") return "It's a tie!";
  if (winner === "PLAYER1") return "User 1 wins!";
  if (winner === "PLAYER2") return "User 2 wins!";
  if (winner === "TIE") return "It's a tie!";
  else return "";
};

export type EvaluateWinnerFunction = ({
  board,
  player1Symbol,
  player2Symbol,
}: {
  board: any;
  player1Symbol: any;
  player2Symbol: any;
}) => GenericWinner;

let initialCounts: {
  [key: string]: number;
} = {};
Object.values(Winners).forEach((winnerType) => {
  initialCounts[winnerType] = 0;
});
delete initialCounts["NONE"];

export function useWinnerCounts({
  board,
  player1Symbol,
  player2Symbol,
  evaluateWinner,
  isMultiplayer,
}: {
  board: any;
  player1Symbol: any;
  player2Symbol: any;
  evaluateWinner: EvaluateWinnerFunction;
  isMultiplayer?: boolean;
}) {
  const [currentWinner, setCurrentWinner] = React.useState<Winner>("NONE");
  const gameIsOver = currentWinner !== Winners.NONE;
  const [winnerCounts, setWinnerCounts] = React.useState(initialCounts);

  const incrementCount = (s: Winner) => {
    setWinnerCounts((prev) => {
      let newCounts = { ...prev };
      newCounts[s] += 1;
      return newCounts;
    });
  };
  // When currentWinner changes, add to the counts
  React.useEffect(() => {
    if (currentWinner === Winners.NONE) return;
    console.log("Incrementing winner count");
    incrementCount(currentWinner);
  }, [currentWinner]);

  // Shows only the applicable winner counts
  const visibleWinnerCounts = React.useMemo(() => {
    let result: {
      [key: string]: number;
    } = {};
    Object.keys(winnerCounts).forEach((winnerType) => {
      if (isMultiplayer && SinglePlayerWinners[winnerType]) return;
      else if (!isMultiplayer && MultiplayerWinners[winnerType]) return;
      result[winnerType] = winnerCounts[winnerType];
    });
    return result;
  }, [winnerCounts, isMultiplayer]);

  const mapGenericWinnerToWinner: (
    result: GenericWinner,
    isMultiplayer?: boolean
  ) => Winner = (result, isMultiplayer) => {
    switch (result) {
      case GenericWinner.PLAYER1:
        return isMultiplayer ? "PLAYER1" : "PLAYER1_AGAINST_COMP";
      case GenericWinner.PLAYER2:
        return isMultiplayer ? "PLAYER2" : "COMPUTER";
      case GenericWinner.NONE:
        return "NONE";
      case GenericWinner.TIE:
        return "TIE";
    }
  };

  const checkForWinner = () => {
    let genericWinner = evaluateWinner({ board, player1Symbol, player2Symbol });
    let winner = mapGenericWinnerToWinner(genericWinner, isMultiplayer);
    setCurrentWinner(winner);
  };

  return {
    winnerCounts: visibleWinnerCounts,
    currentWinner,
    checkForWinner,
    winnerText: getWinnerText(currentWinner),
  };
}
