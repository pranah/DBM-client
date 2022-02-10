import type { NextPage } from "next";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

let rpcEndpoint = null;
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";

import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Loader from "../components/loader/Loader";
import { BookCard } from "../components/BookCard";
import useMoralisInit from "../hooks/useMoralisInit";
import Layout from "../components/layout";

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}
const Home: NextPage = () => {
  const { Moralis, isAuthenticated, authenticate, isInitialized } =
    useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const authMeta = () => {
    if (!isAuthenticated) {
      console.log("index------authenticate");

      authenticate();
    }
  };

  useEffect(() => {
    if (isInitialized) loadNFTs();
  }, [isInitialized]);

  async function loadNFTs() {
    const query = new Moralis.Query("BookPublished");
    const books = await query.find();
    const booksResponse = books.map((book) => book.attributes);

    const items = await Promise.all(
      booksResponse.map(async (i) => {
        const meta = await axios.get(i.bookCoverAndDetails);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          displayPrice: price,
          image: meta.data.image,
          file: meta.data.file,
          name: meta.data.name,
          description: meta.data.description,
          author: meta.data.author,
          isbn: meta.data.isbn,
          publisher: meta.data.publisher,
          royalty: meta.data.royalty,
          genre: meta.data.genre,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(book) {
    setLoadingState("not-loaded");

    await authMeta();
    let options = {
      contractAddress: pranaAddress,
      functionName: "directPurchase",
      abi: Prana.abi.filter((fn) => fn.name === "directPurchase"),
      params: {
        _isbn: book.isbn,
      },
      msgValue: Moralis.Units.ETH(book.price),
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
        },
        onSuccess: () => {
          setLoadingState("loaded");

          console.log("Success");
        },
      });
    } catch (error) {
      console.log(error);
    }
    loadNFTs();
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

export default Home;
