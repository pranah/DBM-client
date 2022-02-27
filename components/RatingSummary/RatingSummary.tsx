import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { StaticRating } from "../StaticRating/StaticRating";

const reviewSummary = {
  rating: 4.3,
  totalReviews: 12,
  oneStarReviews: 4,
  twoStarReviews: 2,
  threeStarReviews: 3,
  fourStarReviews: 1,
  fiveStarRevoews: 2,
};

export const RatingSummary = () => {
  return (
    <Box sx={{ pl: 4 }}>
      <Grid
        sx={{ p: 2, pr: 4, backgroundColor: "#f0f0f0" }}
        columnSpacing={4}
        container
      >
        <Grid item sx={{ pl: `${0}!important` }} lg={2} md={2} sm={12} xs={12}>
          <Grid container alignItems="center">
            <StarIcon sx={{ fontSize: "2.5rem" }} />
            <Typography variant="h5" component="span">
              {reviewSummary.rating}
            </Typography>
          </Grid>
          <Typography
            variant="caption"
            component="span"
            color="text.secondary"
          >{`${reviewSummary.totalReviews} Reviews`}</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <StaticRating value={1} />
          <LinearProgress
            value={
              (reviewSummary.oneStarReviews / reviewSummary.totalReviews) * 100
            }
            variant="determinate"
          />
          <Typography variant="caption" component="span" color="text.secondary">
            {`${reviewSummary.oneStarReviews}/${reviewSummary.totalReviews}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <StaticRating value={2} />
          <LinearProgress
            value={
              (reviewSummary.twoStarReviews / reviewSummary.totalReviews) * 100
            }
            variant="determinate"
          />
          <Typography variant="caption" component="span" color="text.secondary">
            {`${reviewSummary.twoStarReviews}/${reviewSummary.totalReviews}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <StaticRating value={3} />
          <LinearProgress
            value={
              (reviewSummary.threeStarReviews / reviewSummary.totalReviews) *
              100
            }
            variant="determinate"
          />
          <Typography variant="caption" component="span" color="text.secondary">
            {`${reviewSummary.threeStarReviews}/${reviewSummary.totalReviews}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <StaticRating value={4} />
          <LinearProgress
            value={
              (reviewSummary.fourStarReviews / reviewSummary.totalReviews) * 100
            }
            variant="determinate"
          />
          <Typography variant="caption" component="span" color="text.secondary">
            {`${reviewSummary.fourStarReviews}/${reviewSummary.totalReviews}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <StaticRating value={5} />
          <LinearProgress
            value={
              (reviewSummary.fiveStarRevoews / reviewSummary.totalReviews) * 100
            }
            variant="determinate"
          />
          <Typography variant="caption" component="span" color="text.secondary">
            {`${reviewSummary.fiveStarRevoews}/${reviewSummary.totalReviews}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
