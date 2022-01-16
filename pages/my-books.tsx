import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import {
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Container,
  Link,
  Box,
  Button,
} from "@mui/material";
import { pranaAddress, pranaHelperAddress } from "../config";

// import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import Prana from "../artifacts/contracts/prana.sol/prana.json";

export default function MyBooks() {
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
    let tokenCount = await pranaContract.balanceOf(signer.getAddress());
    console.log(tokenCount, "tokenCount");
    let data = [];
    for (let i = 0; i < tokenCount; i++) {
      //contract call to get the tokenId at index i
      let tokenId = await pranaContract.tokenOfOwnerByIndex(
        signer.getAddress(),
        i
      );
      const book = await pranaContract.viewTokenDetails(tokenId);
      data.push(book);
    }
    console.log(data);
    const items = await Promise.all(
      data.map(async (i) => {
        const meta = await axios.get(i[1]);
        console.log(meta);
        let price = ethers.utils.formatUnits(i[2].toString(), "ether");
        let item = {
          price,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          author: meta.data.author,
          isbn: meta.data.isbn,
          publisher: meta.data.publisher,
          royality: meta.data.royality,
          genre: meta.data.genre,
          file: meta.data.file,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
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
    <Container maxWidth="100%">
      <Typography variant="h4" sx={{ mb: 5 }}>
        My Books
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {nfts.map((book, index) => (
          <Grid item xs={1} sm={2} md={2} key={index}>
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

                <Typography variant="body2" color="text.secondary">
                  {book.description.substring(0, 100) + " ..."}
                </Typography>
              </CardContent>

              <CardActionArea>
                <Link href={`/read/${book.tokenId}?url=${book.file}`}>
                  <Button size="large">Read</Button>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
