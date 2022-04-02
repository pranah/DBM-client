import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import useMoralisInit from "./useMoralisInit";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";

export const useRentToken = () => {
  const [loading, setLoading] = useState(false);

  const { Moralis, isAuthenticated, authenticate, isInitialized } =
    useMoralisInit();

  const contractProcessor = useWeb3ExecuteFunction();
  const onRentButtonClick = async (book) => {
    setLoading(true);

    if (!isAuthenticated) {
      authenticate();
    }

    let options = {
      contractAddress: pranaAddress,
      functionName: "rentToken",
      abi: Prana.abi.filter((fn) => fn.name === "rentToken"),
      params: {
        tokenId: book.tokenId,
      },
      msgValue: book.rentingPrice,
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
        onSuccess: () => {
          console.log("Success");
          setLoading(false);
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    onRentButtonClick,
  };
};
