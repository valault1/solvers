import { Stack } from '@mui/material';
import React from 'react';
import SelectDecksStep from './SelectDecksStep';
import { StockListStep } from './StockListStep';

export type Card = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Deck = {
  id: string;
  name: string;
  publicUrl: string;
  cards?: Card[];
  selected?: boolean;
  totalPrice?: number;
  numCards?: number;
};

export function DeckBuyerController() {
  const [step, setStep] = React.useState(0);
  const [decks, setDecks] = React.useState<Deck[]>([]);

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const goToPrevStep = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      width="100%"
      paddingTop={5}
    >
      {step === 0 && (
        <SelectDecksStep
          goToNextStep={goToNextStep}
          setSelectedDecks={setDecks}
        />
      )}
      {step === 1 && (
        <StockListStep
          goToNextStep={goToNextStep}
          goToPrevStep={goToPrevStep}
          selectedDecks={decks}
        />
      )}
    </Stack>
  );
}
