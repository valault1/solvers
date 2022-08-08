import { getPossibleRatings, getTitles } from "domains/Reviews/api";
import { ReviewDrawer } from "domains/Reviews/ReviewDrawer";
import * as React from "react";

export const ReviewsController = () => {
  var [titles, setTitles] = React.useState([]);
  var [ratings, setRatings] = React.useState([]);
  React.useEffect(() => {
    getTitles().then((result) => {
      setTitles(result);
    });
    getPossibleRatings().then((result) => {
      setRatings(result);
    });
  });
  const isLoading = titles === [];
  return (
    <>
      <div>Welcome to the video game reviews!</div>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        titles.map((title) => {
          return <ReviewDrawer titleInfo={title} possibleRatings={ratings} />;
        })
      )}
    </>
  );
};
