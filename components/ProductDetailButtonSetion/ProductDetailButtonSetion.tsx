import { Button, Grid, Typography } from "@mui/material";
import React from "react";

export const ProductDetailButtonSetion = () => {
  return (
    <>
      <Grid
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 3, p: 1, border: "1px solid #dadada", borderRadius: "8px" }}
        container
      >
        <Grid item>
          <Typography sx={{ mr: 2 }} variant="caption">
            {" "}
            Current Price{" "}
          </Typography>
          1.5
        </Grid>
        <Grid item flexGrow={1} sx={{ ml: 2 }}>
          <Button size="large" fullWidth variant="contained">
            Buy Now
          </Button>
        </Grid>
      </Grid>
    </>
  );
};