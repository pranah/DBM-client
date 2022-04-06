import { useCallback, useEffect, useState } from "react";
import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import axios from "axios";
import { ethers } from "ethers";

export const useViewTokenDetails = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();

  const getTokenDetails = useCallback(
    async (tokenId: string) => {
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
              console.log("metaDataFromApi", metaDataFromApi);
              console.log("viewTokenDetailsRespose", viewTokenDetailsRespose);
              const item = {
                ...metaDataFromApi,
                title: metaDataFromApi.name,
                tokenId,
                price: ethers.utils.formatUnits(
                  viewTokenDetailsRespose[3].toString(),
                  "ether"
                ),
                priceFromToken: viewTokenDetailsRespose[3],
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
    },
    [contractProcessor]
  );

  return {
    isLoading,
    getTokenDetails,
    bookDetails,
  };
};
