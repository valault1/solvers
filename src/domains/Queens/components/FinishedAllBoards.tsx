import { CircularProgress, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { getSeeds } from "domains/Queens/boards/seeds";
import { resetBoards } from "domains/Queens/helpers/localStorageHelper";
import { SEED_INDEX_PARAM } from "domains/Queens/hooks/useNavigateBoards";
import * as React from "react";
import { useSearchParams } from "react-router-dom";

export const FinishedAllBoards = ({ boardSize }: { boardSize: number }) => {
  const [didClickButton, setDidClickButton] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRemoveParam = React.useCallback(
    (paramName: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(paramName);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );
  const numBoards = getSeeds(boardSize).length;

  const resetAllBoards = React.useCallback(() => {
    console.log("resetting boards...");
    resetBoards({ boardSize });
    handleRemoveParam(SEED_INDEX_PARAM);
    for (let i = 0; i < 10000000000; i++) {}
    window.location.reload();
  }, [boardSize, handleRemoveParam]);

  React.useEffect(() => {
    if (didClickButton) {
      setTimeout(() => resetAllBoards(), 100);
    }
  }, [didClickButton, resetAllBoards]);

  return (
    <Stack spacing={4} marginLeft={4} marginRight={4}>
      You solved all {numBoards} boards of size {boardSize}x{boardSize}!
      <br />
      <br />
      Click the button below to reset all {boardSize}x{boardSize} boards and
      start over.
      <PrimaryButton
        onClick={() => setDidClickButton(true)}
        disabled={didClickButton}
      >
        Reset all boards
      </PrimaryButton>
      {didClickButton && (
        <Stack direction="column" width="100%" alignItems="center" spacing={2}>
          <div>Resetting all boards...</div>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};
