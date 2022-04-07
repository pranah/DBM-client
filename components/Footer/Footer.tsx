import React from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <Box
        display={{ xs: "block", lg: "none" }}
        sx={{ textAlign: "center", backgroundColor: "#E2E2E2", py: 8 }}
      >
        <Typography color="tertiary.main" variant="body">
          Join the Community{" "}
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <a
            href="https://www.linkedin.com/company/pranah/"
            rel="noreferrer"
            target="_blank"
          >
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="images/linkedin.svg"
            />
          </a>
          <a
            href="https://twitter.com/pranaheBooks"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="images/twitter.svg"
            />
          </a>
          <a
            href="https://discord.gg/vY9QKV5z"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            <img
              style={{ marginRight: "1rem", display: "inline-block" }}
              src="images/discord.svg"
            />
          </a>
        </Grid>
      </Box>
      <Grid
        sx={{ px: 10, py: 4, backgroundColor: { md: "#E2E2E2" } }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { sm: "column", xs: "column", md: "row" },
            width: { sm: "100%", xs: "100%", md: "auto" },
          }}
          item
        >
          <img src="images/logo.svg" />

          <Link href="#">
            <Typography
              sx={{
                mr: { md: 2 },
                ml: { md: 2 },
                mt: { sm: 2, xs: 2, md: 0 },
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
                mr: { md: 2 },
                mt: { sm: 2, xs: 2, md: 0 },
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
                mr: { md: 2 },
                mt: { sm: 2, xs: 2, md: 0 },
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
                mr: { md: 2 },
                mt: { sm: 2, xs: 2, md: 0 },
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
            <a
              href="https://www.linkedin.com/company/pranah/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                style={{ marginRight: "1rem", display: "inline-block" }}
                src="images/linkedin.svg"
              />
            </a>
            <a
              href="https://twitter.com/pranaheBooks"
              rel="noreferrer"
              target="_blank"
            >
              {" "}
              <img
                style={{ marginRight: "1rem", display: "inline-block" }}
                src="images/twitter.svg"
              />
            </a>
            <a
              href="https://discord.gg/vY9QKV5z"
              rel="noreferrer"
              target="_blank"
            >
              {" "}
              <img
                style={{ marginRight: "1rem", display: "inline-block" }}
                src="images/discord.svg"
              />
            </a>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
