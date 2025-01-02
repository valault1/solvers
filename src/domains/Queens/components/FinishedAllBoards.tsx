import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { getSeeds } from "domains/Queens/boards/seeds";
import { resetBoards } from "domains/Queens/helpers/localStorageHelper";
import { SEED_INDEX_PARAM } from "domains/Queens/hooks/useNavigateBoards";
import * as React from "react";
import { useSearchParams } from "react-router-dom";

export const FinishedAllBoards = ({ boardSize }: { boardSize: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRemoveParam = (paramName: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(paramName);
    setSearchParams(newParams);
  };
  const numBoards = getSeeds(boardSize).length;

  const resetAllBoards = () => {
    console.log("resetting boards...");
    resetBoards({ boardSize });
    handleRemoveParam(SEED_INDEX_PARAM);
    window.location.reload();
  };

  return (
    <Stack spacing={4} marginLeft={4} marginRight={4}>
      You solved all {numBoards} boards of size {boardSize}x{boardSize}!
      <br />
      <br />
      Click the button below to reset all {boardSize}x{boardSize} boards and
      start over.
      <PrimaryButton onClick={resetAllBoards}> Reset all boards</PrimaryButton>
    </Stack>
  );
};
