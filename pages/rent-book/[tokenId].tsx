import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import { PDP } from "../../components/pdp/pdp";
import useMoralisInit from "../../hooks/useMoralisInit";
import { useViewRentingTokenDetails } from "../../hooks/useViewRentingTokenDetails";
import { useRentToken } from "../../hooks/useRentToken";
import { useBuyTokenFromPrana } from "../../hooks/useBuyTokenFromPrana";
import Loader from "../../components/loader/Loader";
import { ProductDetailButtonSetion } from "../../components/ProductDetailButtonSetion/ProductDetailButtonSetion";

const RentBook = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { Moralis } = useMoralisInit();
  const { bookDetails, isLoading, getViewRentingTokenDetails } =
    useViewRentingTokenDetails();
  const { onRentButtonClick, loading } = useRentToken();

  useEffect(() => {
    if (tokenId) getViewRentingTokenDetails(tokenId);
  }, [router.query, tokenId]);

  const onRentClick = () => {
    onRentButtonClick(bookDetails);
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
                  onButtonClick={onRentClick}
                  buttonText="Rent"
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

export default RentBook;
