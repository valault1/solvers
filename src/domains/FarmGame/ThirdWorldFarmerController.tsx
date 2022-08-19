import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import * as React from "react";

export const ThirdWorldFarmerController: React.VFC = () => {
  const tabs = [
    {
      id: "farming",
      label: "Farming",
      component: <div> Farming tab </div>,
    },
    {
      id: "foraging",
      label: "Foraging",
      component: <div> Foraging tab </div>,
    },
    {
      id: "school",
      label: "School",
      component: <div> School tab </div>,
    },
    {
      id: "military",
      label: "Military",
      component: <div> Military tab </div>,
    },
    {
      id: "fishing",
      label: "Fishing",
      component: <div> Fishing tab </div>,
    },
    {
      id: "cooking",
      label: "Cooking",
      component: <div> Cooking tab </div>,
    },
  ];

  return (
    <MainContainer>
      <TabsComponent ariaLabel="calculators-tabs" tabs={tabs} />
    </MainContainer>
  );
};
