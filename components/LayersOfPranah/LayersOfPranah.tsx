import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Image from "next/image";

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
          sx={{ lineHeight: "36.92px", mb: 2, fontWeight: "600" }}
          color="tertiary.main"
        >
          More layers to your ebook
        </Typography>
        <Typography sx={{ mb: 4 }} variant="subtitle1" color="tertiary.main">
          As unique entities, your ebooks would have additional layers on our
          platform
        </Typography>
        <Grid
          container
          spacing={{
            sm: 4,
            xs: 4,
            md: 0,
          }}
          alignItems="center"
          sx={{
            width: { sm: "100%", xs: "100%", md: "auto" },
            justifyContent: { sm: "center", xs: "center" },
            ml: { xs: 0, sm: 0 },
            mt: 9,
          }}
        >
          <Grid item sx={{ mr: { md: 19 } }}>
            <Grid container flexDirection="column" alignItems="center">
              <Image
                width={100}
                height={80}
                alt="pre owned"
                src="/images/popular-man.svg"
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
          <Grid item sx={{ mr: { md: 19 } }}>
            <Grid container flexDirection="column" alignItems="center">
              <Image
                alt="first copy"
                width={80}
                height={80}
                src="/images/first-copy.svg"
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
          <Grid item sx={{ mr: { md: 19 } }}>
            <Grid container flexDirection="column" alignItems="center">
              <Image
                alt="limited edition"
                width={100}
                height={80}
                src="/images/star-filled.svg"
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
              <Image
                width={100}
                height={80}
                alt="Autographed"
                src="/images/autograph.svg"
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
