import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Web3Modal from "web3modal";
let rpcEndpoint = null;
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { pranaAddress } from "../config";
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
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const pranaContract = new ethers.Contract(pranaAddress, Prana.abi, signer);
    console.log(signer, "signer");
    let tokenCount = await pranaContract.numberofTokensForResale(
      signer.getAddress()
    );
    let books = await Promise.all(
      Array.from(Array(tokenCount).keys()).map(async (index) => {
        let tokenId = await pranaContract.tokenForResaleAtIndex(index);
        const book = await pranaContract.viewTokenDetails(tokenId);
        const meta = await axios.get(book[1]);
        let item = {
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          author: meta.data.author,
          isbn: meta.data.isbn,
          publisher: meta.data.publisher,
          royality: meta.data.royality,
          genre: meta.data.genre,
          file: meta.data.file,
          tokenId,
          resalePrice: ethers.utils.formatUnits(book[3].toString(), "ether"),
        };
        return item;
      })
    );
    setNfts(books);
    setLoadingState("loaded");
  }

  async function buyNft(book) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(pranaAddress, Prana.abi, signer);
    console.log(book);
    const price = ethers.utils.parseUnits(book.resalePrice, "ether");
    console.log(price);
    //contract call to mint a new token

    const transaction = await contract.buyTokenFromPrana(book.tokenId, {
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
                <Typography variant="subtitle1">
                  Price:{book.resalePrice}
                  ETH
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {book.description.substring(0, 50) + " ..."}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  color="primary"
                  size="large"
                  onClick={() => buyNft(book)}
                  variant="contained"
                >
                  Buy
                </Button>
              </CardActions>
            </Card>{" "}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
