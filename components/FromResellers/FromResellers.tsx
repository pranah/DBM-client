import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import useMoralisInit from "../../hooks/useMoralisInit";

import { pranaAddress } from "../../config";
import Prana from "../../artifacts/contracts/prana.sol/prana.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import axios from "axios";
import Loader from "../loader/Loader";
import { ethers } from "ethers";

export const FromResellers = () => {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    isWeb3Enabled,
  } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const getTokens = useCallback(async (tokenId) => {
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
              price: ethers.utils.formatUnits(
                viewTokenDetailsRespose[3].toString(),
                "ether"
              ),
              displayPrice: viewTokenDetailsRespose[3],
              copyNumber: viewTokenDetailsRespose[2],
              isUpForResale: viewTokenDetailsRespose[4],
            };
            setBooks((prevBooks) => [...prevBooks, item]);
          }
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  const getTokenList = useCallback(
    async (tokenCount: number) => {
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
    },
    [getTokens]
  );

  const getUsedBooks = useCallback(async () => {
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
        getTokenList(resp);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [Moralis.User, getTokenList]);

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      getUsedBooks();
    } else if (!isAuthenticated) {
      authenticate();
    }
  }, [
    authenticate,
    getUsedBooks,
    isAuthenticated,
    isInitialized,
    isWeb3Enabled,
  ]);

  return (
    <>
      {/* <MarketPlaceContainer /> */}
      {loading ? (
        <Loader />
      ) : (
        <Grid spacing={3} container>
          {books.map((product, index) => (
            <Grid item key={index}>
              <ProductCard
                to={`/resell-book/${product.tokenId}`}
                showBuyButton
                hoverEffect
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
