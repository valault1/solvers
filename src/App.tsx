import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import { muiTheme, theme } from "./theme";
import { Calculators } from "./domains/Calculators/CalculatorsView";
import { WordHuntController } from "./domains/WordHunt/WordHuntController";
import { WordleController } from "./domains/Wordle/WordleController";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
      }}
    >
      <ThemeProvider theme={muiTheme}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<WordleController />} />
            <Route path="/wordhunt" element={<WordHuntController />} />
            <Route path="/wordle" element={<WordleController />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/*" element={<WordleController />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}
