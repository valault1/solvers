import { AMUS_IN_ONE_KG, MASS_OF_PROTON } from "domains/BlackHole/constants";
import { Item, ItemList } from "domains/BlackHole/sharedTypes";

export const items: Item[] = [
  {
    id: "2",
    name: "proton",
    mass: 1 / AMUS_IN_ONE_KG, //1.66e-27
    description: "Much bigger than an electron",
    cost: 1000,
  },
  {
    id: "2",
    name: "oxygen",
    mass: 16 * MASS_OF_PROTON, //2.66e-26
    description: "The most common oxygen isotope",
    cost: 1000,
  },
  {
    id: "2",
    name: "ATP Synthase",
    mass: 600000 * MASS_OF_PROTON, // 9.97e-22
    description: "Much bigger than an electron",
    cost: 1000,
  },
  {
    id: "2",
    name: "Bacteriophage",
    mass: 80000000 * MASS_OF_PROTON, // 1.32e-19
    description: "Much bigger than an electron",
    cost: 1000,
    source:
      "https://pubmed.ncbi.nlm.nih.gov/1804277/#:~:text=Quantitative%20mass%20analysis%20of%20bacteriophage,mass%20of%20about%2080%20MDa.",
  },
  {
    id: "2",
    name: "E. Coli Bacterium",
    mass: 1e-15,
    description: "Much bigger than an electron",
    cost: 1000,
    source:
      "http://book.bionumbers.org/how-big-is-an-e-coli-cell-and-what-is-its-mass/#:~:text=coli%20has%20a%20mass%20of,is%20accurate%20to%20about%2010%25.",
  },
  {
    id: "2",
    name: "red blood cell",
    mass: 27e-15,
    description: "Much bigger than an electron",
    cost: 1000,
    source: "https://physics.aps.org/articles/v5/s140",
  },
  {
    id: "2",
    name: "grain of salt",
    mass: 5.85e-8,
    description: "Much bigger than an electron",
    cost: 1000,
    source:
      "https://www.themeasureofthings.com/results.php?comp=weight&unit=gms&amt=0.0044&sort=pr&p=1#:~:text=The%20mass%20of%20a%20grain,grams%20of%20salt%20each%20year.",
  },
  {
    id: "2",
    name: "an ant",
    mass: 3e-6,
    description: "Much bigger than an electron",
    cost: 1000,
    source: "https://whatthingsweigh.com/how-much-does-an-ant-weigh/",
  },
  {
    id: "2",
    name: "a grain of rice",
    mass: 2.1e-5,
    description: "Much bigger than an electron",
    cost: 1000,
    source:
      "https://www.themeasureofthings.com/singleresult.php?comp=weight&unit=gms&amt=0.0044&i=362",
  },
  {
    id: "2",
    name: "penny",
    mass: 0.0025,
    description: "Much bigger than an electron",
    cost: 1000,
  },
  {
    id: "2",
    name: "egg",
    mass: 0.06,
    description: "Much bigger than an electron",
    cost: 1000,
    source:
      "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/egg-weight#:~:text=The%20weight%20of%20an%20egg,lesser%20extent%2C%20on%20its%20genotype.",
  },
  {
    id: "2",
    name: "egg",
    mass: 0.06,
    description: "Much bigger than an electron",
    cost: 1000,
  },
];

export const emptyInventory: ItemList[] = items.map((item) => {
  return {
    item,
    quantity: 0,
  };
});
