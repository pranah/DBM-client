import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useState } from "react";
import useMoralisInit from "./useMoralisInit";
import { useWeb3ExecuteFunction } from "react-moralis";

import Web3Modal from "web3modal";

import { ethers } from "ethers";
import axios from "axios";
import { getNewMoralisUrl, isThereBookDuplicateBooks } from "../utils";
export const useGetMyRentedBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    account,
    isWeb3Enabled,
  } = useMoralisInit();

  const contractProcessor = useWeb3ExecuteFunction();

  const getNumberOfRentedTokens = async () => {
    let rentedTokenCount = null;
    const options = {
      contractAddress: pranaAddress,
      functionName: "numberOfRentedTokens",
      abi: Prana.abi.filter((fn) => fn.name === "numberOfRentedTokens"),
      params: { _rentee: account },
    };

    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: async (numberOfRentedTokens) => {
          rentedTokenCount = numberOfRentedTokens;
        },
      });
      return rentedTokenCount;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTokenOfRenteeByIndex = async (index) => {
    let tokenId = null;
    const options = {
      contractAddress: pranaAddress,
      functionName: "tokenOfRenteeByIndex",
      abi: Prana.abi.filter((fn) => fn.name === "tokenOfRenteeByIndex"),
      params: { _rentee: account, index },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: async (tokenOfRenteeByIndex) => {
          tokenId = tokenOfRenteeByIndex;
        },
      });
      return tokenId;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getRentingTokenDetails = async (tokenId) => {
    let bookDetails = null;
    const options = {
      contractAddress: pranaAddress,
      functionName: "viewRentingTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewRentingTokenDetails"),
      params: { _tokenId: tokenId },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: async (bookDetailsFromChain) => {
          bookDetails = bookDetailsFromChain;
        },
      });
      return bookDetails;
    } catch (error) {
      console.log("Error", error);
    }
  };

  async function getBooks() {
    setLoading(true);

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const blockNumber = await provider.getBlockNumber();

      const countOfRentedBooks = await getNumberOfRentedTokens();
      for (let index = 0; index < countOfRentedBooks; index++) {
        const tokenId = await getTokenOfRenteeByIndex(index);
        const rentingTokenDetails = await getRentingTokenDetails(tokenId);
        if (rentingTokenDetails) {
          // setBooks((prevNft) => [...prevNft, item]);
          const bookDetails = {
            isbn: rentingTokenDetails[0],
            cid: rentingTokenDetails[1],
            copyNumber: Number(rentingTokenDetails[2]),
            rentedAtBlock: rentingTokenDetails[3],
            rentingPrice: rentingTokenDetails[4],
            numberOfBlocksToRent: rentingTokenDetails[5],
            isUpForRenting: rentingTokenDetails[6],
          };
          const blockDifference = blockNumber - bookDetails.rentedAtBlock;
          const numberOfBlocksRentedFor = bookDetails.numberOfBlocksToRent;
          const isforRentingBasedOnBlockNumber =
            blockDifference <= numberOfBlocksRentedFor;
          if (isforRentingBasedOnBlockNumber) {
            const ipfsMetaDataResponse = await axios.get(
              getNewMoralisUrl(bookDetails.cid)
            );
            if (ipfsMetaDataResponse.status !== 200) {
              throw new Error("Something went wrong");
            } else {
              const metaDataFromApi = ipfsMetaDataResponse.data;
              const item = {
                ...metaDataFromApi,
                tokenId,
                ...bookDetails,
              };
              setBooks((prevNft) => {
                if (isThereBookDuplicateBooks(prevNft, item)) {
                  return [...prevNft, item];
                }
                return prevNft;
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  }
  return {
    getBooks,
    books,
    loading,
  };
};
