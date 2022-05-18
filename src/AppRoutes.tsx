import React from "react";
import { Route, Routes } from "react-router-dom";
import { Calculators } from "./domains/InvestmentCalculators/Calculators";
import { TheTowerController } from "./domains/TheTower/TheTowerController";
import { WordHuntController } from "./domains/WordHunt/WordHuntController";
import { WordleController } from "./domains/Wordle/WordleController";

type NavbarPage = {
  label: React.ReactNode;
  route: string;
};

export const NAVBAR_PAGES: NavbarPage[] = [
  { label: "Wordle Solver", route: "wordle" },
  { label: "Calculators", route: "calculators" },
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WordleController />} />
      <Route path="/wordhunt" element={<WordHuntController />} />
      <Route path="/wordle" element={<WordleController />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/*" element={<WordleController />}></Route>
    </Routes>
  );
};
