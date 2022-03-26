import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetPublisedBook } from "../../hooks/useGetPublisedBook";
import useMoralisInit from "../../hooks/useMoralisInit";

export const BookFromPublishers = () => {
  const { getBooks, books } = useGetPublisedBook();
  const { isInitialized } = useMoralisInit();

  useEffect(() => {
    if (isInitialized) getBooks();
  }, [isInitialized]);

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      <Grid spacing={3} container>
        {books.map((product, index) => (
          <Grid item key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
