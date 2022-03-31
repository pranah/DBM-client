import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetPublisedBook } from "../../hooks/useGetPublisedBook";
import useMoralisInit from "../../hooks/useMoralisInit";

export const BookFromPublishers = () => {
  const { getBooks, books } = useGetPublisedBook();
  const { isInitialized } = useMoralisInit();
  console.log("book", books);
  useEffect(() => {
    if (isInitialized) getBooks();
  }, [getBooks, isInitialized]);

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      <Grid spacing={3} container>
        {books.map((product, index) => (
          <Grid item key={index}>
            <ProductCard
              to={`buy-book/${product.isbn}`}
              showBuyButton
              hoverEffect
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
