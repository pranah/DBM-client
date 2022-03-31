import { useCallback, useEffect, useState } from "react";
import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import axios from "axios";

export const useViewTokenDetails = (tokenId: string) => {
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();

  const getTokens = useCallback(async () => {
    setIsLoading(true);
    const options = {
      contractAddress: pranaAddress,
      functionName: "viewTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewTokenDetails"),
      params: { _tokenId: tokenId },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
        },
        onSuccess: async (viewTokenDetailsRespose) => {
          // fetch meta data from ipfs
          const ipfsMetaDataResponse = await axios.get(
            viewTokenDetailsRespose[1]
          );
          if (ipfsMetaDataResponse.status !== 200) {
            throw new Error("Something went wrong");
          } else {
            const metaDataFromApi = ipfsMetaDataResponse.data;
            const item = {
              ...metaDataFromApi,
              tokenId,
              resalePrice: viewTokenDetailsRespose[3],
              displayPrice: viewTokenDetailsRespose[3],
              copyNumber: viewTokenDetailsRespose[2],
              isUpForResale: viewTokenDetailsRespose[4],
            };
            setBookDetails(item);
          }
          setIsLoading(false);
        },
      });
    } catch (error) {
      setIsLoading(false);

      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    if (tokenId) getTokens();
  }, [getTokens, tokenId]);

  return {
    isLoading,
    bookDetails,
  };
};
