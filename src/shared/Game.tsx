import { Card } from "@mui/material";
import React from "react";
import { GameWrapper } from "./Game.elements";

export type GameProps = {
  title: string;
};

export const Game = ({ title }: GameProps) => {
  return <GameWrapper>{title}</GameWrapper>;
};
