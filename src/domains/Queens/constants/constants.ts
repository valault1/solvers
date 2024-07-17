function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

export const BOARD_COLORS_HEX_OBJECT = {
  // 1
  pink: "#d6a3bc",
  // 2
  brownGray: "#b7b3a1",
  // 3
  red: "#ed8367",
  // 4
  lightOrange: "#f6cc99",
  // 5
  yellow: "#e8f396",
  // 6
  purple: "#b7a4dd",
  // 7
  teal: "#add1d7",
  // 8
  cyan: "#56ede7",
  // 9
  lightBlue: "#8bb5fe",
  // 10
  lightGreen: "#bcdea6",
  // 11
  gray: "#dfdfdf",
  // 12
  darkBlue: "#00008b",
  // 13
  darkGreen: "#013220",
  // 14
  silver: "#c0c0c0",
  // 15
  darkPurple: "#8b008b",
  // 16
  darkOrange: "#ff8c00",
  // 17
  darkRed: "#8b0000",
  // 18 d
  brown: "#a52a2a",
  // 19
  deepPink: "#aa326a",
  // 20
  brightYellow: "#ffea00",
};

export const BOARD_COLORS_HEX = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#FFFFFC",
  "#7bf1a8",
  "#7161ef",
  "#ffe45e",
  "#eae4e9",
  "#b2f7ef",
  "#99c1de",
  ...Object.values(BOARD_COLORS_HEX_OBJECT),
]; //Object.values(BOARD_COLORS_HEX);

export const BOARD_COLORS = BOARD_COLORS_HEX.reduce((acc, color) => {
  acc[color] = color;
  return acc;
}, {} as Record<string, string>);

export const ORIGINAL_BOARD_COLORS = {
  // 1
  pink: [214, 163, 188],
  // 2
  brownGray: [183, 179, 161],
  // 3
  red: [237, 131, 103],
  // 4
  lightOrange: [246, 204, 153],
  // 5
  yellow: [232, 243, 150],
  // 6
  purple: [183, 164, 221],
  // 7
  teal: [173, 209, 215],
  // 8
  cyan: [86, 237, 231],
  // 9
  lightBlue: [139, 181, 254],
  // 10
  lightGreen: [188, 222, 166],
  // 11
  gray: [223, 223, 223],
  // 12
  darkBlue: [0, 0, 139],
  // 13
  darkGreen: [1, 50, 32],
  // 14
  silver: [192, 192, 192],
  // 15
  darkPurple: [139, 0, 139],
  // 16
  darkOrange: [255, 140, 0],
  // 17
  darkRed: [139, 0, 0],
  // 18
  brown: [165, 42, 42],
  // 19
  deepPink: [170, 50, 106],
  // 20
  brightYellow: [255, 234, 0],
};

export const BOARD_COLOR_NAMES = Object.keys(ORIGINAL_BOARD_COLORS);

export const COLORS_LIST = {
  //border black
  black: [1, 1, 1],
  //outside white
  white: [249, 250, 252],
  ...ORIGINAL_BOARD_COLORS,
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
