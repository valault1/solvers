import React from "react";
import { Game } from "../../shared/Game";
import { GameAndSolver } from "../../shared/GameAndSolverDisplay";

type WordleControllerProps = {};

export const WordleController = ({}: WordleControllerProps) => {
  return (
    <GameAndSolver
      solver={<div>wordle solver</div>}
      game={<Game title="Wordle"></Game>}
    ></GameAndSolver>
  );
};
