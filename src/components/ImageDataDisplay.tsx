import React from "react";

const scaleImageData = (imageData: ImageData, scale: number): ImageData => {
  const scaledWidth = Math.floor(imageData.width * scale);
  const scaledHeight = Math.floor(imageData.height * scale);
  const scaledImageData = new ImageData(scaledWidth, scaledHeight);

  for (let y = 0; y < scaledHeight; y++) {
    for (let x = 0; x < scaledWidth; x++) {
      const originalX = Math.floor(x / scale);
      const originalY = Math.floor(y / scale);

      const originalIndex = (originalY * imageData.width + originalX) * 4;
      const scaledIndex = (y * scaledWidth + x) * 4;

      scaledImageData.data[scaledIndex] = imageData.data[originalIndex];
      scaledImageData.data[scaledIndex + 1] = imageData.data[originalIndex + 1];
      scaledImageData.data[scaledIndex + 2] = imageData.data[originalIndex + 2];
      scaledImageData.data[scaledIndex + 3] = imageData.data[originalIndex + 3];
    }
  }

  return scaledImageData;
};

export const ImageDataDisplay = ({
  imageData,
  scale,
}: {
  imageData: ImageData;
  scale: number;
}) => {
  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const canvasRef = React.useRef();
  // if posterizedImageData updates, re-render it on the canvas
  const imageSrcUrl = React.useMemo(() => {
    const canvas = canvasRef?.current;
    // @ts-ignore
    const context = canvas?.getContext("2d");
    if (!context || !imageData) return;

    context?.putImageData(imageData, 0, 0);
    var img = new Image();
    // @ts-ignore
    img.src = canvas?.toDataURL().then((url) => {
      setUrl(url);
    });
    return img;
  }, [imageData]);

  console.log({ imageSrcUrl: imageSrcUrl?.src, imageData, url });

  React.useEffect(() => {}, [imageData, scale]);
  return (
    <>
      <canvas ref={canvasRef} hidden />
    </>
  );
};

export default ImageDataDisplay;
