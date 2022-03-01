import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const HowItWorks = () => {
  return (
    <>
      <Grid
        sx={{ px: 10, py: 15, backgroundColor: "tertiary.main" }}
        container
        wrap="nowrap"
      >
        {/* <img style={{ width: "20rem" }} src="static/images/book-image.png" /> */}
        <Box sx={{ py: 2 }}>
          <Box
            sx={{
              p: 4,
              height: "100%",
              color: "tertiary.text",
              textAlign: "center",
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{ lineHeight: "36.92px" }}
            >
              When Ebook As NFT’s{" "}
            </Typography>
            {/* <Typography
              component="h3"
              variant="h5"
              sx={{ lineHeight: "52.5px" }}
            >
              Every single ebook, each copy of every title, is unique!
            </Typography> */}
            <Typography sx={{ lineHeight: "35.2px" }}>
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
