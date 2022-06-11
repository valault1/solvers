import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import { InvestmentCalculatorController } from "domains/Calculators/controllers/InvestmentCalculatorController";
import { RetirementCalculatorController } from "domains/Calculators/controllers/RetirementCalculatorController";
import React from "react";

export const CalculatorsView = () => {
  const tabs = [
    {
      id: "investment-calc",
      label: "Investment Calculator",
      component: <InvestmentCalculatorController />,
    },
    {
      id: "retirement-calc",
      label: "Retirement Calculator",
      component: <RetirementCalculatorController />,
    },
  ];

  return (
    <MainContainer>
      <TabsComponent ariaLabel="calculators-tabs" tabs={tabs} />
    </MainContainer>
  );
};
