// imports the React Javascript Library
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/material";
import { Card } from "@mui/material";
import ImageDataDisplay from "components/ImageDataDisplay";

export const ImageUpload = ({
  handleUploadClick,
}: {
  handleUploadClick: (event: any) => void;
}) => {
  return (
    <Grid container direction="column" alignItems="center">
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
    </Grid>
  );
};

export default ImageUpload;
