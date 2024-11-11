export type Seed = {
  value: number;
  size: number;
  levelPackId?: LevelPackId;
  index?: number;
};

type LevelPackData = {
  displayName: string;
};

// this is the main type we want to work with.
export type LevelPack = LevelPackData & {
  id: string;
  seeds: Seed[];
};

export type SeedsBySize = { [key: string]: Seed[] };

// this is the format we will output each pack in
export type LevelPackOutput = LevelPackData & {
  id: string;
  displayName: string;
  // note: this key should be a stringified number.
  seeds: { [key: string]: number[] };
};

export type LevelPackId = keyof typeof LEVEL_PACKS_OBJECT;

const LEVEL_PACKS_OBJECT: { [key: string]: LevelPackData } = {
  mainPack: { displayName: "Main Pack" },
  daily: { displayName: "Daily Levels" },
  dailyHard: { displayName: "Daily Levels - Hard" },
};

export const LEVEL_PACKS: LevelPack[] = Object.keys(LEVEL_PACKS_OBJECT).map(
  (id) => ({
    ...LEVEL_PACKS_OBJECT[id as string],
    id,
    seeds: [],
  })
);
