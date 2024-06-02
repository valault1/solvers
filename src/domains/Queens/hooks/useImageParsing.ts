import {
  COLORS_LIST,
  CONSTANT_BLANK_ARRAY,
} from "domains/Queens/constants/constants";
import { useMemoNonBlocking } from "domains/Queens/hooks/useMemoNonBlocking";
import { Color, PixelArray, RgbaColor } from "domains/Queens/sharedTypes";
import * as React from "react";
var pixels = require("image-pixels");
const ndarray = require("ndarray");

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
  const [rawImageFile, setRawImageFile] = React.useState<string>();
  const [imageUploadTime, setImageUploadTime] = React.useState<number>(0);

  const handleUploadClick = (event: any) => {
    if (!event?.target?.files?.[0]) return;

    var newlySelectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(newlySelectedFile);
    reader.onloadend = function (e) {
      const file = reader.result;

      setRawImageFile(file as string);
      setImageUploadTime(new Date().getTime());
      if (!file) return;
      // set the pixel array to the posterized version of the image
      pixels(file).then((newImageData: ImageData) => {
        setRawImageData(newImageData);
      });
    };
  };

  const calculatePixelArray = React.useCallback(async () => {
    if (!rawImageData) return CONSTANT_BLANK_ARRAY;

    const startTime = new Date().getTime();
    const ndArray = getPixelNDArray(rawImageData);

    const poster = posterize(ndArray);

    const posterizedPixelArray = getPixelArrayFromNdArray(poster);
    console.log({ timeToProcessImage: new Date().getTime() - startTime });

    return posterizedPixelArray;
  }, [rawImageData]);
  const initialDataValue = React.useMemo(() => [], []);
  const {
    data: processedPixelArray,
    loading: isLoadingProcessedPixelArray,
    error: processedPixelArrayError,
    runDuration: processedPixelArrayTime,
  } = useMemoNonBlocking({ callback: calculatePixelArray, initialDataValue });

  return {
    rawImageData,
    rawImage: rawImageFile,
    processedPixelArray,
    isLoadingProcessedPixelArray,
    processedPixelArrayError,
    processedPixelArrayTime,
    handleUploadClick,
    imageUploadTime,
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
