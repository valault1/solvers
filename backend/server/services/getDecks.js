// eslint-disable-next-line import/prefer-default-export
export const getDecks = async (username = 'valault1') => {
  const response = await fetch(
    `https://api2.moxfield.com/v2/decks/search-sfw?includePinned=true&showIllegal=true&authorUserNames=${username}&pageNumber=1&pageSize=12&sortType=updated&sortDirection=descending&board=mainboard`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: 'Bearer undefined',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'x-moxfield-version': '2025.01.23.1',
        Referer: 'https://moxfield.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: null,
      method: 'GET',
    },
  );
  const rawData = await response.json();
  const { data } = rawData;

  const decks = data.map((d) => ({
    name: d.name,
    publicUrl: d.publicUrl,
    id: d.publicUrl.split('/')[4],
  }));
  return decks;
};
