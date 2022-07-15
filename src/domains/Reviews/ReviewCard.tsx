import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { Title } from "domains/Reviews/api";
import { ROW_WIDTH } from "domains/Reviews/ReviewDrawer";
import * as React from "react";
import { theme } from "theme";

const ReviewCardMain = styled.div(() => ({
  display: "flex",
  gap: 4,
}));

type ReviewCardProps = {
  titleInfo: Title;
  possibleRatings: string[];
};

const ReviewCardContent = styled.div(() => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: ROW_WIDTH,
}));

const FieldWrapper = styled.div(() => ({
  display: "flex",
  gap: 8,
}));

export const ReviewCard: React.VFC<ReviewCardProps> = ({
  titleInfo,
  possibleRatings,
}) => {
  return (
    <>
      <Card>
        <ReviewCardContent>
          <FieldWrapper>Title: {titleInfo.title}</FieldWrapper>
          <FieldWrapper>Release date: {titleInfo.releaseDate}</FieldWrapper>
          {titleInfo.rating ? (
            <FieldWrapper>rating: {titleInfo.rating}</FieldWrapper>
          ) : (
            <FieldWrapper>rating: IMPLEMENT RATING SELECT HERE</FieldWrapper>
          )}
        </ReviewCardContent>
      </Card>
    </>
  );
};
