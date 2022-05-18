import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { TabsWrapper } from "../../shared/GameAndSolverDisplay.elements";
import { TabPanel, a11yProps } from "../../shared/tabHelpers";
import { theme } from "../../theme";
import { InvestmentCalculatorController } from "./controllers/InvestmentCalculatorController";

type CalculatorsProps = {};

export const Calculators = ({}: CalculatorsProps) => {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ width: "100%", color: theme.colors.textPrimary }}>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        aria-label="Calculator tabs"
        centered
      >
        <Tab label="Investment Calculator" {...a11yProps(0)} />
        <Tab label="Stock Analyzer" {...a11yProps(1)} />
      </Tabs>
      <TabsWrapper>
        <TabPanel value={value} index={0}>
          <InvestmentCalculatorController />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Stock Analyzer
        </TabPanel>
      </TabsWrapper>
    </Box>
  );
};
