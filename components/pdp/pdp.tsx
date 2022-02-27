import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import StarRateIcon from "@mui/icons-material/StarRate";
import { BookDetailsBanner } from "../BookDetailsBanner/BookDetailsBanner";
import { NavigationDrawer } from "../NavigationDrawer/NavigationDrawer";
import { ProductDetailButtonSetion } from "../ProductDetailButtonSetion/ProductDetailButtonSetion";
import { ProductImage } from "../ProductImage/ProductImage";
import { ActivityTable } from "../ActivityTable/ActivityTable";
import { Box } from "@mui/system";
import { ProductReviewSection } from "../ProductReviewSection/ProductReviewSection";
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import ProductCard from "../ProductCard/ProductCard";
import { productsArray } from "../../utils";
import { MoreLikeThisProducts } from "../MoreLikeThisProducts/MoreLikeThisProducts";

export const PDP = () => {
  return (
    <Container sx={{ backgroundColor: "#f5f5f5" }} maxWidth="lg">
      <Box sx={{ display: "flex" }}>
        <NavigationDrawer />
        <Box sx={{ width: "calc(100% - 19vw)", py: 4 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <ProductImage />
            </Grid>
            <Grid sx={{ px: 8 }} item xs={12} sm={12} md={8} lg={8}>
              <Typography
                sx={{ mb: 1, textTransform: "uppercase" }}
                component="h1"
                variant="h4"
              >
                Title of book
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography component="span" variant="h6">
                  By
                </Typography>{" "}
                <Typography component="span" variant="h6" color="primary">
                  Arjun
                </Typography>
              </Box>

              <Grid container alignItems="center" sx={{ mb: 2 }}>
                <StarRateIcon />
                <Typography component="span" variant="subtitle1">
                  {`${4.3}`}
                </Typography>
                <Typography
                  sx={{ ml: 2 }}
                  color="text.secondary"
                  component="span"
                  variant="subtitle1"
                >
                  12 Reviews
                </Typography>
              </Grid>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Owned By Arjun
              </Typography>
              <Typography sx={{ mb: 3 }} variant="body1">
                Clap When You Land, written by Elizabeth Acevedo, is a young
                adult novel published by HarperTeen on May 5, 2020. The
                audiobook, produced by Harper Audio and narrated by
                Melania-Luisa Marte and Elizabeth More..
              </Typography>
              <BookDetailsBanner />
              <ProductDetailButtonSetion />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <ActivityTable />
          </Box>
          <Box sx={{ mt: 4 }}>
            <MoreLikeThisProducts />
          </Box>
          <Box sx={{ mt: 4 }}>
            <ProductReviewSection />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};