export const BOARD_COLORS = {
  pink: [214, 163, 188],
  //brown/gray
  brownGray: [183, 179, 161],
  //red
  red: [237, 131, 103],
  //light orange
  lightOrange: [246, 204, 153],
  //yellow
  yellow: [232, 243, 150],
  //purple
  purple: [183, 164, 221],
  //teal
  teal: [173, 209, 215],
  //teal
  cyan: [86, 237, 231],
  //light blue
  lightBlue: [139, 181, 254],
  //light green
  lightGreen: [188, 222, 166],
  //gray section
  gray: [223, 223, 223],
  // below: added for 20x20
  darkBlue: [0, 0, 139],

  darkGreen: [1, 50, 32],

  silver: [192, 192, 192],

  darkPurple: [139, 0, 139],

  darkOrange: [255, 140, 0],

  darkRed: [139, 0, 0],

  brown: [165, 42, 42],

  deepPink: [170, 50, 106],

  brightYellow: [255, 234, 0],
};

export const BOARD_COLOR_NAMES = Object.keys(BOARD_COLORS);

export const COLORS_LIST = {
  //border black
  black: [1, 1, 1],
  //outside white
  white: [249, 250, 252],
  ...BOARD_COLORS,
};

type PosterizedColor = keyof typeof COLORS_LIST;

export const colorArrToString = (arr: number[]) => {
  return arr.join(",");
};

export const COLORS_LIST_BY_COLOR = Object.keys(COLORS_LIST).reduce(
  (acc: Record<string, string>, colorName: PosterizedColor) => {
    acc[colorArrToString(COLORS_LIST[colorName])] = colorName;
    return acc;
  },
  {}
);

export const EVENT_LOOP_POLL_INCREMENT_MS = 100;

export const pollEventLoop = async (
  timerTime: number,
  setTimerTime: (newTime: number) => void
) => {
  if (new Date().getTime() - timerTime > EVENT_LOOP_POLL_INCREMENT_MS) {
    //console.log("polling event loop");
    setTimerTime(new Date().getTime());
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
};

export const CONSTANT_BLANK_ARRAY: any[] = [];
