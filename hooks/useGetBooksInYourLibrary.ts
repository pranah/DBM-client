import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import useMoralisInit from "./useMoralisInit";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import axios from "axios";
import { getNewMoralisUrl } from "../utils";

export const useGetBooksInYourLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    Moralis,
    isAuthenticated,
    authenticate,
    chainId,
    account,
  } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();

  const getViewRentingTokenDetails = async (tokenId) => {
    let tokenDetailsForTokenId = null;

    let options = {
      contractAddress: pranaAddress,
      functionName: "viewRentingTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewRentingTokenDetails"),
      params: {
        _tokenId: tokenId,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onError: (err) => {
        console.log(err);
        throw err;
      },
      onSuccess: (result) => {
        tokenDetailsForTokenId = {
          isbn: result[0],
          isUpForRenting: result[6],
          rentingPrice: result[4],
          cid: result[1],
          numberOfBlocksToRent: result[5],
          copyNumber: result[2],
        };
      },
    });
    return tokenDetailsForTokenId;
  };

  const getTokens = async (tokenId) => {
    const options = {
      contractAddress: pranaAddress,
      functionName: "viewTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewTokenDetails"),
      params: { _tokenId: tokenId },
    };
    await contractProcessor.fetch({
      params: options,
      onError: (err) => {
        console.log(err);
        throw err;
      },
      onSuccess: async (viewTokenDetailsRespose) => {
        // fetch meta data from ipfs
        const ipfsMetaDataResponse = await axios.get(
          getNewMoralisUrl(viewTokenDetailsRespose[1])
        );
        if (ipfsMetaDataResponse.status !== 200) {
          throw new Error("Something went wrong");
        } else {
          const viewRentTokenDetails = await getViewRentingTokenDetails(
            tokenId
          );

          const metaDataFromApi = ipfsMetaDataResponse.data;
          const item = {
            ...metaDataFromApi,
            tokenId,
            copyNumber: Number(viewTokenDetailsRespose[2]),
            isUpForResale: viewTokenDetailsRespose[4],
            isUpForRenting: viewRentTokenDetails.isUpForRenting,
          };
          setBooks((prevNft) => {
            if (
              prevNft.findIndex((nft) => nft.tokenId === item.tokenId) === -1
            ) {
              return [...prevNft, item];
            }
            return prevNft;
          });
        }
      },
    });
  };

  const getBooks = async () => {
    setBooks(() => {
      console.log("this is the conole");
      return [];
    });

    if (!isAuthenticated) {
      authenticate();
    }
    setLoading(true);
    const nftTokens = await Moralis.Web3API.account.getNFTsForContract({
      chain: chainId,
      address: account,
      token_address: pranaAddress,
    });
    const tokens = nftTokens?.result;
    console.log("this is the tokens", tokens);
    console.log("this is the books", books);

    for (let index = 0; index < tokens?.length; index++) {
      await getTokens(tokens[index].token_id);
    }

    setLoading(false);
  };

  return {
    getBooks,
    loading,
    books,
  };
};
