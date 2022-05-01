import { useCallback, useContext } from "react";

import { useWeb3ExecuteFunction } from "react-moralis";
import { LoaderContext } from "../context/providers/loading.provider";
import useMoralisInit from "./useMoralisInit";
import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";

export const usePutTokenForSale = () => {
  const { Moralis } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();
  const { hideLoader, showLoader } = useContext(LoaderContext);

  const resellNFT = useCallback(
    async (
      myBookValueInEth: number,
      tokenId: string,
      onSuccess: () => void,
      onError: () => void
    ) => {
      showLoader();
      const resalePrice = Moralis.Units.ETH(myBookValueInEth);
      let options = {
        contractAddress: pranaAddress,
        functionName: "putTokenForSale",
        abi: Prana.abi.filter((fn) => fn.name === "putTokenForSale"),
        params: {
          salePrice: resalePrice,
          tokenId: tokenId,
        },
      };
      try {
        await contractProcessor.fetch({
          params: options,
          onError: (err) => {
            hideLoader();
            onError();
            console.log("error", err);
            throw err;
          },
          onSuccess: () => {
            hideLoader();
            onSuccess();
          },
        });
      } catch (error) {
        hideLoader();
        console.log(error);
      }
    },
    [Moralis.Units, contractProcessor, hideLoader, showLoader]
  );
  return {
    resellNFT,
  };
};
