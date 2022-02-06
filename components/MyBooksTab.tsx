import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { ResellMyBook } from "../components/ResellMyBook";

import { pranaAddress } from "../config";

import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { BookDetailsContext } from "../context/providers/book-details.provider";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { RentMyBook } from "../components/RentMyBook";
import { ordinal_suffix_of } from "../utils";
import Loader from "./loader/Loader";

export default function MyBooksTab() {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    chainId,
    account,
  } = useMoralis();
  console.log("---------", isAuthenticated, isInitialized, chainId, account);
  const contractProcessor = useWeb3ExecuteFunction();

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const { updateBookDetails } = useContext(BookDetailsContext);

  useEffect(async () => {
    if (isAuthenticated && isInitialized) {
      setNfts([]);
      loadNFTs();
    } else {
      await authenticate();
    }
  }, [isInitialized, isAuthenticated]);

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
            rentingPrice: result[4],
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

  const getTokens = async (tokenId) => {
    const options = {
      contractAddress: pranaAddress,
      functionName: "viewTokenDetails",
      abi: Prana.abi.filter((fn) => fn.name === "viewTokenDetails"),
      params: { _tokenId: tokenId },
    };
    try {
      const viewRentTokenDetails = await getViewRentingTokenDetails(tokenId);
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
              copyNumber: Number(viewTokenDetailsRespose[2]),
              isUpForResale: viewTokenDetailsRespose[4],
              isUpForRenting: viewRentTokenDetails.isUpForRenting,
            };
            setNfts((prevNft) => [...prevNft, item]);
            setLoadingState("loaded");
          }
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  async function loadNFTs() {
    const nftTokens = await Moralis.Web3API.account.getNFTsForContract({
      chain: chainId,
      address: account,
      token_address: pranaAddress,
    });
    const tokens = nftTokens?.result;
    tokens.forEach((token) => {
      getTokens(token.token_id);
    });
  }
  if (loadingState !== "loaded") return <Loader />;
  if (loadingState !== "loaded" && !nfts.length)
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
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt="green iguana"
                sx={{
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">{book.name}</Typography>
                  <Chip
                    variant="outlined"
                    color="info"
                    label={`${ordinal_suffix_of(book.copyNumber)} Copy`}
                  />
                </Grid>

                <Typography variant="caption">by {book.author}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {book.description.substring(0, 50) + " ..."}
                </Typography>
              </CardContent>

              <CardActions>
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
                {!book.isUpForResale && (
                  <ResellMyBook tokenId={book.tokenId} bookName={book.name} />
                )}
                {!book.isUpForResale && (
                  <RentMyBook tokenId={book.tokenId} bookName={book.name} />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}