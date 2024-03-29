import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

export const HowItWorks = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Grid
        sx={{
          px: { xs: 2, sm: 2, md: 10 },
          py: { xs: 7, sm: 7, md: 15 },
          mt: { xs: 20, sm: 20, md: 54 },
          backgroundColor: "landingPageDarkPurple.main",
          position: "relative",
        }}
        container
        wrap="nowrap"
      >
        <Box
          sx={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            top: { xs: "-10%", sm: "-10%", md: "-50%" },
            // display: { xs: "none", md: "block" },
          }}
        >
          <video
            width={matches ? "340" : "794"}
            height={matches ? "186" : "436"}
            controls
            poster="images/video-thumbnail.png"
          >
            <source src="/how-it-works.mp4" type="video/mp4" />
          </video>
        </Box>

        {/* <img style={{ width: "20rem" }} src="images/book-image.png" /> */}
        <Box sx={{ py: 2, mt: 10 }}>
          <Box
            sx={{
              p: 4,
              height: "100%",
              color: "tertiary.text",
              textAlign: { md: "center" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                lineHeight: "36.92px",
                fontSize: { xs: "1.4rem", lg: "2rem" },
                fontWeight: 600,
                mb: 4,
              }}
            >
              When eBooks become NFTs{" "}
            </Typography>
            {/* <Typography
              component="h3"
              variant="h5"
              sx={{ lineHeight: "52.5px" }}
            >
              Every single ebook, each copy of every title, is unique!
            </Typography> */}
            <Typography
              sx={{
                lineHeight: "32px",
                width: { sx: "100%", lg: "80%" },
                fontSize: { xs: "1rem", lg: "1.25rem" },
              }}
            >
              At Prānah, our mission is simple: give our beloved readers
              ultimate freedom over the ebooks they own. You paid for your
              ebooks, they’re your property. So it’s only logical that you
              should be given full freedom over them: to resell them, to auction
              them off, gift, rent, or even burn them!
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
