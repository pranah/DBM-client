import { useEffect, useState, useContext, useCallback } from "react";
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
import { ordinal_suffix_of } from "../utils";
import { pranaAddress, pranaHelperAddress } from "../config";

import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function RentedBooks() {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isInitialized,
    chainId,
    account,
  } = useMoralis();

  const contractProcessor = useWeb3ExecuteFunction();

  const [booksForRent, setBooksForRent] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const authMeta = useCallback(async () => {
    if (!isAuthenticated) {
      await authenticate();
    }
  }, [authenticate]);

  useEffect(async () => {
    if (isAuthenticated && isInitialized) {
      getBooksForRent();
    } else {
      await authenticate();
    }
  }, [isInitialized, isAuthenticated]);

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
          console.log("success", result);
          for (let index = 0; index < Number(result); index++) {
            try {
              const tokenIdForSale = await getTokenForRentingAtIndex(index);
              const tokenDetailsForTokenId = await getViewRentingTokenDetails(
                tokenIdForSale
              );
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
                setLoadingState(false);
              }
            } catch (error) {
              throw error;
            }
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onRentButtonClick = async (book) => {
    console.log("book", book);
    await authMeta();

    let options = {
      contractAddress: pranaAddress,
      functionName: "rentToken",
      abi: Prana.abi.filter((fn) => fn.name === "rentToken"),
      params: {
        tokenId: book.tokenId,
      },
      msgValue: book.rentingPrice,
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
        },
        onSuccess: () => {
          getBooksForRent();
          console.log("Success");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingState && !booksForRent.length)
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
        Books for rent
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {booksForRent.map((book, index) => (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3} key={index}>
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
                <Typography variant="subtitle1">
                  Price: {Moralis.Units.FromWei(book.rentingPrice, 18)} ETH
                </Typography>
                <Typography variant="subtitle2">
                  Rent Time in Minutes: {book.numberOfBlocksToRent / 60}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  onClick={() => onRentButtonClick(book)}
                  color="primary"
                  variant="contained"
                  size="large"
                >
                  Rent
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
