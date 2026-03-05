import { CORS_PROXY_URL } from "domains/MTG/constants";

type Deck = {
  name: string;
  publicUrl: string;
  id: string;
};

// takes in the username, returns a list of deck objects
export const fetchMoxfieldDecks = async (userName: string): Promise<Deck[]> => {
  const response = await fetch(
    `${CORS_PROXY_URL}https://api2.moxfield.com/v2/decks/search-sfw?includePinned=true&showIllegal=true&authorUserNames=${userName}&pageNumber=1&pageSize=60&sortType=updated&sortDirection=descending&board=mainboard`,
    {
      headers: {
        "x-moxfield-version": "2025.01.23.1",
      },
      method: "GET",
    }
  );
  const rawData = await response.json();
  const { data } = rawData;

  const decks = data.map((d: any) => ({
    name: d.name,
    publicUrl: d.publicUrl,
    id: d.publicUrl.split("/")[4],
  }));
  return decks;
};
