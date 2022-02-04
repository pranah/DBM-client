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

import { ResellMyBook } from "../components/ResellMyBook";

import { pranaAddress } from "../config";

import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { BookDetailsContext } from "../context/providers/book-details.provider";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function MyBooks() {
  const { Moralis, isInitialized, chainId, account } = useMoralis();

  const contractProcessor = useWeb3ExecuteFunction();

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const { updateBookDetails } = useContext(BookDetailsContext);
  useEffect(() => {
    if (isInitialized) {
      setNfts([]);
      loadNFTs();
    }
  }, [isInitialized]);

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
            };
            setNfts((prevNft) => [...prevNft, item]);
          }
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  console.log("account", account);
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
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h6">{book.name}</Typography>
                <Typography variant="caption">by {book.author}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {book.description.substring(0, 50) + " ..."}
                </Typography>
              </CardContent>

              <CardActions>
                <Link
                  href={`/reader/${book.isbn}?url=${book.file}&tokenId=${book.tokenId}`}
                >
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
                <ResellMyBook tokenId={book.tokenId} bookName={book.name} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
