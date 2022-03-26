import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import { Box, Button, Grid, TextField } from "@mui/material";
import { HeaderTabs } from "../Tabs/Tabs";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const drawerWidth = "19vw";
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

type SecondaryHeaderProps = {
  // tabSection?: () => JSX.Element | undefined;
  tabNames: string[];
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const SecondaryHeader = ({ tabNames, tabComponents }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            width: `calc(100% - ${drawerWidth})`,
            backgroundColor: "rgba(245, 245, 245, 0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Toolbar>
            <Grid
              sx={{ width: "100%" }}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                label="Search"
                id="search"
                type="search"
                size="small"
              />
            </Grid>
          </Toolbar>
          <Toolbar sx={{ width: "100%" }}>
            <Tabs
              value={value}
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label=""
              sx={{
                "& .MuiTabs-indicator": {
                  width: "2rem!important",
                  top: 0,
                },
              }}
            >
              {tabNames.map((tab) => (
                <Tab
                  key={tab}
                  color="secondary"
                  sx={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    mr: 2,
                    alignItems: "flex-start",
                    "&.Mui-selected": {
                      color: "secondary.main",
                      fontWeight: "bold",
                    },
                  }}
                  label={tab}
                />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Toolbar />
        <Toolbar />
        <Box>
          {tabComponents && (
            <Box sx={{ px: 3 }}>
              {tabComponents.map((tabComponent, i) => (
                <TabPanel value={value} index={i} key={i}>
                  {tabComponent()}
                </TabPanel>
              ))}
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};
