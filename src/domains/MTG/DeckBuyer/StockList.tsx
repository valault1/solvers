import { Button, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { CollapsibleCard } from "./CollapsibleCard";
import { dollar } from "./StockListStep";
import { numberOfCards, STORE_NAMES } from "./hooks/useCardStocks";
import { SecondaryButton } from "components/Form.elements";
import { theme } from "components/theme/theme";

export type Stock = {
  name: string;
  numRequested: number;
  notFound?: boolean;
  unselected?: boolean;
  quantities: {
    setName: string;
    variation: string;
    maxQtyAvailable: number;
    price: number;
  }[];
};

const getLinkToStore = (storeName: string) => {
  if (storeName === "Gamegrid") {
    return "https://store.gglehi.com/collections/magic";
  }
  if (storeName === "Card Kingdom") {
    return "https://www.cardkingdom.com/builder";
  }
  return undefined;
};
export const getPrice = (stock: Stock) => {
  if (stock.notFound) return 0;
  let currentPrice = 0;
  let numBought = 0;
  let i = 0;
  const { numRequested } = stock;
  while (numBought < numRequested && i < stock.quantities.length) {
    const numNeeded = numRequested - numBought;
    const numToBuy = Math.min(numNeeded, stock.quantities[i].maxQtyAvailable);
    currentPrice += stock.quantities[i].price * numToBuy;
    numBought += numToBuy;
    i += 1;
  }
  return currentPrice;
};

export const getTotalPrice = (stocks: Stock[]) => {
  return stocks.reduce((acc, stock) => {
    return acc + getPrice(stock);
  }, 0);
};

const getColor = (stock: Stock) => {
  if (stock.notFound) return theme.colors.textError;
  const totalCardsAvailable = stock.quantities.reduce(
    (acc, q) => acc + q.maxQtyAvailable,
    0
  );
  if (totalCardsAvailable < stock.numRequested) return theme.colors.textError;
  return theme.colors.textPrimary;
};

export function StockList({
  storeName,
  cards,
  isLoading,
  timeToQuery,
}: {
  storeName: string;
  cards: Stock[];
  isLoading?: boolean;
  timeToQuery?: number;
}) {
  const cardsInStock = React.useMemo(
    () =>
      cards.filter((c) => !c.notFound && c.quantities[0]?.maxQtyAvailable > 0),
    [cards]
  );
  const cardsOutOfStock = React.useMemo(
    () => cards.filter((c) => c.notFound || !c.quantities[0]?.maxQtyAvailable),
    [cards]
  );

  const sortedCards = React.useMemo(
    () => [...cardsInStock, ...cardsOutOfStock],
    [cards]
  );

  const copyToClipboard = React.useCallback(() => {
    const text = cardsInStock
      .map((c) => {
        return `${c.numRequested} ${c.name}`;
      })
      .join("\n");
    navigator.clipboard.writeText(text);
    console.log(process.env.NODE_ENV);
  }, [cardsInStock]);

  const title = React.useMemo(() => {
    const isStore = STORE_NAMES.includes(storeName as any);
    const link = getLinkToStore(storeName);
    const storeNameLink = link ? (
      <SecondaryButton
        onClick={(e) => {
          window.open(link, "_blank");
          e.stopPropagation();
        }}
      >
        {storeName}
      </SecondaryButton>
    ) : (
      storeName
    );
    if (isLoading)
      return (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <div>{storeNameLink}</div>
          <CircularProgress size={20} />
        </Stack>
      );
    return (
      <Stack direction="column">
        <b>{storeNameLink} </b>
        {numberOfCards(cardsInStock)} cards found -{" "}
        {dollar(getTotalPrice(cards))}{" "}
        {timeToQuery ? `(${timeToQuery / 1000} s)` : ""}
      </Stack>
    );
  }, [storeName, isLoading, cardsInStock, cards, timeToQuery]);
  return (
    <CollapsibleCard
      title={title}
      content={
        <Stack direction="column">
          <SecondaryButton onClick={copyToClipboard}>Copy</SecondaryButton>
          {sortedCards.map((c) => {
            const totalCardsAvailable = c.quantities.reduce(
              (acc, q) => acc + q.maxQtyAvailable,
              0
            );
            return (
              <div key={c.name} style={{ color: getColor(c) }}>
                {c.notFound
                  ? "Error - "
                  : `${Math.min(totalCardsAvailable, c.numRequested)} / ${
                      c.numRequested
                    } `}
                {c.name} - {dollar(getPrice(c))}
              </div>
            );
          })}
        </Stack>
      }
    />
  );
}
