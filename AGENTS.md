# Project Core Instructions

## Creating a New Feature or Page

When adding a new feature or page to this project, please follow these steps:

1. **Create the Domain Folder**: 
   Create a dedicated directory for your new page within `src/domains/` (e.g., `src/domains/MyNewFeature/`). Place all related components and assets in this folder.

2. **Configure the Route and Navbar**: 
   Add a new entry to the `NAVBAR_PAGES` array in `src/AppRoutes.tsx`. This will automatically generate a route for the page based on its label and add it to the top navigation bar.

3. **Build the Page**: 
   Begin building your page component. Most pages should use `MainContainer` as their base wrapper to ensure the content is properly centered and standardized.
