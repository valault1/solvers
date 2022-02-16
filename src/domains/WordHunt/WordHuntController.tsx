import React from "react";
import { Game } from "../../shared/Game";
import { GameAndSolver } from "../../shared/GameAndSolverDisplay";

type WordHuntControllerProps = {};

export const WordHuntController = ({}: WordHuntControllerProps) => {
  return (
    <GameAndSolver
      solver={<div>Word Hunt Solver</div>}
      game={<Game title="Word Hunt"></Game>}
    ></GameAndSolver>
  );
};
