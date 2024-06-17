export const MOCK_FULL_SCREENSHOT_URLS: string[] = [];
export const MOCK_PRECROPPED_SCREENSHOT_URLS: string[] = [];

// can be set to false to avoid including pictures in the bundle
export const INCLUDE_PICTURES_IN_BUNDLE = true;

if (INCLUDE_PICTURES_IN_BUNDLE) {
  const MOCK_BOARD_SCREENSHOT_1 = require("./screenshots/queensBoard1.jpg");
  const MOCK_BOARD_SCREENSHOT_2 = require("./screenshots/queensBoard2.png");
  const MOCK_BOARD_SCREENSHOT_3 = require("./screenshots/queensBoard3.png");
  const MOCK_BOARD_SCREENSHOT_4 = require("./screenshots/queensBoard4.png");
  const MOCK_PRECROPPED_BOARD_SCREENSHOT_1 = require("./screenshots/precroppedQueensBoard1.jpg");
  const MOCK_PRECROPPED_BOARD_SCREENSHOT_2 = require("./screenshots/precroppedQueensBoard2.jpg");
  //export const MOCK_BOARD_1 = MOCK_BOARD_1_JPG;

  MOCK_FULL_SCREENSHOT_URLS.push(
    MOCK_BOARD_SCREENSHOT_1,
    MOCK_BOARD_SCREENSHOT_2,
    MOCK_BOARD_SCREENSHOT_3,
    MOCK_BOARD_SCREENSHOT_4
  );

  MOCK_PRECROPPED_SCREENSHOT_URLS.push(
    MOCK_PRECROPPED_BOARD_SCREENSHOT_1,
    MOCK_PRECROPPED_BOARD_SCREENSHOT_2
  );
}

export type TestScreenshot = {
  type: "precropped" | "full";
  url: string;
};

export const MOCK_SCREENSHOTS: TestScreenshot[] = [
  ...(MOCK_FULL_SCREENSHOT_URLS.map((url) => ({
    type: "full",
    url,
  })) as TestScreenshot[]),
  ...(MOCK_PRECROPPED_SCREENSHOT_URLS.map((url) => ({
    type: "precropped",
    url,
  })) as TestScreenshot[]),
];
