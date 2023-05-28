import Head from "next/head";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Features } from "../components/Features/Features";
import { Feedback } from "../components/Feedback/Feedback";
import { Footer } from "../components/Footer/Footer";
import { HowItWorks } from "../components/HowItWorks/HowItWorks";
import { MainHeader } from "../components/MainHeader/MainHeader";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LayersOfPranah } from "../components/LayersOfPranah/LayersOfPranah";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useRouter } from "next/router";
import { HomePageCarousel } from "../components/HomePageCarousel/HomePageCarousel";
import React, { useRef } from "react";

const Home = () => {
  const router = useRouter();
  const feedbackRef = useRef(null);

  return (
    <>
      <Head>
        <title>Pranah</title>
      </Head>
      <Box
        sx={{
          overflowY: "auto",
          height: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <MainHeader
          rightSideComponents={() => (
            <>
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                {/* <Button
                sx={{
                  borderRadius: "0.625rem",
                  textTransform: "none",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                }}
                variant="outlined"
                color="tertiary"
                size="medium"
                onClick={async () => {
                  feedbackRef.current.scrollIntoView()    
                            }}
              >
                Explore
              </Button>  */}

                <Button
                  href="#sign-up"
                  sx={{
                    ml: 2,
                    // color: "tertiary.main",
                    border: "1px solid",
                    borderColor: "tertiary.main",
                    borderRadius: "0.625rem",
                    textTransform: "none",
                    paddingRight: "2rem",
                    paddingLeft: "2rem",
                  }}
                  variant="contained"
                  size="medium"
                >
                  Login/Sign up
                </Button>
              </Box>
              <Box sx={{ display: { xs: "block", lg: "none" } }}>
                <Grid container alignItems="center">
                  <Typography
                    color="tertiary.main"
                    component="span"
                    sx={{ mr: 1 }}
                  >
                    <a style={{ textDecoration: "none" }} href="#sign-up">
                      Login/Sign up
                    </a>
                  </Typography>
                  <ArrowCircleRightOutlinedIcon color="tertiary" />
                </Grid>
              </Box>
            </>
          )}
        />
        <Box sx={{ pt: 2 }}>
          <Grid
            sx={{
              px: { sm: 2, xs: 2, md: 12 },
              pr: { md: 0 },
              mt: { md: 18 },
            }}
            spacing={1}
            container
          >
            <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
              <Typography
                sx={{
                  lineHeight: { sm: "110%", lg: "78px" },
                  fontWeight: 400,
                  // backgroundImage:
                  //   "radial-gradient(86.81% 906.07% at 3.08% 50%, #9977E1 0%, #76EBF2 97.32%)",
                  color: "landingPageDarkPurple.main",
                  // backgroundClip: "text",
                  // WebkitBackgroundClip: "text",
                  fontFamily: "Playfair+Display",
                }}
                component="h2"
                variant="h2"
                color="primary"
              >
                Your ebooks are yours, period.
              </Typography>
              <Typography
                sx={{ mt: 2, mb: 8 }}
                color="text.secondary"
                component="div"
                variant="h5"
              >
                An NFT marketplace for Books
              </Typography>
              <Button
                sx={{
                  padding: "0.5rem 3rem",
                  // color: "",
                  textTransform: "none",
                  // boxShadow: "5px 5px 0px #9977e1, inset 0px 4px 0px #76ebf2",
                }}
                color="primary"
                variant="contained"
                size="large"
                onClick={async () => {
                  feedbackRef.current.scrollIntoView();
                }}
              >
                SignUp for Early Access <ArrowForwardIcon />
              </Button>
            </Grid>
            <Grid
              sx={{ position: "relative" }}
              item
              xs={12}
              sm={12}
              md={12}
              xl={6}
              lg={6}
            >
              <HomePageCarousel />
            </Grid>
          </Grid>
          <HowItWorks />
          <LayersOfPranah />
          <Features />
          <div ref={feedbackRef}>
            <Feedback />
          </div>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Home;
