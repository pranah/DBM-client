import { useEffect } from "react";
import { useViewRentingTokenDetails } from "./useViewRentingTokenDetails";
import { useViewTokenDetails } from "./useViewTokenDetails";

export const useGetMyBookDetails = (tokenId: string) => {
  const {
    getTokenDetails,
    isLoading,
    bookDetails: book,
  } = useViewTokenDetails();
  const { getViewRentingTokenDetails, bookDetails: rentedBookDetails } =
    useViewRentingTokenDetails();
  useEffect(() => {
    getTokenDetails(tokenId);
    getViewRentingTokenDetails(tokenId);
  }, []);

  return {
    isLoading,
    book,
    isUpForRenting: rentedBookDetails?.isUpForRenting,
  };
};
