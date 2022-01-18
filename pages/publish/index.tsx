import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  useMoralis,
  useMoralisFile,
  useWeb3ExecuteFunction,
} from "react-moralis";

import { pranaAddress } from "../../config";

import Prana from "../../artifacts/contracts/prana.sol/prana.json";
import { Publish as PublishForm } from "../../components/PublishForm";
import Loader from "../../components/loader/Loader";

const Publish: NextPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { saveFile, isUploading } = useMoralisFile();
  const { Moralis, isAuthenticated, authenticate } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const authMeta = async () => {
    if (!isAuthenticated) {
      await authenticate({ provider: "metamask" });
    }
  };

  useEffect(async () => {
    const res = await authMeta();
  }, []);

  const router = useRouter();

  async function createSale(url, values) {
    await authMeta();
    const price = Moralis.Units.ETH(values.price);

    let options = {
      contractAddress: pranaAddress,
      functionName: "publishBook",
      abi: Prana.abi.filter((fn) => fn.name === "publishBook"),
      params: {
        _encryptedBookDataHash: values.file,
        _isbn: values.isbn,
        _price: price,
        _unencryptedBookDetailsCID: url,
        _transactionCut: values.royalty,
      },
    };

    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: () => {
          router.push("/");
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const uploadToIpfs = async (file) => {
    try {
      console.log(file);
      const uploadedFile = await saveFile(file.name, file, {
        saveIPFS: true,
      });
      if (uploadedFile?._ipfs) {
        return uploadedFile?._ipfs;
      } else {
        throw new Error("File Upload Failed");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    try {
      const epubIpfsUrl = await uploadToIpfs(values.content);

      const imageIpfsUrl = await uploadToIpfs(values.metaData);

      const metaDataForIpfs = {
        ...values,
      };
      delete metaDataForIpfs["content"];
      delete metaDataForIpfs["metaData"];
      metaDataForIpfs.file = epubIpfsUrl;
      metaDataForIpfs.image = imageIpfsUrl;
      const metaDataJsonString = JSON.stringify(metaDataForIpfs);
      const metaDataIpfsIResp = await saveFile(
        "data.json",
        { base64: window.btoa(metaDataJsonString) },
        { saveIPFS: true }
      );
      const url = metaDataIpfsIResp._ipfs;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, metaDataForIpfs);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  return (
    <Container sx={{ pt: 2 }}>
      {isUploading && <Loader />}
      <PublishForm handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Publish;
