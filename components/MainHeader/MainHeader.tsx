import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import { Button, Grid } from "@mui/material";

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

type MainHeaderProps = {
  rightSideComponents?: () => JSX.Element | undefined;
};

export const MainHeader = ({ rightSideComponents }: MainHeaderProps) => {
  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            background:
              "linear-gradient(180deg, #C4C4C4 0%, rgba(219, 219, 219, 0) 100%)",
            px: 10,
          }}
        >
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h1">
                <Image
                  alt="pranah"
                  src="/static/images/logo.svg"
                  width={121}
                  height={41}
                />
              </Typography>
              {rightSideComponents && <Grid item>{rightSideComponents()}</Grid>}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};
