import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetPublisedBook } from "../../hooks/useGetPublisedBook";
import useMoralisInit from "../../hooks/useMoralisInit";
import Loader from "../loader/Loader";

export const BookFromPublishers = () => {
  const { getBooks, books, isLoading } = useGetPublisedBook();
  const { isInitialized } = useMoralisInit();
  useEffect(() => {
    if (isInitialized) getBooks();
  }, [getBooks, isInitialized]);

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};
