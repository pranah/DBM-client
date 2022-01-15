import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { Typography, Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";

let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}
const Book: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [book, setBook] = useState({
    name: "",
    author: "",
    isbn: "",
    publisher: "",
    price: "",
    royality: "",
    genre: "",
    description: "",
    image: "",
  });
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadBook();
  }, []);
  async function loadBook() {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const tokenUri = await tokenContract.tokenURI(slug);
    const meta = await axios.get(tokenUri);
    let item = {
      price: meta.data.price,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      author: meta.data.author,
      isbn: meta.data.isbn,
      publisher: meta.data.publisher,
      royality: meta.data.royality,
      genre: meta.data.genre,
    };

    setBook(item);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
  }
  if (loadingState !== "loaded") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
        <Typography justifyContent={"center"} variant="h4" sx={{ mb: 5 }}>
          No items in marketplace
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        pt: 9,
      }}
      maxWidth="xl"
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={4} item>
          <Box>
            <img src={book.image} alt="book1" />
          </Box>
        </Grid>
        <Grid xs={12} md={8} item>
          <Box>
            <Typography variant="h2">{book.name}</Typography>
            <Typography variant="h6">by {book.author}</Typography>
            <br />
            <Typography variant="h1">{book.price}</Typography>
            <Typography>{book.description}</Typography>
            <br />
            <Button
              variant="contained"
              size="large"
              onClick={() => buyNft(book)}
            >
              Buy
            </Button>{" "}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Book;
