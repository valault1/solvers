export type Title = {
  id: string;
  title: string;
  releaseDate: string;
  console: string;
  rating: string | null;
};

export const ratings = [
  "Absolutely perfect",
  "Solid game",
  "Middle of the road",
  "Not very good",
  "Worse than the last airbender movie",
];

export const titles: Title[] = [
  {
    id: "1",
    title: "Super Mario 64",
    releaseDate: "1996",
    console: "Nintendo 64",
    rating: null,
  },
  {
    id: "2",
    title: "Super Smash Bros Ultimate",
    releaseDate: "2019",
    console: "Nintendo Switch",
    rating: null,
  },
  {
    id: "3",
    title: "Mario Kart: Double Dash",
    releaseDate: "2003",
    console: "GameCube",
    rating: null,
  },
  {
    id: "4",
    title: "Legend of Zelda: Majora's Mask",
    releaseDate: "1998",
    console: "Nintendo 64",
    rating: null,
  },
  {
    id: "5",
    title: "Simpson's Hit and Run",
    releaseDate: "2004",
    console: "GameCube",
    rating: null,
  },
];

const titlesKey = "titles";
const forceUpdateTitles = false; // used for testing, to initialize the titles in local storage
if (localStorage.getItem(titlesKey) === null || forceUpdateTitles) {
  localStorage.setItem(titlesKey, JSON.stringify(titles));
}

async function getTitles() {
  var currentTitles = JSON.parse(localStorage.getItem(titlesKey));

  return new Promise((resolve) => setTimeout(resolve, 1000, currentTitles));
}

async function getPossibleRatings() {
  return new Promise((resolve) => setTimeout(resolve, 1000, ratings));
}

async function updateRating(titleId: string, newRating: string) {
  var currentTitles: Title[] = JSON.parse(localStorage.getItem(titlesKey));
  currentTitles.find((t) => t.id === titleId).rating = newRating;
  localStorage.setItem(titlesKey, JSON.stringify(currentTitles));
}
