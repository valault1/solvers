import { Color, PixelArray, RgbaColor } from "domains/Queens/sharedTypes";
import * as React from "react";
var pixels = require("image-pixels");
const ndarray = require("ndarray");

export const colorToString = (color: RgbaColor) => {
  return colorArrToString([color.r, color.g, color.b]);
};

export const colorArrToString = (arr: number[]) => {
  return arr.join(",");
};

export const colorsAreEqual = (color1: RgbaColor, color2: number[]) => {
  if (
    color1.r === color2[0] &&
    color1.g === color2[1] &&
    color1.b === color2[2]
  ) {
    return true;
  }
  return false;
};

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

export const COLORS_LIST_BY_COLOR = Object.keys(COLORS_LIST).reduce(
  (acc: Record<string, string>, colorName: PosterizedColor) => {
    acc[colorArrToString(COLORS_LIST[colorName])] = colorName;
    return acc;
  },
  {}
);

const formattedColorsList: Color[] = Object.values(COLORS_LIST).map(
  (colorArr) => {
    return {
      red: colorArr[0],
      green: colorArr[1],
      blue: colorArr[2],
    };
  }
);

const customPosterize = (ndArray: any, colorsList: Color[]) => {
  const result = ndarray(new Uint8Array(ndArray.size), ndArray.shape);
  for (let i = 0; i < ndArray.shape[0]; i++) {
    for (let j = 0; j < ndArray.shape[1]; j++) {
      const pixel = [
        ndArray.get(i, j, 0),
        ndArray.get(i, j, 1),
        ndArray.get(i, j, 2),
      ];
      let minDistance = Infinity;
      let minIndex = 0;
      for (let k = 0; k < colorsList.length; k++) {
        const color = colorsList[k];
        const distance = Math.sqrt(
          (color.red - pixel[0]) ** 2 +
            (color.green - pixel[1]) ** 2 +
            (color.blue - pixel[2]) ** 2
        );
        if (distance < minDistance) {
          minDistance = distance;
          minIndex = k;
        }
      }
      result.set(i, j, 0, colorsList[minIndex].red);
      result.set(i, j, 1, colorsList[minIndex].green);
      result.set(i, j, 2, colorsList[minIndex].blue);
      result.set(i, j, 3, 255);
    }
  }
  return result;
};

const posterize = (ndArray: any) => {
  return customPosterize(ndArray, formattedColorsList);
};

const pixelArrayToUint8Array = (pixelArray: PixelArray) => {
  let result = [];
  for (let i = 0; i < pixelArray.length; i++) {
    for (let j = 0; j < pixelArray[i].length; j++) {
      result.push(pixelArray[i][j].r);
      result.push(pixelArray[i][j].g);
      result.push(pixelArray[i][j].b);
      result.push(pixelArray[i][j].a);
    }
  }
  return new Uint8ClampedArray(result);
};

const getPixelArrayFromNdArray = (arr: any): PixelArray => {
  let result: PixelArray = [];
  for (let i = 0; i < arr.shape[0]; i++) {
    let row = [];
    for (let j = 0; j < arr.shape[1]; j++) {
      const pixel: RgbaColor = {
        r: arr.get(i, j, 0),
        g: arr.get(i, j, 1),
        b: arr.get(i, j, 2),
        a: arr.get(i, j, 3),
      };
      row.push(pixel);
    }
    result.push(row);
  }
  return result;
};

const getPixelNDArray = (imageData: ImageData) => {
  return ndarray(imageData.data, [imageData.height, imageData.width, 4]);
};

export const getImageDataFromPixelArray = (pixelArray: PixelArray) => {
  if (!pixelArray.length) return undefined;
  const newImageData = new ImageData(
    pixelArrayToUint8Array(pixelArray),
    pixelArray[0].length,
    pixelArray.length,
    { colorSpace: "srgb" }
  );
  return newImageData;
};

export const useImageParsing = () => {
  const [rawImageData, setRawImageData] = React.useState<ImageData>();
  const [modifiedImageData, setModifiedImageData] = React.useState<ImageData>();
  const [pixelArray, setPixelArray] = React.useState<PixelArray>([]);
  const [rawImageFile, setRawImageFile] = React.useState<string>();

  const handleUploadClick = (event: any) => {
    console.log();
    var newlySelectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(newlySelectedFile);

    reader.onloadend = function (e) {
      const file = reader.result;
      setRawImageFile(file as string);
      if (!file) return;
      // set the pixel array to the posterized version of the image
      pixels(file).then((newImageData: ImageData) => {
        setRawImageData(newImageData);
        //setPixelArray(getPixelArray(newImageData));
        const ndArray = getPixelNDArray(newImageData);
        const poster = posterize(ndArray);
        const posterizedPixelArray = getPixelArrayFromNdArray(poster);
        setPixelArray(posterizedPixelArray);
        setModifiedImageData(getImageDataFromPixelArray(posterizedPixelArray));
      });
    };
  };

  const updateImage = React.useCallback(
    (newPixelArray: PixelArray) => {
      setModifiedImageData(getImageDataFromPixelArray(newPixelArray));
    },
    [setModifiedImageData]
  );

  return {
    modifiedImageData,
    rawImageData,
    rawImage: rawImageFile,
    pixelArray,
    handleUploadClick,
    updateImage,
  };
};

// const PixelDisplay = ({ color }: { color: RgbaColor }) => {
//   const { r, b, g, a } = color;
//   return (
//     <span
//       style={{
//         width: "1px",
//         height: "1px",
//         backgroundColor: `rgba(${r},${g},${b},${a})`,
//       }}
//     />
//   );
// };

// const PictureDisplay = ({ pixelArray }: { pixelArray: PixelArray }) => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {pixelArray.map((row, i) => (
//         <div style={{ display: "flex", flexDirection: "row" }} key={i}>
//           {row.map((color, j) => (
//             <PixelDisplay key={j} color={color} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// const getPixel = (imageData: ImageData, x: number, y: number) => {
//   const i = (y * imageData.width + x) * 4;
//   const data = imageData.data;
//   const color = {
//     r: data[i],
//     g: data[i + 1],
//     b: data[i + 2],
//     a: data[i + 3],
//   };
//   return color;
// };

// const getPixelArray = (imageData: ImageData) => {
//   let result = [];
//   for (let i = 0; i < imageData.height; i++) {
//     let row = [];
//     for (let j = 0; j < imageData.width; j++) {
//       row.push(getPixel(imageData, j, i));
//     }
//     result.push(row);
//   }
//   return result;
// };

// const getPixelNDArray = (pixelArray: PixelArray): PixelNDArray => {
//   let result: PixelNDArray = [];
//   for (let i = 0; i < pixelArray.length; i++) {
//     let row = [];
//     for (let j = 0; j < pixelArray[i].length; j++) {
//       row.push([pixelArray[i][j].r, pixelArray[i][j].g, pixelArray[i][j].b]);
//     }
//     result.push(row);
//   }
//   return result;
// };
