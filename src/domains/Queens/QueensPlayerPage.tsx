import useWindowDimensions from "domains/Queens/hooks/useWindowDimensions";
import { QueensPlayer } from "domains/Queens/QueensPlayer";
import { QueensPlayerMobile } from "domains/Queens/QueensPlayerMobile";
import * as React from "react";

export const QUEENS_MOBILE_WIDTH_THRESHOLD = 500;

export const QueensPlayerPage = () => {
  const { width } = useWindowDimensions();
  if (width < QUEENS_MOBILE_WIDTH_THRESHOLD) return <QueensPlayerMobile />;
  return <QueensPlayer />;
};
