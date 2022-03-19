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
import { useRouter } from "next/router";

type ImageProps = {
  left?: string;
  right?: string;
  zIndex?: number;
};

// const ImageComponent = styled("img")<ImageProps>`
//   width: 50%;
//   position: relative;
//   left: ${(props) => props.left};
//   right: ${(props) => props.right};
//   z-index: ${(props) => props.zIndex};
// `;

const ImageComponent = styled("img")<ImageProps>`
  width: 100%;
  margin-right: 0.5rem;
  @media (max-width: 768px) {
    width: 30%;
  }
`;
const Home = () => {
  const router = useRouter();

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
                onClick={async () => {
                  router.push("/listing");
                }}
              >
                Explore
              </Button>

              <Button
                href="#sign-up"
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
                Login/Sign up
              </Button>
            </Box>
            <Box sx={{ display: { xs: "block", lg: "none" } }}>
              <Grid container alignItems="center">
                <Typography
                  color="tertiary.main"
                  variant="span"
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
          }}
          spacing={1}
          container
        >
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <Typography
              sx={{
                lineHeight: { sm: "110%", lg: "78px" },
                fontWeight: 600,
                backgroundImage:
                  "radial-gradient(86.81% 906.07% at 3.08% 50%, #9977E1 0%, #76EBF2 97.32%)",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
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
                textTransform: "none",
                boxShadow: "5px 5px 0px #9977e1, inset 0px 4px 0px #76ebf2",
              }}
              color="primary"
              variant="contained"
              size="large"
              onClick={async () => {
                router.push("/listing");
              }}
            >
              Explore <ArrowForwardIcon />
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
            <Box
              sx={{
                height: "100%",
                width: "50%",
                background:
                  "linear-gradient(89.85deg, #F5F5F5 0.14%, rgba(245, 245, 245, 0.95) 45.61%, rgba(245, 245, 245, 0.44) 74.6%, rgba(245, 245, 245, 0) 99.45%, rgba(245, 245, 245, 0) 113.74%)",
                position: "absolute",
                left: 0,
              }}
            ></Box>
            <Box
              sx={{
                px: { xs: 4, sm: 4, md: 0 },
                mt: { xs: 4, sm: 4, md: 0 },
                overflow: "hidden",
                width: "100%",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ImageComponent left="15%" zIndex={0} src="images/image-7.png" />
              <ImageComponent left="15%" zIndex={0} src="images/image-2.png" />
              <ImageComponent src="images/image-3.png" />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-4.png"
              />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-5.png"
              />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-6.png"
              />
            </Box>
            <Box
              sx={{
                px: { xs: 4, sm: 4, md: 0 },
                mt: { xs: 4, sm: 4, md: 0 },
                overflow: "hidden",
                width: "100%",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ImageComponent left="15%" zIndex={0} src="images/image-2.png" />
              <ImageComponent src="images/image-3.png" />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-4.png"
              />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-5.png"
              />
              <ImageComponent
                right="15%"
                zIndex={-1}
                src="images/image-6.png"
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
