import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import { Box, Button, Grid, TextField } from "@mui/material";
import { HeaderTabs } from "../Tabs/Tabs";

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
  tabSection?: () => JSX.Element | undefined;
};

export const SecondaryHeader = ({ tabSection }: SecondaryHeaderProps) => {
  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            width: `calc(100% - ${drawerWidth})`,
            backgroundColor: "rgba(255,255,255,0.7)",
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

          {tabSection && <Box sx={{ px: 3 }}>{tabSection()}</Box>}
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};
