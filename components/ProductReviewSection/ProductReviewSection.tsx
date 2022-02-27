import { Box } from "@mui/system";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import { Grid, Typography } from "@mui/material";
import { RatingSummary } from "../RatingSummary/RatingSummary";
import { ReviewCard } from "../ReviewCard/ReviewCard";

export const ProductReviewSection = () => {
  return (
    <>
      <Box sx={{ border: "1px solid #e2e2e2", borderRadius: "8px" }}>
        <Grid
          container
          sx={{
            p: 2,
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #e2e2e2",
          }}
          alignItems="center"
        >
          <ReviewsOutlinedIcon />
          <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
            Reviews
          </Typography>
        </Grid>
        <RatingSummary />
        <ReviewCard />
      </Box>
    </>
  );
};
