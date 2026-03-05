import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { muiTheme } from "./components/theme/theme";
import { AppLayout } from "./AppLayout";

export default function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}
