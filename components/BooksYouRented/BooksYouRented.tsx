import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetMyRentedBooks } from "../../hooks/useGetMyRentedBooks";
import useMoralisInit from "../../hooks/useMoralisInit";
import Loader from "../loader/Loader";

export const BooksYouRented = () => {
  const { getBooks, books, loading } = useGetMyRentedBooks();
  const { isInitialized } = useMoralisInit();
  useEffect(() => {
    if (isInitialized) getBooks();
  }, [isInitialized]);

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      {loading ? (
        <Loader />
      ) : (
        <Grid spacing={3} container>
          {books.map((product, index) => (
            <Grid item key={index}>
              <ProductCard
                to={`my-book/${product.tokenId}`}
                //   showBuyButton
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
