export type Source = {
  name: string;
  getUrl: (searchText: string) => string;
}

export const SOURCES: Source[] = [
  {
    name: "Marketplace",
    getUrl: (searchText: string) => `https://www.facebook.com/marketplace/category/search/?query=${searchText}`
  },
  {
    name: "craigslist",
    getUrl: (searchText: string) => `https://sfbay.craigslist.org/search/sss?query=${searchText}`
  },
  {
    name: "eBay (local pickup)",
    getUrl: (searchText: string) => `https://www.ebay.com/sch/i.html?rt=nc&_from=R40&LH_LPickup=1&_nkw=${searchText}&_sacat=0&LH_PrefLoc=1&_stpos=94303&_fcid=1&_sadis=25&_fspt=1`
  },
  {
    name: "OfferUp",
    getUrl: (searchText: string) => `https://offerup.com/search?q=${searchText}`
  },
  {
    name: "VarageSale",
    getUrl: (searchText: string) => `https://www.varagesale.com/m/santa-cruz-watsonville-ca/find?q=${searchText}`
  }
]