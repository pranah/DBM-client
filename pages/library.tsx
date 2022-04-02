import { Box } from "@mui/system";
import React from "react";
import { BooksInYourLibrary } from "../components/BooksInYourLibrary/BooksInYourLibrary";
import { BooksYouRented } from "../components/BooksYouRented/BooksYouRented";
import { NavigationDrawer } from "../components/NavigationDrawer/NavigationDrawer";
import { SecondaryHeader } from "../components/SecondaryHeader/SecondaryHeader";

const tabNames = [
  "BOOKS IN YOUR LIBRARY",
  "BOOKS YOU RENTED",
  // "BOOKS YOU PUBLISHED",
  // "AUCTION HOUSE",
];

// const BooksInYourLibrary = () => <>BOOKS IN YOUR LIBRARY</>;
// const BooksYouRented = () => <>BOOKS YOU RENTED</>;
const BooksYouPublished = () => <>BOOKS YOU PUBLISHED</>;

const tabComponents = [
  BooksInYourLibrary,
  BooksYouRented,
  BooksYouPublished,
  // TabPanelFour,
];

const Library = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        height: "100%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <NavigationDrawer />
      <Box sx={{ width: "calc(100% - 19vw)", pb: 4, pt: 2 }}>
        <SecondaryHeader tabNames={tabNames} tabComponents={tabComponents} />
      </Box>
    </Box>
  );
};

export default Library;
