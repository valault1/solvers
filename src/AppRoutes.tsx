import { MainContainer } from "components/MainPage.elements";
import { Battleship } from "domains/Battleship/Battleship";
import { CalculatorsView } from "domains/Calculators/CalculatorsView";
import { ThirdWorldFarmerController } from "domains/FarmGame/ThirdWorldFarmerController";
import { MancalaController } from "domains/Mancala/MancalaController";
import { PhysicsCalculatorController } from "domains/Physics/PhysicsCalculatorsController";
import { ReviewsController } from "domains/Reviews/ReviewsController";
import { RummikubController } from "domains/Rummikub/RummikubController";
import { TicTacToeController } from "domains/TicTacToe/TicTacToeController";
import { TrapTheCat } from "domains/TrapTheCat/TrapTheCat";
import { Wordcounter } from "domains/Wordcounter/Wordcounter";
import { WordHuntController } from "domains/WordHunt/WordHuntController";
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
    isHidden: true,
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
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {NAVBAR_PAGES.map((page) => (
        <Route
          path={page.route || getRoute(page.label)}
          element={page.element}
        />
      ))}
      <Route path={"/"} element={<WordleController />} />
      {/* <Route path="/" element={<WordleController />} />
      <Route path="/wordhunt" element={<WordHuntController />} />
      <Route path="/wordle" element={<WordleController />} />
      <Route path="/calculators" element={<CalculatorsView />} />
      <Route path="/farmer" element={<ThirdWorldFarmerController />} />
      <Route
        path="/reviews"
        element={
          <MainContainer>
            <ReviewsController />
          </MainContainer>
        }
      />
      <Route path="/tictactoe" element={<TicTacToeController />} />
      <Route path="/trapthecat" element={<TrapTheCat />} />
      <Route path="/mancala" element={<MancalaController />} />
      <Route path="/rummikub" element={<RummikubController />} />
      <Route path="/physics" element={<PhysicsCalculatorController />} />

      <Route path="/battleship" element={<Battleship />} />
      <Route path="/*" element={<WordleController />}></Route> */}
    </Routes>
  );
};
