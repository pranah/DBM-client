import React from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <Grid
        sx={{ px: 10, py: 4, backgroundColor: "#E2E2E2" }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid sx={{ display: "flex", alignItems: "center" }} item>
          <img src="static/images/logo.svg" />

          <Link href="#">
            <Typography
              sx={{
                mr: 2,
                ml: 2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              variant="body2"
            >
              About
            </Typography>
          </Link>
          <Link href="#">
            <Typography
              sx={{
                mr: 2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              variant="body2"
            >
              Contact
            </Typography>
          </Link>
          <Link href="#">
            <Typography
              sx={{
                mr: 2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              variant="body2"
            >
              Terms
            </Typography>
          </Link>
          <Link href="#">
            <Typography
              sx={{
                mr: 2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              variant="body2"
            >
              Privacy Policy
            </Typography>
          </Link>
        </Grid>
        <Box display={{ xs: "none", lg: "block" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }} item>
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="static/images/linkedin.svg"
            />
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="static/images/twitter.svg"
            />
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="static/images/discord.svg"
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
