import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { pranaAddress } from "../config";

import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Loader from "../components/loader/Loader";
import { BookCard } from "../components/BookCard";

export default function RentedBooks() {
  const { isAuthenticated, authenticate, isInitialized, account } =
    useMoralis();

  const contractProcessor = useWeb3ExecuteFunction();

  const [booksForRent, setBooksForRent] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

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
            rentingPrice: result[4],
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

  const onRentButtonClick = async (book) => {
    setLoadingState("not-loaded");

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
    } finally {
      setLoadingState("loaded");
    }
  };
  if (loadingState !== "loaded") return <Loader />;

  if (loadingState === "loaded" && !booksForRent.length)
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
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={index}>
            <BookCard
              book={book}
              actionButtons={() => (
                <Button
                  onClick={() => onRentButtonClick(book)}
                  color="primary"
                  variant="contained"
                  size="large"
                >
                  Rent
                </Button>
              )}
              isPriceInWei
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
