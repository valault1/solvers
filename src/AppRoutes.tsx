import { Login } from "domains/Auth/Login";
import { Battleship } from "domains/Battleship/Battleship";
import { GameController } from "domains/BuildALot/features/GameController/GameController";
import { CalculatorsView } from "domains/Calculators/CalculatorsView";
import { DysonSphereCalculator } from "domains/DysonSphere/DysonSphereCalculator";
import { ThirdWorldFarmerController } from "domains/FarmGame/ThirdWorldFarmerController";
import { MancalaController } from "domains/Mancala/MancalaController";
import { PhysicsCalculatorController } from "domains/Physics/PhysicsCalculatorsController";
import { HodokuPlayerV2 } from "domains/Queens/HodokuPlayerV2";
import { MultiplayerQueens } from "domains/Queens/MultiplayerQueens";
import { QueensSolver } from "domains/Queens/QueensSolver";
import { SelectLevel } from "domains/Queens/components/SelectLevel";
import { DailyHodoku } from "domains/Queens/subfeatures/DailyHodoku/controllers/DailyHodoku";
import { QueensTestCenter } from "domains/QueensTests/QueensTestCenter";
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
import { PATHS, PATHS_WITHOUT_SLASHES } from "shared/helpers/paths";
import { QueensPlayerPage } from "domains/Queens/QueensPlayerPage";

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
  { label: "Queens Player", element: <QueensPlayerPage />, isHidden: false },
  { label: "Test", element: <QueensTestCenter />, isHidden: true },
  {
    label: "Daily Hodoku",
    route: PATHS_WITHOUT_SLASHES.dailyHodoku,
    element: <DailyHodoku />,
    isHidden: false,
  },
  { label: "login", element: <Login />, isHidden: true },

  { label: "Wordle Solver", element: <WordleController /> },
  { label: "Queens Solver", element: <QueensSolver />, isHidden: false },
  { label: "Trap The Cat", element: <TrapTheCat /> },
  {
    label: "Rummikub Solver",
    route: "rummikub",
    element: <RummikubController />,
    isHidden: true,
  },

  { label: "Calculators", element: <CalculatorsView />, isHidden: true },
  { label: "Tic Tac Toe", element: <TicTacToeController /> },

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

  {
    label: "Dyson Sphere",
    element: <DysonSphereCalculator />,
    isHidden: true,
  },
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {NAVBAR_PAGES.map((page) => {
        const path = page.route || getRoute(page.label);
        return <Route path={path} element={page.element} key={path} />;
      })}
      <Route path={"/"} element={<DailyHodoku />} />
      <Route path={PATHS.levelSelect} element={<SelectLevel />} />
      <Route path={PATHS.multiplayerHodoku} element={<MultiplayerQueens />} />
      <Route path={PATHS.login} element={<Login />} />
    </Routes>
  );
};
