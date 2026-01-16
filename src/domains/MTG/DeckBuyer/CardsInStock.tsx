import { Stack } from "@mui/material";
import React from "react";
import { Deck } from "./DeckBuyerController";
import { StockList } from "./StockList";
import { STORE_NAMES, useCardStocks } from "./hooks/useCardStocks";

export function CardsInStock({ decks }: { decks: Deck[] }) {
  const { stockByStore, numCardsRequested, numCardsFoundInStock } =
    useCardStocks({ decks });

  return (
    <Stack direction="column">
      <div>Total cards needed: {numCardsRequested} </div>
      <div>Total cards found in stock: {numCardsFoundInStock} </div>
      <Stack direction="row" width="100%" spacing={2}>
        {STORE_NAMES.map((storeName, index) => (
          <Stack flex={1}>
            <StockList
              storeName={storeName}
              cards={stockByStore[index]?.cards || []}
              // isLoading={loadings[index]}
              timeToQuery={stockByStore[index]?.timeToQuery}
            />
          </Stack>
        ))}
        <Stack flex={1}>
          <StockList
            storeName="Cards not in stock at either"
            cards={stockByStore.at(-1)?.cards || []}
            // isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
