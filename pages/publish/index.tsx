import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import {
  useMoralis,
  useMoralisFile,
  useWeb3ExecuteFunction,
} from "react-moralis";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { pranaAddress } from "../../config";

import Prana from "../../artifacts/contracts/prana.sol/prana.json";

const Publish: NextPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { saveFile, moralisFile } = useMoralisFile();
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const onChange = async (e) => {
    // console.log("FILE", f);
    // const fileIpfs = await saveFile(f.name, file, { saveIPFS: true });
    // console.log(fileIpfs);

    const file = e.target.files[0];
    try {
      const uploadedFile = await saveFile(file.name, file, { saveIPFS: true });
      let ipfs = "";
      if (uploadedFile?._ipfs) {
        ipfs = uploadedFile._ipfs;
      }
      if (e.target.name == "thumbnail") {
        setImageUrl(ipfs);
      } else {
        setFileUrl(ipfs);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const router = useRouter();

  // async function onChange(e) {
  //   const file = e.target.files[0];
  //   try {
  //     const added = await client.add(file, {
  //       progress: (prog) => console.log(`received: ${prog}`),
  //     });
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     if (e.target.name == "thumbnail") {
  //       setImageUrl(url);
  //     } else {
  //       setFileUrl(url);
  //     }
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }
  // async function createSale(url, bookPrice,values) {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();

  //   /* next, create the item */
  //   let contract = new ethers.Contract(nftaddress, Prana.abi, signer);
  //   let transaction = await contract.createToken(url);
  //   let tx = await transaction.wait();
  //   let event = tx.events[0];
  //   let value = event.args[2];
  //   let tokenId = value.toNumber();

  //   const price = ethers.utils.parseUnits(bookPrice, "ether");

  //   /* then list the item for sale on the marketplace */
  //   contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  //   let listingPrice = await contract.getListingPrice();
  //   listingPrice = listingPrice.toString();

  //   transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
  //     value: listingPrice,
  //   });
  //   await transaction.wait();
  //   router.push("/");
  // }

  async function createSale(url, bookPrice, data) {
    const values = JSON.parse(data);
    const price = Moralis.Units.ETH(bookPrice);
    const publishAbi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_encryptedBookDataHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_isbn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_unencryptedBookDetailsCID",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_transactionCut",
            type: "uint256",
          },
        ],
        name: "publishBook",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    let options = {
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "publishBook",
      abi: publishAbi,
      params: {
        _encryptedBookDataHash: values.file,
        _isbn: values.isbn,
        _price: price,
        _unencryptedBookDetailsCID: url,
        _transactionCut: values.royalty,
      },
    };
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    /* next, create the item */
    try {
      const test = await contractProcessor.fetch({
        params: options,
        onComplete: () => console.log("Complete"),
        onError: (err) => console.log(err),
        onSuccess: (x) => console.log(x),
      });
      console.log("error", contractProcessor.error);
      console.log("error", contractProcessor.data);
      console.log("test", test);
    } catch (error) {
      console.log("errpr", error);
    }

    // let contract = new ethers.Contract(pranaAddress, Prana.abi, signer);
    // const price = ethers.utils.parseUnits(bookPrice, "ether");

    // const transaction = await contract.publishBook(
    //   //
    //   values.file,
    //   values.isbn,
    //   price,
    //   url,
    //   values.royalty
    // );

    // await transaction.wait();

    // router.push("/");
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      author: "",
      isbn: "",
      publisher: "",
      price: "",
      royalty: "",
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
      royalty,
      genre,
      price,
    } = values;
    if (
      !name ||
      !author ||
      !isbn ||
      !publisher ||
      !royalty ||
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
        royalty,
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
      royalty,
      genre,
      price,
      image: imageUrl,
      file: fileUrl,
    });
    try {
      // const added = await client.add(data);
      const metaData = await saveFile(
        "data.json",
        { base64: window.btoa(data) },
        { saveIPFS: true }
      );
      // console.log(added);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const url = metaData._ipfs;
      console.log("url", url);
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, price, data);
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
            name="royalty"
            render={({ field }) => (
              // Material UI TextField already supports
              // `value` and `onChange`
              <TextField {...field} label="royalty" />
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
