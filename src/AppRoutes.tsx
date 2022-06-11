import { Calculators } from "domains/Calculators/CalculatorsView";
import { FoodPickerController } from "domains/FoodPicker/WordHuntController";
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
  { label: "Calculators", route: "calculators" },
  { label: "Food Picker", route: "food" },
  { label: "Fake Tab", route: "fake" },
];
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WordleController />} />
      <Route path="/wordhunt" element={<WordHuntController />} />
      <Route path="/wordle" element={<WordleController />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/food" element={<FoodPickerController />} />
      <Route path="/fake" element={<div> fake tab ;) </div>} />
      <Route path="/*" element={<WordleController />}></Route>
    </Routes>
  );
};
