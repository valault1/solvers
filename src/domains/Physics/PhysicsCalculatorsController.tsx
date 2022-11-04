import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import { KinematicsCalculator } from "domains/Physics/KinematicsCalculator";
import * as React from "react";

export const PhysicsCalculatorController: React.VFC = () => {
  const tabs = [
    {
      id: "kinematics",
      label: "Kinematics Calculator",
      component: <KinematicsCalculator />,
    },
  ];

  return (
    <MainContainer>
      <TabsComponent ariaLabel="physics-tabs" tabs={tabs} />
    </MainContainer>
  );
};
