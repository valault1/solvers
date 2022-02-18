import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { theme } from "../theme";
import { TabsWrapper } from "./GameAndSolverDisplay.elements";

type GameAndSolverProps = {
  game: React.ReactNode;
  solver: React.ReactNode;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const GameAndSolver = ({ game, solver }: GameAndSolverProps) => {
  const [value, setValue] = React.useState(0);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // Helps set ids and aria-controls (for accessibility)
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", color: theme.colors.textPrimary }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Game and Solver tabs"
        centered
      >
        <Tab label="Game" {...a11yProps(0)} />
        <Tab label="Solver" {...a11yProps(1)} />
      </Tabs>
      <TabsWrapper>
        <TabPanel value={value} index={0}>
          {game}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {solver}
        </TabPanel>
      </TabsWrapper>
    </Box>
  );
};
