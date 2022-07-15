import { MainContainer } from "components/MainPage.elements";
import { ratings, titles } from "domains/Reviews/api";
import { ReviewCard } from "domains/Reviews/ReviewCard";
import { ReviewDrawer } from "domains/Reviews/ReviewDrawer";
import * as React from "react";

export const ReviewsController = () => {
  return (
    <>
      <div>Welcome to the video game reviews!</div>
      <ReviewDrawer titleInfo={titles[0]} />
      <ReviewCard titleInfo={titles[0]} possibleRatings={ratings} />
    </>
  );
};
