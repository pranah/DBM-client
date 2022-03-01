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
            <Button variant="outlined" color="secondary" size="medium">
              Explore
            </Button>

            <Button sx={{ ml: 2 }} variant="contained" size="medium">
              {" "}
              Login
            </Button>
          </>
        )}
      />
      <Box sx={{ pt: 2 }}>
        <Grid sx={{ px: 12 }} spacing={1} container>
          <Grid item md={6} xl={6} lg={6}>
            <Typography
              sx={{
                lineHeight: "78px",

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
              }}
              color="primary"
              variant="contained"
              size="large"
            >
              Explore <ArrowForwardIcon />
            </Button>
          </Grid>
          <Grid item md={6} xl={6} lg={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
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
