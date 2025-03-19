import { Stack } from "@mui/material";
import React from "react";
import { Deck } from "./DeckBuyerController";
import { StockList } from "./StockList";
import { STORE_NAMES, useCardStocks } from "./hooks/useCardStocks";

export function StoreStocks({ decks }: { decks: Deck[] }) {
  const {
    isLoading,
    loadings,
    stockInOrder,
    numCardsRequested,
    numCardsFoundInStock,
  } = useCardStocks({ decks });

  return (
    <Stack direction="column">
      <div>Total cards needed: {numCardsRequested} </div>
      <div>Total cards found in stock: {numCardsFoundInStock} </div>
      <Stack direction="row" width="100%" spacing={2}>
        {STORE_NAMES.map((storeName, index) => (
          <Stack flex={1}>
            <StockList
              storeName={storeName}
              cards={stockInOrder[index]?.cards || []}
              isLoading={loadings[index]}
              timeToQuery={stockInOrder[index]?.timeToQuery}
            />
          </Stack>
        ))}
        <Stack flex={1}>
          <StockList
            storeName="Cards not in stock at either"
            cards={stockInOrder.at(-1)?.cards || []}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
