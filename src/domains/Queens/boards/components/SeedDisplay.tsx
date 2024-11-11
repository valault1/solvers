import { MainContainer } from "components/MainPage.elements";
import { readSeeds } from "domains/Queens/boards/SeedManager/helpers/readSeeds";
import { Seed } from "domains/Queens/boards/SeedManager/sharedTypes";
import * as React from "react";

export const SeedDisplay = ({ seed }: { seed: Seed }) => {
  return <div>{seed.value}</div>;
};
