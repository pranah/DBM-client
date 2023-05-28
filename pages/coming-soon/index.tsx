import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { Feedback } from "../../components/Feedback/Feedback";

const ComingSoon = () => {
  return (
    <div
      style={{
        overflowY: "auto",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        sx={{
          backgroundColor: "landingPageDarkPurple.main",
          width: "100%",
          height: "100%",
          mb: -32,
        }}
        flexDirection="column"
        alignItem="center"
        container
        wrap="nowrap"
      >
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Image
            alt="Pranah"
            src="/images/logo-light.svg"
            width={200}
            height={60}
          />
        </Box>
        {/* <div className={bgWrap}> */}

        <Typography
          sx={{
            textAlign: "center",
            color: "primary.contrastText",
            position: "relative",
            top: "3rem",
          }}
          variant="h5"
        >
          The Website is Under Construction
        </Typography>
        <Image
          alt="Mountains"
          src="/images/coming-soon.svg"
          width={400}
          height={300}
        />
        {/* </div> */}

        <Typography
          sx={{
            textAlign: "center",
            color: "primary.contrastText",
            mt: 5,
          }}
          variant="h6"
        >
          We’ll let you know when things are good to go
        </Typography>
      </Grid>

      <Feedback hidehelperText />
      <Footer />
    </div>
  );
};

export default ComingSoon;
