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

import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

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
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          file: meta.data.file,
          name: meta.data.name,
          description: meta.data.description,
          author: meta.data.author,
          isbn: meta.data.isbn,
          publisher: meta.data.publisher,
          royality: meta.data.royality,
          genre: meta.data.genre,
        };
        return item;
      })
    );
    setNfts(items);
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
                <Link href={`/${book.tokenId}`}>
                  <Button size="large">View</Button>
                </Link>
                <Link href={`/read/${book.tokenId}?url=${book.file}`}>
                  <Button size="large">Read</Button>
                </Link>
              </CardActionArea>
            </Card>{" "}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
