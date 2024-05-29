import styled from "@emotion/styled";
import ImageUpload from "components/ImageUpload";
import { MainContainer } from "components/MainPage.elements";
import { useImageParsing } from "domains/Queens/useImageParsing";
import { useParseBoard } from "domains/Queens/useParseBoard";
import * as React from "react";

const BOARD_SIZE = 8;

const StyledRow = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

export const QueensSolver = () => {
  const { handleUploadClick, rawImage, posterizedImageData, pixelArray } =
    useImageParsing();

  const { board } = useParseBoard({ pixelArray });

  return (
    <MainContainer>
      <ImageUpload
        handleUploadClick={handleUploadClick}
        rawImage={rawImage}
        posterizedImageData={posterizedImageData}
      />
    </MainContainer>
  );
};
