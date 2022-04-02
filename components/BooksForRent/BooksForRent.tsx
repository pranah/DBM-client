import { useEffect, useState, useContext, useCallback } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import { pranaAddress } from "../../config";

import Prana from "../../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";

import useMoralisInit from "../../hooks/useMoralisInit";

export const BooksForRent = () => {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    chainId,
    account,
    isWeb3Enabled,
  } = useMoralisInit();

  const contractProcessor = useWeb3ExecuteFunction();

  const [booksForRent, setBooksForRent] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const authMeta = useCallback(async () => {
    if (!isAuthenticated) {
      console.log("rented------authenticate");
      await authenticate();
    }
  }, [authenticate]);

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      getBooksForRent();
    } else {
      console.log("rented2------authenticate");

      authenticate();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  const findOwnerOfToken = async (tokenId) => {
    let ownerAddress = null;
    let options = {
      contractAddress: pranaAddress,
      functionName: "ownerOf",
      abi: Prana.abi.filter((fn) => fn.name === "ownerOf"),
      params: {
        tokenId,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
        },
        onSuccess: (address) => {
          ownerAddress = address;
          console.log("Success");
        },
      });
      return ownerAddress;
    } catch (error) {
      console.log(error);
    }
  };

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
    try {
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
            price: ethers.utils.formatUnits(result[4].toString(), "ether"),
            displayPrice: result[4],
            cid: result[1],
            numberOfBlocksToRent: result[5],
            copyNumber: result[2],
          };
        },
      });
      return tokenDetailsForTokenId;
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenForRentingAtIndex = async (index) => {
    let tokenIdsForSale = null;
    let options = {
      contractAddress: pranaAddress,
      functionName: "tokenForRentingAtIndex",
      abi: Prana.abi.filter((fn) => fn.name === "tokenForRentingAtIndex"),
      params: {
        index,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: (result) => {
          console.log("success", result);
          tokenIdsForSale = result;
        },
      });
      return tokenIdsForSale;
    } catch (error) {
      console.log(error);
    }
  };

  async function getBooksForRent() {
    //   psedo
    // TODO - NOT WORKING NEED TESTING
    setBooksForRent([]);
    let options = {
      contractAddress: pranaAddress,
      functionName: "numberofTokensForRenting",
      abi: Prana.abi.filter((fn) => fn.name === "numberofTokensForRenting"),
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: async (result) => {
          for (let index = 0; index < Number(result); index++) {
            try {
              const tokenIdForSale = await getTokenForRentingAtIndex(index);
              const tokenDetailsForTokenId = await getViewRentingTokenDetails(
                tokenIdForSale
              );
              const ownerAddress = await findOwnerOfToken(tokenIdForSale);

              if (ownerAddress.toLowerCase() !== account.toLocaleLowerCase()) {
                const ipfsMetaDataResponse = await axios.get(
                  tokenDetailsForTokenId.cid
                );
                if (ipfsMetaDataResponse.status !== 200) {
                  throw new Error("Something went wrong");
                } else {
                  const metaDataFromApi = ipfsMetaDataResponse.data;
                  const item = {
                    ...metaDataFromApi,
                    ...tokenDetailsForTokenId,
                    tokenId: tokenIdForSale,
                  };
                  setBooksForRent((prevNft) => [...prevNft, item]);
                }
              }
            } catch (error) {
              throw error;
            }
          }
        },
      });

      setLoadingState("loaded");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      <Grid spacing={3} container>
        {booksForRent.map((product, index) => (
          <Grid item key={index}>
            <ProductCard to="" hoverEffect product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
