import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import useMoralisInit from "./useMoralisInit";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";

export const useBuyBook = (book) => {
  const { Moralis, isAuthenticated, authenticate, isInitialized } =
    useMoralisInit();

  const contractProcessor = useWeb3ExecuteFunction();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function buyBook() {
    setLoading(true);
    if (!isAuthenticated) {
      authenticate();
    }
    let options = {
      contractAddress: pranaAddress,
      functionName: "directPurchase",
      abi: Prana.abi.filter((fn) => fn.name === "directPurchase"),
      params: {
        _isbn: book.isbn,
      },
      msgValue: Moralis.Units.ETH(book.price),
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (error) => {
          setLoading(false);
          setError(error);
          console.log(error);
        },
        onSuccess: () => {
          setLoading(false);
          console.log("Success");
        },
      });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  return {
    buyBook,
    loading,
    error,
  };
};
