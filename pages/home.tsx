import styled from "@emotion/styled";
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

type ImageProps = {
  left?: string;
  right?: string;
  zIndex?: number;
};

const ImageComponent = styled("img")<ImageProps>`
  width: 50%;
  position: relative;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
`;

const Home = () => {
  return (
    <>
      <MainHeader
        rightSideComponents={() => (
          <>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <Button
                sx={{
                  borderRadius: "0.625rem",
                  textTransform: "none",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                }}
                variant="outlined"
                color="tertiary"
                size="medium"
              >
                Explore
              </Button>

              <Button
                sx={{
                  ml: 2,
                  color: "tertiary.main",
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
                {" "}
                Login
              </Button>
            </Box>
            <Box sx={{ display: { xs: "block", lg: "none" } }}>
              <Grid container alignItems="center">
                <Typography
                  color="tertiary.main"
                  variant="span"
                  component="span"
                >
                  Login
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
            px: { sm: 4, xs: 4, md: 12 },
          }}
          spacing={1}
          container
        >
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <Typography
              sx={{
                lineHeight: { sm: "110%", lg: "78px" },
                fontWeight: 600,
              }}
              component="h2"
              variant="h3"
              color="primary"
            >
              Your ebooks are yours, period.
            </Typography>
            <Typography
              sx={{ my: 5 }}
              color="text.secondary"
              component="div"
              variant="h5"
            >
              An NFT marketplace for Books
            </Typography>
            <Button
              sx={{
                padding: "0.5rem 3rem",
                color: "tertiary.main",
              }}
              color="primary"
              variant="contained"
              size="large"
            >
              Explore <ArrowForwardIcon />
            </Button>
          </Grid>
          <Grid item md={6} xl={6} lg={6}>
            <Box
              sx={{ px: { xs: 4, sm: 4, md: 0 }, mt: { xs: 4, sm: 4, md: 0 } }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ImageComponent
                left="15%"
                zIndex={0}
                src="static/images/cover-1.png"
              />
              <ImageComponent src="static/images/cover-3.png" />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="static/images/cover-2.png"
              />
            </Box>
          </Grid>
        </Grid>
        <HowItWorks />
        <LayersOfPranah />
        <Features />
        <Feedback />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
