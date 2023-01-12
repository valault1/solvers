import * as React from "react";

export const useScores = ({
  hasWon,
  initialHighScore,
  higherIsBetter = true,
}: {
  hasWon: boolean;
  initialHighScore: number;
  higherIsBetter?: boolean;
}) => {
  const [highScore, setHighScore] = React.useState(initialHighScore);
  const [currentScore, setCurrentScore] = React.useState(0);

  React.useEffect(() => {
    if (hasWon) {
      if (
        (higherIsBetter && currentScore > highScore) ||
        (!higherIsBetter && currentScore < highScore && currentScore !== 0)
      ) {
        setHighScore(currentScore);
      }
    }
  }, [hasWon, setHighScore, currentScore, highScore, higherIsBetter]);

  const incrementScore = () => {
    setCurrentScore((prev) => prev + 1);
  };
  const resetMoveCount = () => {
    setCurrentScore(0);
  };
  return {
    incrementScore,
    resetMoveCount,
    currentScore,
    highScore,
  };
};
