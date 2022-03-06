import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { NavigationDrawer } from "../components/NavigationDrawer/NavigationDrawer";
import { SecondaryHeader } from "../components/SecondaryHeader/SecondaryHeader";
import { HeaderTabs } from "../components/Tabs/Tabs";

const TabPanelOne = () => <span>One</span>;
const TabPanelTwo = () => <span>two</span>;
const TabPanelThree = () => <span>THree</span>;
const TabPanelFour = () => <span>Four</span>;

const tabNames = [
  "BOOKS FROM PUBLISHERS",
  "BOOKS FROM RESELLERS",
  "BOOKS FOR RENT",
  "AUCTION HOUSE",
];

const tabComponents = [TabPanelOne, TabPanelTwo, TabPanelThree, TabPanelFour];

const MarketPlace = () => {
  return (
    <Container sx={{ backgroundColor: "#f5f5f5" }} maxWidth="lg">
      <NavigationDrawer />
      <Box sx={{ width: "calc(100% - 19vw)", py: 4 }}>
        <SecondaryHeader
          tabSection={() => (
            <HeaderTabs tabNames={tabNames} tabComponents={tabComponents} />
          )}
        />
      </Box>
    </Container>
  );
};

export default MarketPlace;
