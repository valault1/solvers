// imports the React Javascript Library
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/material";
import { Card } from "@mui/material";

export const ImageUpload = ({
  posterizedImageData,
  rawImage,
  handleUploadClick,
}: {
  posterizedImageData: any;
  rawImage: any;
  handleUploadClick: (event: any) => void;
}) => {
  const canvasRef = React.useRef();
  // if posterizedImageData updates, re-render it on the canvas
  React.useEffect(() => {
    //@ts-ignore
    const context = canvasRef?.current?.getContext("2d");
    if (!context || !posterizedImageData) return;

    context?.putImageData(posterizedImageData, 0, 0);
  }, [posterizedImageData]);
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img width="100%" src={rawImage} />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select Image
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
      <canvas
        ref={canvasRef}
        width={posterizedImageData?.width}
        height={posterizedImageData?.height}
      >
        test
      </canvas>
    </Grid>
  );
};

export default ImageUpload;
