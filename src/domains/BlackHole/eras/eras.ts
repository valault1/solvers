export type Era = {
  name: string;
  massThreshold: number;
};

export const eras: Era[] = [
  {
    name: "Subatomic Age",
    massThreshold: 0,
  },
  {
    name: "Atomic age",
    massThreshold: 1e-24,
  },
  {
    name: "Cellular age",
    massThreshold: 1e-21,
  },
];

export const getCurrentEra: (mass: number) => Era = (mass) => {
  return eras.find((era, index) => mass >= era.massThreshold);
};
