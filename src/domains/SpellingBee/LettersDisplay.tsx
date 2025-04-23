import styled from "@emotion/styled";
import { HexagonFlower } from "domains/SpellingBee/LettersDisplayV2";
import React from "react";

const HexagonWrapper = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HexagonShape = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e9ab17;
  color: black;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;
export const LettersDisplay = ({ letters }: { letters: string }) => {
  return <HexagonFlower letters={letters} />;
};
