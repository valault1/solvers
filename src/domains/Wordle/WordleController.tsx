import React from "react";
import { Game } from "../../shared/Game";
import { GameAndSolver } from "../../shared/GameAndSolverDisplay";
import { theme } from "../../theme";
import { WordleSolver } from "./WordleSolver";

type WordleControllerProps = {};

export const WordleController = ({}: WordleControllerProps) => {
  return <WordleSolver />;
};
