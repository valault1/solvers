This is a small app to make reviews for video games. The company already has two custom components (ReviewCard and ReviewDrawer), and an "api" (api.ts) containing calls for getTitles(), getPossibleRatings(), updateRating().

In the end, a user should be able to click a drawer to open the card with details about a video game, and then select a rating for that game which persists even if the page is refreshed.

You may create any hooks and components you want, but you should use ReviewsController to render the content on the page.

your tasks:

- query the data for video game titles using the api call getReviewTitles(), and display that info using a ReviewDrawer
- Note that currently the ReviewDrawer component also shows a ReviewCard component; Make it so that by default, we don't show a ReviewCard, and only show the ReviewCard info when the drawer is clicked
- Implement a select input in ReviewCard that allows the user to select any of the possible ratings. You will need to get the list of possible ratings from the api call getPossibleRatings()
- Use the updateRating() api call when the user selects a new rating. This uses local state to store the data, so you should be able to refresh the page and the rating won't have changed.
- Bonus: Implement a loading state that shows the user they are waiting until the titles load when they first get on the page.
