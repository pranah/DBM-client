import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import { PDP } from "../../components/pdp/pdp";
import useMoralisInit from "../../hooks/useMoralisInit";
import { useViewTokenDetails } from "../../hooks/useViewTokenDetails";
import { useBuyTokenFromPrana } from "../../hooks/useBuyTokenFromPrana";
import Loader from "../../components/loader/Loader";
import { ProductDetailButtonSetion } from "../../components/ProductDetailButtonSetion/ProductDetailButtonSetion";

const ResellBook = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { Moralis } = useMoralisInit();
  const { bookDetails, isLoading, getTokenDetails } = useViewTokenDetails();
  const { buyNft, loading } = useBuyTokenFromPrana();

  useEffect(() => {
    if (tokenId) getTokenDetails(tokenId);
  }, [router.query, tokenId]);

  const onBuyBook = () => {
    buyNft(bookDetails);
  };

  return (
    <>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <>
          {bookDetails && (
            <PDP
              buyProductSection={() => (
                <ProductDetailButtonSetion
                  price={bookDetails.price}
                  onButtonClick={onBuyBook}
                />
              )}
              productDetails={bookDetails}
            />
          )}
        </>
      )}
    </>
  );
};

export default ResellBook;
