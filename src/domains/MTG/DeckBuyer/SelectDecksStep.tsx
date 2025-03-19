import { Button, Card, Checkbox, Chip, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Deck } from "./DeckBuyerController";
import { BASE_URL } from "domains/MTG/constants";
import { PrimaryButton } from "components/Form.elements";

const USERNAME_STORAGE_KEY = "moxfield_username";

function SelectDecksStep({
  goToNextStep,
  setSelectedDecks,
}: {
  goToNextStep: () => void;
  setSelectedDecks: (decks: any[]) => void;
}) {
  const {
    storedValue: storedUsername,
    updateStoredValue: updateStoredUsername,
  } = useLocalStorage(USERNAME_STORAGE_KEY, "");

  const [username, setUsername] = React.useState<string>("");
  console.log({ username, storedUsername });
  const [decks, setDecks] = React.useState<Deck[]>([]);
  const fetchDecks = React.useCallback(() => {
    fetch(`${BASE_URL}getDecks?username=${storedUsername}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDecks(data?.decks || []);
      })
      .catch((e) => {
        console.log(`error: ${e}`);
      });
  }, [storedUsername]);

  useEffect(() => {
    if (storedUsername) {
      fetchDecks();
    }
  }, [storedUsername, fetchDecks]);

  const numSelectedDecks = React.useMemo(
    () => decks.filter((d) => d.selected).length,
    [decks]
  );

  return (
    <>
      {!storedUsername && (
        <>
          <div>Enter your Moxfield username to see your decks</div>
          <Stack direction="row">
            <TextField
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => {
                console.log("updating username...");
                updateStoredUsername(username);
              }}
            >
              save username
            </Button>
          </Stack>
        </>
      )}

      {!!storedUsername && (
        <Stack direction="column">
          <Stack direction="row" spacing={2} alignItems="center">
            <div>Logged in as {storedUsername}</div>
            <PrimaryButton onClick={() => updateStoredUsername("")}>
              clear username
            </PrimaryButton>
          </Stack>
          <br />
          <br />
          <Card sx={{ padding: 2 }}>
            <Stack direction="column" spacing={1}>
              <h2>Your decks</h2>
              {decks.map((d, idx) => (
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    checked={!!d.selected}
                    onChange={(e) => {
                      setDecks((prev) => {
                        const newDecks = [...prev];
                        newDecks[idx].selected = e.target.checked;

                        return newDecks;
                      });
                    }}
                  />
                  <Chip
                    label={d.name}
                    component="a"
                    rel="noopener noreferrer"
                    href={d.publicUrl}
                    variant="outlined"
                    clickable
                  />
                </Stack>
              ))}
              <PrimaryButton
                disabled={numSelectedDecks <= 0}
                onClick={() => {
                  setSelectedDecks(decks.filter((d) => d.selected));
                  goToNextStep();
                }}
              >
                View {numSelectedDecks} decks
              </PrimaryButton>
            </Stack>
          </Card>
        </Stack>
      )}
    </>
  );
}

export default SelectDecksStep;
