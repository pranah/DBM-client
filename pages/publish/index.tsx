import { Box } from "@mui/material";
import React, { useState } from "react";
import { NavigationDrawer } from "../../components/NavigationDrawer/NavigationDrawer";
import { Header, Contents, General, OtherInfo } from "../../components/Publish";
import { SecondaryHeader } from "../../components/SecondaryHeader/SecondaryHeader";

const tabNames = ["General", "Contents", "Author & Other info"];

const tabComponents = [General, Contents, OtherInfo];

const Publish = () => {
  const [data, setData] = useState({});

  // const tabComponentsWithSetData = ()=>{

  // }

  const handleDataUpdate = (formState) => {
    setData((data) => ({ ...data, ...formState }));
  };

  return (
    <>
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
          test
          <SecondaryHeader
            headerComponent={Header}
            tabNames={tabNames}
            tabComponents={tabComponents}
          />
        </Box>
      </Box>
    </>
  );
};

export default Publish;
