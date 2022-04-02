import { useState } from "react";
import { pranaHelperAddress } from "../config";
import PranaHelper from "../artifacts/contracts/pranaHelper.sol/pranaHelper.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import useMoralisInit from "./useMoralisInit";

export const useBuyTokenFromPrana = () => {
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { isAuthenticated, authenticate } = useMoralisInit();

  async function buyNft(book) {
    setLoading(true);

    if (!isAuthenticated) {
      authenticate();
    }
    let options = {
      contractAddress: pranaHelperAddress,
      functionName: "buyTokenFromPrana",
      abi: PranaHelper.abi.filter((fn) => fn.name === "buyTokenFromPrana"),
      params: {
        tokenId: book.tokenId,
      },
      msgValue: book.priceFromToken,
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return {
    loading,
    buyNft,
  };
};
