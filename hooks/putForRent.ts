import { useWeb3ExecuteFunction } from "react-moralis";

import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import useMoralisInit from "../hooks/useMoralisInit";
import { LoaderContext } from "../context/providers/loading.provider";
import { useCallback, useContext, useEffect, useState } from "react";

export const usePutForRent = () => {
  const { Moralis } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();
  const { hideLoader, showLoader } = useContext(LoaderContext);

  const rentNFT = useCallback(
    async (
      myBookValueInEth: number,
      numberofBlocksToRent: number,
      tokenId: string,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      showLoader();
      const rentPrice = Moralis.Units.ETH(myBookValueInEth);
      const _numberofBlocksToRent = numberofBlocksToRent * 20;
      let options = {
        contractAddress: pranaAddress,
        functionName: "putForRent",
        abi: Prana.abi.filter((fn) => fn.name === "putForRent"),
        params: {
          _newPrice: rentPrice,
          tokenId,
          _numberofBlocksToRent,
        },
      };
      try {
        await contractProcessor.fetch({
          params: options,
          onError: (err) => {
            hideLoader();

            console.log(err);
            throw err;
          },
          onSuccess: () => {
            console.log("success");
            hideLoader();

            onSuccess && onSuccess();
          },
        });
      } catch (error) {
        onError && onError();
        console.log(error);
      }
    },
    [Moralis.Units, contractProcessor, hideLoader, showLoader]
  );

  return {
    rentNFT,
  };
};
