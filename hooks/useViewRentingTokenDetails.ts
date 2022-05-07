import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { getNewMoralisUrl } from "../utils";

export const useViewRentingTokenDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);

  const contractProcessor = useWeb3ExecuteFunction();

  const getViewRentingTokenDetails = async (tokenId) => {
    setIsLoading(true);
    let tokenDetailsForTokenId = null;

    let options = {
      contractAddress: pranaAddress,
      functionName: "viewRentingTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewRentingTokenDetails"),
      params: {
        _tokenId: tokenId,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          setIsLoading(false);
        },
        onSuccess: async (result) => {
          tokenDetailsForTokenId = {
            isbn: result[0],
            isUpForRenting: result[6],
            price: ethers.utils.formatUnits(result[4].toString(), "ether"),
            rentingPrice: result[4],
            cid: result[1],
            numberOfBlocksToRent: result[5],
            copyNumber: result[2],
          };
          const ipfsMetaDataResponse = await axios.get(
            getNewMoralisUrl(tokenDetailsForTokenId.cid)
          );
          if (ipfsMetaDataResponse.status !== 200) {
            throw new Error("Something went wrong");
          } else {
            const metaDataFromApi = ipfsMetaDataResponse.data;
            delete metaDataFromApi["price"];
            const book = {
              ...metaDataFromApi,
              ...tokenDetailsForTokenId,
              tokenId: tokenId,
            };
            setBookDetails(book);
          }
          setIsLoading(false);
        },
      });
      return tokenDetailsForTokenId;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    bookDetails,
    getViewRentingTokenDetails,
  };
};
