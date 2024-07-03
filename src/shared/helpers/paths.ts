export const PATHS = {
  levelSelect: "/queens-level-select",
  multiplayerQueens: "/queens-multiplayer",
  dailyQueens: "/queens-daily",
};

// @ts-ignore
export const PATHS_WITHOUT_SLASHES: Record<keyof typeof PATHS, string> =
  Object.keys(PATHS).reduce((accum, pathName) => {
    // @ts-ignore
    accum[pathName] = PATHS[pathName].slice(1);
    return accum;
  }, {});
