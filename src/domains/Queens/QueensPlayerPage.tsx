import useWindowDimensions from "domains/Queens/hooks/useWindowDimensions";
import { QueensPlayer } from "domains/Queens/QueensPlayer";
import { QueensPlayerMobile } from "domains/Queens/QueensPlayerMobile";
import * as React from "react";

export const QueensPlayerPage = () => {
  const { width } = useWindowDimensions();
  if (width < 500) return <QueensPlayerMobile />;
  return <QueensPlayer />;
};
