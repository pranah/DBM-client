import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Typography from "@mui/material/Typography";

import { pranaAddress } from "../config";

import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Loader from "./loader/Loader";
import useMoralisInit from "../hooks/useMoralisInit";
import { BookCard } from "./BookCard";

export default function MyRentedBooksTab() {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    account,
    isWeb3Enabled,
  } = useMoralisInit();

  const contractProcessor = useWeb3ExecuteFunction();

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      setNfts([]);
      loadNFTs();
    } else {
      authenticate();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

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

  async function loadNFTs() {
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
          // setNfts((prevNft) => [...prevNft, item]);
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
            const ipfsMetaDataResponse = await axios.get(bookDetails.cid);
            if (ipfsMetaDataResponse.status !== 200) {
              throw new Error("Something went wrong");
            } else {
              const metaDataFromApi = ipfsMetaDataResponse.data;
              const item = {
                ...metaDataFromApi,
                tokenId,
                ...bookDetails,
              };
              setNfts((prevNft) => [...prevNft, item]);
            }
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoadingState("loaded");
    }
  }
  if (loadingState !== "loaded") return <Loader />;

  if (loadingState === "loaded" && !nfts.length)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
        <Typography justifyContent={"center"} variant="h4" sx={{ mb: 5 }}>
          No Books found
        </Typography>
      </Box>
    );
  return (
    <Container
      sx={{
        pt: 4,
        pb: 4,
      }}
      maxWidth="xl"
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {nfts.map((book, index) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={index}>
            <BookCard
              book={book}
              actionButtons={() => (
                <Link
                  href={`/read-rented/${book.isbn}?tokenId=${book.tokenId}`}
                >
                  <Button color="primary" variant="contained" size="large">
                    Read
                  </Button>
                </Link>
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
