import React from "react";
import { QueryInput, useQuery } from "./useQuery";
import { Deck } from "../DeckBuyerController";
import { getPrice, Stock } from "../StockList";
import { useQueries } from "./useQueries";

export const STORE_NAMES = ["Gamegrid", "Card Kingdom"] as const;
export type StoreName = (typeof STORE_NAMES)[number];
type APICardInput = {
  card: string;
  quantity: string;
};

type StockAPIQueryInput = Omit<QueryInput, "body"> & {
  body: { cards: APICardInput[]; storeName: StoreName };
};

const cardIsInStock = (stock: Stock) => {
  const totalStock = stock.quantities.reduce(
    (acc, s) => acc + s.maxQtyAvailable,
    0
  );
  return !stock.notFound && stock.numRequested <= totalStock;
};

export const numberOfCards = (stocks: Stock[]) => {
  return stocks.reduce((acc, s) => acc + s.numRequested, 0);
};

export const useCardStocks = ({ decks }: { decks: Deck[] }) => {
  // this will be the order that stock should be considered in.
  const [storeNamesInOrder, setStoreNamesInOrder] = React.useState(STORE_NAMES);

  const allCards = React.useMemo(() => {
    return decks.flatMap((d) => d.cards);
  }, [decks]);

  const uniqueCards: APICardInput[] = React.useMemo(() => {
    const allCardsFormatted = allCards.map((c) => ({
      card: c.name,
      quantity: c.quantity.toString(),
    }));
    const uniqueCards = Object.values(
      allCardsFormatted.reduce((acc, { card, quantity }) => {
        acc[card] = acc[card] || { card, quantity: 0 };
        acc[card].quantity += Number(quantity);
        return acc;
      }, {} as Record<string, { card: string; quantity: number }>)
    );

    return uniqueCards.map((c) => ({
      card: c.card,
      quantity: c.quantity.toString(),
    }));
  }, [allCards]);

  // a dictionary that gets the query input object by the storeName key
  const queryInputs: StockAPIQueryInput[] = React.useMemo(() => {
    return STORE_NAMES.map((storeName) => {
      return {
        body: { cards: uniqueCards, storeName },
        url: "api/checkStock",
        method: "POST",
        shouldLog: true,
      };
    });
  }, [uniqueCards]);

  const { datas, loadings, errors, isLoading } = useQueries(queryInputs);

  // we want to see cards to buy in whatever order they are needed.
  const stockInOrder: {
    storeName: any;
    cards: Stock[];
  }[] = React.useMemo(() => {
    const orderedDatas: any[] = [];
    storeNamesInOrder.forEach((storeName) => {
      const data = datas.find((d) => d?.storeName === storeName);
      if (data) orderedDatas.push(data);
      else orderedDatas.push([]);
    });

    let cardsToProcess = uniqueCards.map((c) => c.card);
    let results: {
      storeName: any;
      cards: Stock[];
    }[] = [];

    for (const data of orderedDatas) {
      const stocks: Stock[] = data?.results || [];

      // eslint-disable-next-line no-loop-func
      const stocksToProcess = stocks.filter((c) =>
        cardsToProcess.includes(c.name)
      );
      const cardsInStock = stocksToProcess.filter(
        // eslint-disable-next-line no-loop-func
        (c) => cardIsInStock(c) && cardsToProcess.includes(c.name)
      );
      cardsInStock.sort((a, b) => getPrice(b) - getPrice(a));
      results.push({ storeName: data.storeName, cards: cardsInStock });
      const cardsOutOfStock = stocksToProcess.filter((c) => !cardIsInStock(c));
      cardsToProcess = cardsOutOfStock.map((c) => c.name);
    }

    // if there are any cards left, they are not in stock anywhere
    results.push({
      storeName: "Out of Stock",
      cards: cardsToProcess.map((name) => {
        const stock: Stock = {
          name,
          numRequested: Number(
            uniqueCards.find((c) => c.card === name)?.quantity || 0
          ),
          quantities: [],
        };
        return stock;
      }),
    });

    return results;
  }, [storeNamesInOrder, datas, uniqueCards]);

  const numCardsRequested = React.useMemo(() => {
    return uniqueCards.reduce(
      (acc, result) => acc + Number(result.quantity),
      0
    );
  }, [uniqueCards]);
  const numCardsFoundInStock = React.useMemo(() => {
    return stockInOrder.reduce(
      (acc, result) => acc + numberOfCards(result.cards),
      0
    );
  }, [stockInOrder]);

  return {
    isLoading,
    loadings,
    stockInOrder,
    numCardsRequested,
    numCardsFoundInStock,
  };
};
