// imports the React Javascript Library
import React from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

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
            hidden={true}
          />
        </Button>
      </label>
    </Grid>
  );
};

export default ImageUpload;
