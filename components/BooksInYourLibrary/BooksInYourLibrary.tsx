import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetBooksInYourLibrary } from "../../hooks/useGetBooksInYourLibrary";
import useMoralisInit from "../../hooks/useMoralisInit";
import Loader from "../loader/Loader";

export const BooksInYourLibrary = () => {
  const { getBooks, books, loading } = useGetBooksInYourLibrary();
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
