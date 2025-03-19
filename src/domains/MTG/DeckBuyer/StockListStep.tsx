import {
  Button,
  Checkbox,
  Stack,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Deck } from "./DeckBuyerController";
import { CollapsibleCard } from "./CollapsibleCard";
import { StoreStocks } from "./StoreStocks";
import { BASE_URL } from "domains/MTG/constants";
import { PrimaryButton } from "components/Form.elements";

const basicLands = ["Plains", "Island", "Swamp", "Mountain", "Forest"].map(
  (l) => l.toLowerCase()
);

const isBasicLand = (card: any) => basicLands.includes(card.name.toLowerCase());

export function dollar(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const CardDisplay = ({
  card,
  isCommander,
}: {
  card: any;
  isCommander?: boolean;
}) => {
  return (
    <Stack direction="row">
      <div>
        {card.quantity} x {card.name}
        {isCommander ? " (Commander)" : ""} - {dollar(card.price)}
      </div>
    </Stack>
  );
};

export const StockListStep = ({
  goToNextStep,
  goToPrevStep,
  selectedDecks,
}: {
  goToNextStep: VoidFunction;
  goToPrevStep: VoidFunction;
  selectedDecks: Deck[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldIncludeLands, setShouldIncludeLands] = useState(false);
  const [fullDecks, setFullDecks] = useState([]);

  const decksWithCards: Deck[] = React.useMemo(() => {
    if (fullDecks.length === 0) return [];
    return fullDecks.map((d) => {
      const cards = [...d.commanders, ...d.mainboard].filter(
        (c) => shouldIncludeLands || !isBasicLand(c)
      );
      const totalPrice = cards.reduce(
        (acc: number, c: any) => acc + (c.price ?? 0) * c.quantity,
        0
      );
      const numCards = cards.reduce(
        (acc: number, c: any) => acc + c.quantity,
        0
      );
      return {
        ...d,
        cards,
        totalPrice,
        numCards,
      };
    });
  }, [fullDecks, shouldIncludeLands]);

  React.useEffect(() => {
    // query the cards from each deck
    setIsLoading(true);
    fetch(
      `${BASE_URL}getCardsFromDecks?decks=${selectedDecks.map((d) => d.id)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ deckData: data });
        setFullDecks(data?.decks || []);
        setIsLoading(false);
      });
  }, [selectedDecks]);
  return (
    <Stack direction="column" spacing={2}>
      <PrimaryButton onClick={goToPrevStep}>Back</PrimaryButton>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={shouldIncludeLands}
                onChange={(e) => setShouldIncludeLands(e.target.checked)}
              />
            }
            label="Include basic lands"
          />

          {decksWithCards
            ? decksWithCards.map((d) => {
                return (
                  <CollapsibleCard
                    title={
                      <b>
                        {d.name} - {dollar(d.totalPrice)} - {d.numCards} cards{" "}
                      </b>
                    }
                    content={
                      <Stack direction="column">
                        {d.cards.map((c: any) => (
                          <CardDisplay card={c} />
                        ))}
                      </Stack>
                    }
                  />
                );
              })
            : selectedDecks.map((d) => (
                <div>
                  {d.name} ({d.id})
                </div>
              ))}
        </>
      )}
      {decksWithCards.length >= 1 && <StoreStocks decks={decksWithCards} />}
    </Stack>
  );
};
