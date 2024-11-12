import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { Title, updateRating } from "domains/Reviews/api";

import * as React from "react";

const ROW_WIDTH = 300;
const ReviewCardMain = styled.div({
  display: "flex",
  gap: 4,
});

type ReviewCardProps = {
  titleInfo: Title;
  possibleRatings: string[];
};

const ReviewCardContent = styled.div({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: ROW_WIDTH,
});

const FieldWrapper = styled.div({
  display: "flex",
  gap: 8,
});

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
            <FieldWrapper>
              rating:{" "}
              <select
                onChange={(updatedValue) => {
                  updateRating(titleInfo.id, updatedValue.target.value);
                }}
              >
                {possibleRatings.map((rating) => {
                  return <option>{rating}</option>;
                })}
              </select>
            </FieldWrapper>
          )}
        </ReviewCardContent>
      </Card>
    </>
  );
};
