import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import { AppRoutes } from "./AppRoutes";
import { muiTheme, theme } from "./theme";
import { Calculators } from "./domains/InvestmentCalculators/Calculators";
import { WordHuntController } from "./domains/WordHunt/WordHuntController";
import { WordleController } from "./domains/Wordle/WordleController";

export default function App() {
  return (
    <div style={{ backgroundColor: theme.colors.background }}>
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

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
