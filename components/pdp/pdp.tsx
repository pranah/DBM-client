import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import StarRateIcon from "@mui/icons-material/StarRate";
import { BookDetailsBanner } from "../BookDetailsBanner/BookDetailsBanner";
import { NavigationDrawer } from "../NavigationDrawer/NavigationDrawer";
import { ProductDetailButtonSetion } from "../ProductDetailButtonSetion/ProductDetailButtonSetion";
import { ProductImage } from "../ProductImage/ProductImage";
import { ActivityTable } from "../ActivityTable/ActivityTable";
import { Box } from "@mui/system";
import { ProductReviewSection } from "../ProductReviewSection/ProductReviewSection";
import { MoreLikeThisProducts } from "../MoreLikeThisProducts/MoreLikeThisProducts";

type ProductDetails = {
  author: string;
  name: string;
  publisher: string;
  description: string;
  image: string;
  genre: string;
  language: string;
  price: string;
  isbn: string;
};

interface PDPProps {
  productDetails: ProductDetails;
  buyProductSection: React.FC;
}

export const PDP = ({ productDetails, buyProductSection }: PDPProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        height: "100%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <NavigationDrawer />
      <Box sx={{ width: "calc(100% - 19vw)", p: 4, overflowY: "auto" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <ProductImage imageUrl={productDetails.image} />
          </Grid>
          <Grid sx={{ px: 8 }} item xs={12} sm={12} md={8} lg={8}>
            <Typography
              sx={{ mb: 1, textTransform: "uppercase" }}
              component="h1"
              variant="h4"
            >
              {productDetails.name}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography component="span" variant="h6">
                By
              </Typography>{" "}
              <Typography component="span" variant="h6" color="primary">
                {productDetails.author}
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
              {`Published By ${productDetails.publisher}`}
            </Typography>
            <Typography sx={{ mb: 3 }} variant="body1">
              {productDetails.description}
            </Typography>
            <BookDetailsBanner
              language={productDetails.language}
              genre={productDetails.genre}
            />
            {buyProductSection && buyProductSection()}
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
  );
};
