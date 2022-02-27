import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const HowItWorks = () => {
  return (
    <>
      <Grid sx={{ px: 10, py: 15 }} container wrap="nowrap">
        <img style={{ width: "20rem" }} src="static/images/book-image.png" />
        <Box sx={{ py: 2 }}>
          <Box sx={{ p: 4, background: "#E7E7E7", height: "100%" }}>
            <Typography
              component="h2"
              variant="h6"
              sx={{ lineHeight: "36.92px" }}
            >
              HOW IT WORKS
            </Typography>
            <Typography
              component="h3"
              variant="h5"
              sx={{ lineHeight: "52.5px" }}
            >
              Every single ebook, each copy of every title, is unique!
            </Typography>
            <Typography sx={{ lineHeight: "33.23px" }}>
              To achieve this, each copy of ebooks is represented by an
              NFT(non-fungible token) on the blockchain to give it a unique
              identity.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
