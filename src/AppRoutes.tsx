import { MainContainer } from "components/MainPage.elements";
import { CalculatorsView } from "domains/Calculators/CalculatorsView";
import { ThirdWorldFarmerController } from "domains/FarmGame/ThirdWorldFarmerController";
import { PhysicsCalculatorController } from "domains/Physics/PhysicsCalculatorsController";
import { ReviewsController } from "domains/Reviews/ReviewsController";
import { RummikubController } from "domains/Rummikub/RummikubController";
import { WordHuntController } from "domains/WordHunt/WordHuntController";
import { WordleController } from "domains/Wordle/WordleController";
import React from "react";
import { Route, Routes } from "react-router-dom";

type NavbarPage = {
  label: React.ReactNode;
  route: string;
};

export const NAVBAR_PAGES: NavbarPage[] = [
  { label: "Wordle Solver", route: "wordle" },
  { label: "Rummikub Solver", route: "rummikub" },
  //{ label: "3rd World Farmer", route: "farmer" },
  { label: "Retirement Calculators", route: "calculators" },
  { label: "Physics Calculators", route: "physics" },
  //{ label: "Reviews", route: "reviews" },
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WordleController />} />
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
      <Route path="/rummikub" element={<RummikubController />} />
      <Route path="/physics" element={<PhysicsCalculatorController />} />
      <Route path="/*" element={<WordleController />}></Route>
    </Routes>
  );
};
