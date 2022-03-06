import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const LayersOfPranah = () => {
  return (
    <Grid
      sx={{ backgroundColor: "#fff", textAlign: "center", py: 12 }}
      container
      justifyContent="center"
    >
      <Box>
        <Typography
          component="h3"
          variant="h5"
          sx={{ lineHeight: "36.92px", mb: 2 }}
          color="tertiary.main"
        >
          More layers to your ebook
        </Typography>
        <Typography sx={{ mb: 4 }} variant="subtitle1" color="tertiary.main">
          As unique entities, your ebooks would have additional layers on our
          platform
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Grid container flexDirection="column" alignItems="center">
              <img
                style={{ width: "5.5rem" }}
                src="static/images/popular-man.svg"
              />
              <Typography
                sx={{
                  width: "8rem",
                  maxWidth: "8rem",
                  textAlign: "center",
                  mt: 2,
                }}
                variant="subtitle2"
                color="tertiary.main"
              >
                Special Person Pre Owned
              </Typography>
            </Grid>
          </Grid>{" "}
          <Grid item>
            <Grid container flexDirection="column" alignItems="center">
              <img
                style={{ width: "5rem" }}
                src="static/images/first-copy.svg"
              />
              <Typography
                sx={{
                  width: "8rem",
                  maxWidth: "8rem",
                  textAlign: "center",
                  mt: 2,
                }}
                variant="subtitle2"
                color="tertiary.main"
              >
                First Copies{" "}
              </Typography>
            </Grid>
          </Grid>{" "}
          <Grid item>
            <Grid container flexDirection="column" alignItems="center">
              <img
                style={{ width: "5rem" }}
                src="static/images/star-filled.svg"
              />
              <Typography
                sx={{
                  width: "8rem",
                  maxWidth: "8rem",
                  textAlign: "center",
                  mt: 2,
                }}
                variant="subtitle2"
                color="tertiary.main"
              >
                Limited Editions{" "}
              </Typography>
            </Grid>{" "}
          </Grid>
          <Grid item>
            <Grid container flexDirection="column" alignItems="center">
              <img
                style={{ width: "5rem" }}
                src="static/images/autograph.svg"
              />
              <Typography
                sx={{
                  width: "8rem",
                  maxWidth: "8rem",
                  textAlign: "center",
                  mt: 2,
                }}
                variant="subtitle2"
                color="tertiary.main"
              >
                Author Signed{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
