export const getCardsFromDeckUrl = async (deckIds: string[]) => {
  // query for each deck in parallel
  const promises = deckIds.map((deckId) => {
    return fetch(`https://api2.moxfield.com/v3/decks/all/${deckId}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer undefined",
        priority: "u=1, i",
        "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-moxfield-version": "2025.01.23.1",
        cookie:
          "_ga=GA1.1.1034608043.1735682626; ncmp.domain=moxfield.com; _scor_uid=25201dc6819b408e9671cb6020a746f2; _cc_id=95eb93e02b843878e00d2ab1f834087f; _au_1d=AU1D-0100-001735682627-16K8KBYZ-VBQ9; __qca=I0-1736059989-1735683074427; _pubcid=e588cf0a-fd36-40e0-8c3a-fa7b1d1bf76f; _pubcid_cst=Ryz5LF8s6Q%3D%3D; logged_in=true; panoramaId_expiry=1738282033970; panoramaId=f04f99aa79bc32ab5df12758fbad185ca02c01ef5d6664abe729eed61c74e8c0; panoramaIdType=panoDevice; cf_clearance=mGlWgvbxjdvSFIDORupavdiWPW2KZzO4jrdJNGZHusQ-1737677234-1.2.1.1-vyoOV_yaV5ZQZvHnVr_b4ddixOA1DCcsUHCKKCB0rSzXElEpaoLyG_X09v7_PXilWZpFkhxjlyVB.M_U7vTDGsZ3K2WckbONJ3p_YvoRvZKT.LWF6ef_SetYWVIi2GFQbFvjV4Nn.yQDHZTLJ4p5zjfVLJ1kVCq9kgIWCFTInyg_I2JEx_vUv14Q1hnzo0tPZM5T7WAMPLDU9vlWUTKtTLErVqucLr6xDGIbh.buJF2M4Q.zI.y0jO.LtZ83MY6urTBWULAf98LeiCK07in8QEEzXsbIGYp4ctSpc0L2FyE2_CuP5MZO7pvVdg1wNJ0clNe13MP63P8_jVIaGsw.4w; cto_bundle=Hk-jjl9ycVBweGNJQlJKY0JmbjBtUGpKTXBIVGRVMEp4NzVHb0p1bVNhSVVCNzdnV2VZeVFtVXZUcWd0YjU2TFAzNHZ4cDJEcmpLTUNjbGZMQ1I0NXc1djMzNHRuSFBtSnZaRmFvdCUyQnY2akRtZHM5Rlg0T3glMkZtT1lxUmh6SGxhbVBhMUNEbEhCJTJGVXMzTVlmckdRdGRWQWRpemclM0QlM0Q; cto_bidid=Iv08OV9pMmROUXlUJTJCRVVldHU4QmpZcWR4TlRsa01MOTJ0JTJGeWxkTVprVzY4M2slMkYzb0JlMmx3V09tSlB5cDRMa2kzSEtQJTJGRllYQWpsMEFGMkxzRUlJckxsQkdHciUyQkVmOUFJUlVrOWVrZFhjZ1lPdzQlM0Q; TiPMix=33.74389096805852; x-ms-routing-name=self; __gads=ID=13fade1f0c5ce042:T=1735682628:RT=1737677368:S=ALNI_MaCCTq06IhVL-xDf4_UHJmevcTpMQ; __gpi=UID=00000f8cfd46f20e:T=1735682628:RT=1737677368:S=ALNI_MbScXAqRcHPXtsfnOMtkPm7mLz5Tw; __eoi=ID=9d9ac56b3cbd348b:T=1735682628:RT=1737677368:S=AA-AfjaXfK4Y66cF7WXS4Nbo4bSf; _ga_FVWZ0RM4DH=GS1.1.1737676739.31.1.1737677464.60.0.0; _ga_BW2XPQDNK2=GS1.1.1737676739.39.1.1737677464.0.0.0; refresh_token=d971e45e-686b-4fe1-9b35-069b882add89",
        Referer: "https://moxfield.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    });
  });

  const rawResponses = await Promise.all(promises);

  const responses = await Promise.all(rawResponses.map((r) => r.json()));

  const getCardsFromBoard = (board: any) => {
    const cardIds = Object.keys(board);

    return cardIds.map((id) => {
      const c = board[id].card;
      const price = c.prices.usd ?? c.prices.usd_etched ?? c.prices.usd_foil;
      if (!price)
        console.log({
          card: { prices: board[id].card.prices, name: board[id].card.name },
        });
      return {
        id,
        // card contains much more info about the card, which isn't necessary atm
        // card: board[id].card,
        quantity: board[id].quantity || 0,
        name: board[id].card.name,
        price,
        // foilPrice: board[id].card.prices.usd
      };
    });
  };

  const decks = responses.map((r, idx) => ({
    deckId: deckIds[idx],
    name: r.name,
    publicUrl: r.publicUrl,
    commanders: getCardsFromBoard(r.boards.commanders.cards),
    mainboard: getCardsFromBoard(r.boards.mainboard.cards),
    sideboard: getCardsFromBoard(r.boards.sideboard.cards),
    maybeboard: getCardsFromBoard(r.boards.maybeboard.cards),
  }));

  // console.log(responses);

  return decks;
};
