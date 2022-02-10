import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Typography from "@mui/material/Typography";

import { ResellMyBook } from "../components/ResellMyBook";

import { pranaAddress } from "../config";
import useMoralisInit from "../hooks/useMoralisInit";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { BookDetailsContext } from "../context/providers/book-details.provider";
import { useWeb3ExecuteFunction } from "react-moralis";
import { RentMyBook } from "../components/RentMyBook";
import Loader from "./loader/Loader";
import { BookCard } from "./BookCard";

export default function MyBooksTab() {
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

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("loaded");
  const { updateBookDetails } = useContext(BookDetailsContext);

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      console.log("mybooks------loadNFTs");

      setNfts([]);
      loadNFTs();
    } else {
      console.log("mybooks------authenticate");

      authenticate();
    }
  }, [isInitialized, isAuthenticated, account, isWeb3Enabled]);

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
    console.log("tokenId", tokenId);

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
        console.log("viewTokenDetailsRespose", viewTokenDetailsRespose);
        // fetch meta data from ipfs
        const ipfsMetaDataResponse = await axios.get(
          viewTokenDetailsRespose[1]
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
          setNfts((prevNft) => [...prevNft, item]);
        }
      },
    });
  };

  async function loadNFTs() {
    console.log("chainId", chainId);
    const nftTokens = await Moralis.Web3API.account.getNFTsForContract({
      chain: chainId,
      address: account,
      token_address: pranaAddress,
    });
    const tokens = nftTokens?.result;
    console.log("getTokens");
    await Promise.all(
      tokens.map((token) => {
        console.log("token", token);

        return getTokens(token.token_id);
      })
    );
    setLoadingState("loaded");
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
      <Typography variant="h4" sx={{ mb: 5 }}>
        My Books
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {nfts.map((book, index) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={index}>
            <BookCard
              book={book}
              actionButtons={() => {
                return (
                  <>
                    {" "}
                    <Link href={`/reader/${book.isbn}?tokenId=${book.tokenId}`}>
                      <Button
                        onClick={() => {
                          updateBookDetails({
                            isbn: book.isbn,
                            tokenId: book.tokenId,
                            bookUrl: book.file,
                          });
                        }}
                        color="primary"
                        variant="contained"
                        size="large"
                      >
                        Read
                      </Button>
                    </Link>
                    {!book.isUpForResale && !book.isUpForRenting && (
                      <ResellMyBook
                        tokenId={book.tokenId}
                        bookName={book.name}
                        setLoadingState={setLoadingState}
                        loadNFTs={loadNFTs}
                      />
                    )}
                    {!book.isUpForResale && !book.isUpForRenting && (
                      <RentMyBook
                        tokenId={book.tokenId}
                        bookName={book.name}
                        loadNFTs={loadNFTs}
                      />
                    )}
                  </>
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
