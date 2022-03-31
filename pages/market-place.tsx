import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BooksForRent } from "../components/BooksForRent/BooksForRent";
import { BookFromPublishers } from "../components/BooksFroPublishers/BookFromPublishers";
import { FromResellers } from "../components/FromResellers/FromResellers";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { NavigationDrawer } from "../components/NavigationDrawer/NavigationDrawer";
import { SecondaryHeader } from "../components/SecondaryHeader/SecondaryHeader";
import { HeaderTabs } from "../components/Tabs/Tabs";

const TabPanelTwo = () => <span>two</span>;
const TabPanelThree = () => <span>THree</span>;
const TabPanelFour = () => <span>Four</span>;

const tabNames = [
  "BOOKS FROM PUBLISHERS",
  "BOOKS FROM RESELLERS",
  "BOOKS FOR RENT",
  "AUCTION HOUSE",
];

const tabComponents = [
  BookFromPublishers,
  FromResellers,
  BooksForRent,
  TabPanelFour,
];

const MarketPlace = () => {
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

export default MarketPlace;
