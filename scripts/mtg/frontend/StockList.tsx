import { Button, CircularProgress, Stack } from "@mui/material";
import { CollapsibleCard } from "./CollapsibleCard";
import { Card } from "./DeckBuyerController";
import React from "react";
import { dollar } from "./CardsList";
import { numberOfCards, STORE_NAMES } from "./hooks/useCardStocks";

export type Stock = {
  name: string;
  numRequested: number;
  notFound?: boolean;
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
  while (numBought < stock.numRequested && i < stock.quantities.length) {
    let numNeeded = stock.numRequested - numBought;
    let numToBuy = Math.min(numNeeded, stock.quantities[i].maxQtyAvailable);
    currentPrice += stock.quantities[i].price * numToBuy;
    numBought += numToBuy;
    i++;
  }
  return currentPrice;
};

export const getTotalPrice = (stocks: Stock[]) => {
  return stocks.reduce((acc, stock) => {
    return acc + getPrice(stock);
  }, 0);
};

const getColor = (stock: Stock) => {
  if (stock.notFound) return "red";
  const totalCardsAvailable = stock.quantities.reduce(
    (acc, q) => acc + q.maxQtyAvailable,
    0
  );
  if (totalCardsAvailable < stock.numRequested) return "red";
  return "black";
};

export const StockList = ({
  storeName,
  cards,
  isLoading,
}: {
  storeName: string;
  cards: Stock[];
  isLoading?: boolean;
}) => {
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
  }, [cardsInStock]);

  const title = React.useMemo(() => {
    const isStore = STORE_NAMES.includes(storeName as any);
    const link = getLinkToStore(storeName);
    const storeNameLink = link ? <a href={link}>{storeName}</a> : storeName;
    if (isLoading)
      return (
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
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
        {dollar(getTotalPrice(cards))}
      </Stack>
    );
  }, [storeName, isLoading, cardsInStock, cards]);
  return (
    <CollapsibleCard
      title={title}
      content={
        <Stack direction="column">
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
          <Button onClick={copyToClipboard}>Copy</Button>
        </Stack>
      }
    />
  );
};
