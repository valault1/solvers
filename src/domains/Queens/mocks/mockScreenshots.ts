import { cropPixelArrayToBoard } from "domains/Queens/helpers/cropBoard";
import { getBlankBoard } from "domains/Queens/helpers/parseBoard";
import { solveBoard } from "domains/Queens/helpers/solveBoard";
import {
  getPixelArrayFromNdArray,
  getPixelNDArray,
  posterize,
} from "domains/Queens/hooks/useImageParsing";

//import MOCK_BOARD_1_JPG from "domains/Queens/mocks/screenshots/queensBoard1.jpg";

// can be turned off to reduce bundle size
const INCLUDE_PICTURES_IN_BUNDLE = true;

export const MOCK_SCREENSHOTS: any[] = [];

if (INCLUDE_PICTURES_IN_BUNDLE) {
  const MOCK_BOARD_SCREENSHOT_1 = require("./screenshots/queensBoard1.jpg");
  const MOCK_BOARD_SCREENSHOT_2 = require("./screenshots/queensBoard2.png");
  const MOCK_BOARD_SCREENSHOT_3 = require("./screenshots/queensBoard3.png");
  const MOCK_BOARD_SCREENSHOT_4 = require("./screenshots/queensBoard4.png");
  //export const MOCK_BOARD_1 = MOCK_BOARD_1_JPG;

  MOCK_SCREENSHOTS.push(
    ...[
      MOCK_BOARD_SCREENSHOT_1,
      MOCK_BOARD_SCREENSHOT_2,
      MOCK_BOARD_SCREENSHOT_3,
      MOCK_BOARD_SCREENSHOT_4,
    ]
  );

  console.log({ MOCK_BOARD_SCREENSHOT_1 });

  // fs.readFile(MOCK_BOARD_SCREENSHOT_1, "utf8", function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log(data);
  // });
  // const reader = new FileReader();
  // reader.readAsDataURL(MOCK_BOARD_SCREENSHOT_1);
  // reader.onloadend = function (e) {
  //   const file = reader.result;

  //   if (!file) return;
  //   // set the pixel array to the posterized version of the image
  //   pixels(file).then((newImageData: ImageData) => {
  //     console.log({ newImageData });
  //   });
  // };
}
