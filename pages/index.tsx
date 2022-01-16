import type { NextPage } from "next";
import Container from "@mui/material/Container";
import {
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
let rpcEndpoint = null;
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { pranaAddress, pranaHelperAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}
const Home: NextPage = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const pranaContract = new ethers.Contract(
      pranaAddress,
      Prana.abi,
      provider
    );

    const data = await pranaContract.filters.BookPublished();
    // console.log(data, "---------------");
    // const nullAddress = "0x0000000000000000000000000000000000000000";
    // let filter = await pranaContract.filters.BookPublished(
    //   null,
    //   nullAddress,
    //   null
    // );
    const eventLog = await pranaContract.queryFilter(data);
    const bookData = eventLog.map((log: any) => log.args);
    console.log(bookData);
    const items = await Promise.all(
      bookData.map(async (i) => {
        const meta = await axios.get(i.bookCoverAndDetails);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
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
  // async function buyNft(book) {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(pranaAddress, Prana.abi, signer);

  //   const price = ethers.utils.parseUnits(book.price.toString(), "ether");
  //   const transaction = await contract.createMarketSale(
  //     pranaAddress,
  //     nft.itemId,
  //     {
  //       value: price,
  //     }
  //   );
  //   await transaction.wait();
  //   loadNFTs();
  // }
  async function buyNft(book) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(pranaAddress, Prana.abi, signer);
    console.log(book);
    const price = ethers.utils.parseUnits(book.price, "ether");
    console.log(price);
    let isbn = book.isbn;
    //contract call to mint a new token

    const transaction = await contract.directPurchase(isbn, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState !== "loaded" && !nfts.length)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
        <Typography justifyContent={"center"} variant="h4" sx={{ mb: 5 }}>
          No items in marketplace
        </Typography>
      </Box>
    );

  return (
    <Container maxWidth="100%">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Books
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12 }}
      >
        {nfts.map((book, index) => (
          <Grid item xs={2} sm={3} md={2} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h6">{book.name}</Typography>
                <Typography variant="caption">by {book.author}</Typography>
                <Typography variant="h5">{book.price} ETH</Typography>

                <Typography variant="body2" color="text.secondary">
                  {book.description.substring(0, 100) + " ..."}
                </Typography>
              </CardContent>

              <CardActionArea>
                <Button size="large" onClick={() => buyNft(book)}>
                  Buy
                </Button>
              </CardActionArea>
            </Card>{" "}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
