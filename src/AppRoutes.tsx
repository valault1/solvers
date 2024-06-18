import { Battleship } from "domains/Battleship/Battleship";
import { GameController } from "domains/BuildALot/features/GameController/GameController";
import { CalculatorsView } from "domains/Calculators/CalculatorsView";
import { ThirdWorldFarmerController } from "domains/FarmGame/ThirdWorldFarmerController";
import { MancalaController } from "domains/Mancala/MancalaController";
import { PhysicsCalculatorController } from "domains/Physics/PhysicsCalculatorsController";
import { QueensPlayer } from "domains/Queens/QueensPlayer";
import { QueensSolver } from "domains/Queens/QueensSolver";
import { RemoteController } from "domains/Remote/RemoteController";
import { ReviewsController } from "domains/Reviews/ReviewsController";
import { RummikubController } from "domains/Rummikub/RummikubController";
import { SubgroupsController } from "domains/Subgroups/SubgroupsController";
import { TicTacToeController } from "domains/TicTacToe/TicTacToeController";
import { TrapTheCat } from "domains/TrapTheCat/TrapTheCat";
import { Wordcounter } from "domains/Wordcounter/Wordcounter";
import { WordleController } from "domains/Wordle/WordleController";
import React from "react";
import { Route, Routes } from "react-router-dom";

type NavbarPage = {
  label: string;
  route?: string;
  isHidden?: boolean;
  element: React.ReactElement;
};

export function getRoute(label: string) {
  return label.toLowerCase().replace(/\s/g, "");
}

export const NAVBAR_PAGES: NavbarPage[] = [
  { label: "Wordle Solver", element: <WordleController /> },
  { label: "Queens Solver", element: <QueensSolver />, isHidden: false },
  { label: "Queens Player", element: <QueensPlayer />, isHidden: false },
  {
    label: "Rummikub Solver",
    route: "rummikub",
    element: <RummikubController />,
  },

  { label: "Calculators", element: <CalculatorsView /> },
  { label: "Tic Tac Toe", element: <TicTacToeController /> },
  { label: "Trap The Cat", element: <TrapTheCat /> },
  {
    label: "Wordcounter",
    element: <Wordcounter />,
    isHidden: false,
  },
  {
    label: "3rd World Farmer",
    route: "farmer",
    isHidden: true,
    element: <ThirdWorldFarmerController />,
  },
  { label: "Battleship", element: <Battleship />, isHidden: true },
  {
    label: "Mancala (WIP)",
    route: "mancala",
    element: <MancalaController />,
    isHidden: true,
  },
  {
    label: "Physics Calculators",
    route: "physics",
    element: <PhysicsCalculatorController />,
    isHidden: true,
  },
  { label: "Reviews", element: <ReviewsController />, isHidden: true },
  { label: "Remote", element: <RemoteController />, isHidden: true },
  { label: "BuildALot", element: <GameController />, isHidden: true },
  { label: "Subgroups", element: <SubgroupsController />, isHidden: false },
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {NAVBAR_PAGES.map((page) => {
        const path = page.route || getRoute(page.label);
        return <Route path={path} element={page.element} key={path} />;
      })}
      <Route path={"/"} element={<WordleController />} />
    </Routes>
  );
};
