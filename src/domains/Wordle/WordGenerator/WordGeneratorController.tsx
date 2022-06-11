import { Button, Checkbox, Dialog, TextField } from "@mui/material";
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogWord,
  WordGeneratorContainer,
} from "domains/Wordle/Wordle.elements";
import { findWordsWithLetters } from "domains/Wordle/WordleSolver/nextGuessCalculator";
import { InputRow } from "components/Form.elements";

type WordGeneratorProps = {};

export const WordGenerator = ({}: WordGeneratorProps) => {
  const [letters, setLetters] = React.useState("");
  const [showGenerator, setShowGenerator] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState([]);

  const handleSubmit = () => {
    setDialogContent(findWordsWithLetters(letters));
    setShowDialog(true);
  };

  return (
    <WordGeneratorContainer>
      <div>
        <Checkbox
          value={letters}
          onChange={(event, checked) => setShowGenerator(checked)}
        />
        Need to find a word with certain letters, to rule out some options?
      </div>

      {showGenerator && (
        <InputRow>
          <TextField
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Find possible Words
          </Button>
        </InputRow>
      )}

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogContent>
          <DialogHeader>Words with letters "{letters}"</DialogHeader>
          {dialogContent.map((word) => (
            <DialogWord>{word}</DialogWord>
          ))}
        </DialogContent>
      </Dialog>
    </WordGeneratorContainer>
  );
};
