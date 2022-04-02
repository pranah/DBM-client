import { Button, Grid, Typography } from "@mui/material";
import React from "react";

export const ProductDetailButtonSetion = ({
  price,
  onButtonClick,
  buttonText,
}) => {
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
          {price}
        </Grid>
        <Grid item flexGrow={1} sx={{ ml: 2 }}>
          <Button
            onClick={onButtonClick}
            size="large"
            fullWidth
            variant="contained"
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

ProductDetailButtonSetion.defaultProps = {
  buttonText: "Buy Now",
  onButtonClick: () => null,
};
