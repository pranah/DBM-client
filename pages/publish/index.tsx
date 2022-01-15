import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../../config";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";
const Publish: NextPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      if (e.target.name == "thumbnail") {
        setImageUrl(url);
      } else {
        setFileUrl(url);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createSale(url, bookPrice) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(bookPrice, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      author: "",
      isbn: "",
      publisher: "",
      price: "",
      royality: "",
      genre: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    const {
      name,
      description,
      author,
      isbn,
      publisher,
      royality,
      genre,
      price,
    } = values;
    if (
      !name ||
      !author ||
      !isbn ||
      !publisher ||
      !royality ||
      !genre ||
      !price ||
      !fileUrl ||
      !imageUrl
    ) {
      console.log({
        name,
        description,
        author,
        isbn,
        publisher,
        royality,
        genre,
        image: imageUrl,
        file: fileUrl,
      });
      return;
    } /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      author,
      isbn,
      publisher,
      royality,
      genre,
      price,
      image: imageUrl,
      file: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, price);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  return (
    <Container sx={{ pt: 2 }}>
      <h1>Create New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="name" />
            )}
          />
          <br />
          <Typography>Upload file</Typography>
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
          />
          <br />
          {fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )}
          <Typography>Upload thumbnail</Typography>
          <input
            type="file"
            name="thumbnail"
            className="my-4"
            onChange={onChange}
          />
          <br />
          {imageUrl && (
            <img className="rounded mt-4" width="350" src={imageUrl} />
          )}
          <Controller
            control={control}
            name="author"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="author" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="isbn"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="isbn" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="publisher"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="publisher" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="price" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="royality"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="royality" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="genre"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="genre" />
            )}
          />
          <br />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="description" />
            )}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Publish;
