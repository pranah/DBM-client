import { Button, Grid } from "@mui/material";
import React from "react";

export const ProductDetailButtonSetion = () => {
  return (
    <>
      <Grid
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 4, p: 2, border: "1px solid #dadada", borderRadius: "8px" }}
        container
      >
        <Grid item>Current Price 1.5</Grid>
        <Grid item>
          <Button variant="contained">Buy Now</Button>
        </Grid>
      </Grid>
    </>
  );
};
