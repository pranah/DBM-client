import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { productsArray } from "../../utils";
import ProductCard from "../ProductCard/ProductCard";
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

export const MoreLikeThisProducts = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e2e2e2",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
      }}
      component="section"
    >
      <Grid
        container
        alignItems="center"
        sx={{ borderBottom: "1px solid #e2e2e2", p: 1.5 }}
      >
        <ZoomInIcon sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2">
          More Like This
        </Typography>
      </Grid>
      <Box sx={{ p: 2 }}>
        <ProductCarousel>
          {productsArray.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ProductCarousel>
      </Box>
    </Box>
  );
};
