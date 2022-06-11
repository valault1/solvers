import { Box, Tab, Tabs } from "@mui/material";
import { TabsWrapper } from "domains/Calculators/components/Calculator.elements";
import { InvestmentCalculatorController } from "domains/Calculators/controllers/InvestmentCalculatorController";
import { RetirementCalculatorController } from "domains/Calculators/controllers/RetirementCalculatorController";
import React from "react";
import { a11yProps, TabPanel } from "shared/tabHelpers";
import { theme } from "theme";
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
        <Tab label="Retirement Calculator" {...a11yProps(1)} />
      </Tabs>
      <TabsWrapper>
        <TabPanel value={value} index={0}>
          <InvestmentCalculatorController />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RetirementCalculatorController />
        </TabPanel>
      </TabsWrapper>
    </Box>
  );
};
