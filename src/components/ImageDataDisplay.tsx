import React from "react";

export const ImageDataDisplay = ({ imageData }: { imageData: ImageData }) => {
  const canvasRef = React.useRef();
  // if posterizedImageData updates, re-render it on the canvas
  React.useEffect(() => {
    //@ts-ignore
    const context = canvasRef?.current?.getContext("2d");
    if (!context || !imageData) return;

    context?.putImageData(imageData, 0, 0);
  }, [imageData]);
  return (
    <canvas
      ref={canvasRef}
      width={imageData?.width}
      height={imageData?.height}
    ></canvas>
  );
};

export default ImageDataDisplay;
