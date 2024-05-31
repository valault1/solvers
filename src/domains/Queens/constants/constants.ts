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
  //light blue
  lightBlue: [139, 181, 254],
  //light green
  lightGreen: [188, 222, 166],
  //gray section
  gray: [223, 223, 223],
};

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
