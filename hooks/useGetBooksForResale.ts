import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import useMoralisInit from "../hooks/useMoralisInit";
import axios from "axios";
import { useState } from "react";

export const useGetBooksForResale = () => {
  const { Moralis } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const getTokens = async (tokenId) => {
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
          throw err;
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
            console.log(item);
            setBooks((prevBooks) => [...prevBooks, item]);
          }
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getTokenList = async (tokenCount: number) => {
    for (let index = 0; index < tokenCount; index++) {
      const options = {
        contractAddress: pranaAddress,
        functionName: "tokenForResaleAtIndex",
        abi: Prana.abi.filter((fn) => fn.name === "tokenForResaleAtIndex"),
        params: { index },
      };
      await contractProcessor.fetch({
        params: options,
        onSuccess: (token) => {
          getTokens(token);
        },
      });
    }
  };
  async function getUsedBooks() {
    console.log("getUsed books");
    setLoading(true);
    setBooks([]);
    const currentUser = Moralis.User.current();
    const owner = currentUser.attributes.ethAddress;

    const options = {
      contractAddress: pranaAddress,
      functionName: "numberofTokensForResale",
      abi: Prana.abi.filter((fn) => fn.name === "numberofTokensForResale"),
      params: { owner },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: (resp) => {
        // getTokenList(resp, owner);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }
  return {
    getUsedBooks,
    loading,
    books,
  };
};
