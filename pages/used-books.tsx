import type { NextPage } from "next";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

let rpcEndpoint = null;
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { pranaAddress, pranaHelperAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import PranaHelper from "../artifacts/contracts/pranaHelper.sol/pranaHelper.json";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Loader from "../components/loader/Loader";
import { BookCard } from "../components/BookCard";
import useMoralisInit from "../hooks/useMoralisInit";
import Layout from "../components/layout";

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}
const UsedBooks: NextPage = () => {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    isWeb3Enabled,
  } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const authMeta = useCallback(async () => {
    if (!isAuthenticated) {
      await authenticate();
    }
  }, [authenticate]);

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      loadNFTs();
    } else {
      authMeta();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);
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
          console.log("viewTokenDetailsRespose", viewTokenDetailsRespose);

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
            setNfts((prevNft) => [...prevNft, item]);
          }
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getTokenList = async (tokenCount, owner) => {
    console.log("getTokenList", tokenCount);

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
  async function loadNFTs() {
    setNfts([]);
    const currentUser = Moralis.User.current();
    const owner = currentUser.attributes.ethAddress;

    const options = {
      contractAddress: pranaAddress,
      functionName: "numberofTokensForResale",
      abi: Prana.abi.filter((fn) => fn.name === "numberofTokensForResale"),
      params: { owner },
    };
    console.log("isAuthenticatedloadNFTs", isAuthenticated);
    await contractProcessor.fetch({
      params: options,
      onSuccess: (resp) => {
        console.log("resp", resp);
        getTokenList(resp, owner);
        setLoadingState("loaded");
      },
      onError: () => {
        setLoadingState("loaded");
      },
    });
  }

  async function buyNft(book) {
    setLoadingState("not-loaded");

    await authMeta();
    let options = {
      contractAddress: pranaHelperAddress,
      functionName: "buyTokenFromPrana",
      abi: PranaHelper.abi.filter((fn) => fn.name === "buyTokenFromPrana"),
      params: {
        tokenId: book.tokenId,
      },
      msgValue: book.resalePrice,
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
        },
        onSuccess: () => {
          loadNFTs();
          console.log("Success");
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingState("loaded");
  }
  if (loadingState !== "loaded") return <Loader />;

  if (loadingState === "loaded" && !nfts.length)
    return (
      <Layout>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
        >
          <Typography justifyContent={"center"} variant="h4" sx={{ mb: 5 }}>
            No items in marketplace
          </Typography>
        </Box>
      </Layout>
    );

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          pt: 4,
          pb: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Books
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // columns={{ xs: 4, sm: 9, md: 12 }}
        >
          {nfts.map((book, index) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={index}>
              <BookCard
                book={book}
                isPriceInWei
                actionButtons={() => (
                  <Button
                    fullWidth
                    color="primary"
                    size="large"
                    onClick={() => buyNft(book)}
                    variant="contained"
                  >
                    Buy
                  </Button>
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default UsedBooks;
