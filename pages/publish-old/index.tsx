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
import useMoralisInit from "../../hooks/useMoralisInit";
import Layout from "../../components/layout";
import { useUploadToIpfs } from "../../hooks/useUploadToIpfs";
import { IPFS_URL } from "../../utils/constants";

const Publish: NextPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { saveFile, isUploading } = useMoralisFile();
  const { Moralis, isAuthenticated, authenticate } = useMoralisInit();
  const contractProcessor = useWeb3ExecuteFunction();
  const { client } = useUploadToIpfs();

  const authMeta = async () => {
    if (!isAuthenticated) {
      console.log("publish------authenticate");
      await authenticate();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await authMeta();
    };
    fetchData();
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
      const uploadedFile = await client.add(file);
      if (uploadedFile?.path) {
        return `${IPFS_URL}${uploadedFile?.path}`;
      } else {
        throw new Error("File Upload Failed");
      }
    } catch (error) {
      console.log("Error while uploading", error);
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
      // const metaDataIpfsIResp = await saveFile(
      //   "data.json",
      //   {
      //     base64: window.btoa(unescape(encodeURIComponent(metaDataJsonString))),
      //   },
      //   { saveIPFS: true }
      // );
      // const url = metaDataIpfsIResp._ipfs;
      const blob = new Blob([metaDataJsonString], { type: "text/json" });

      const data = new FormData();
      data.append("file", blob);
      const url = await uploadToIpfs(data);

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, metaDataForIpfs);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  return (
    <Layout>
      <Container sx={{ pt: 2 }}>
        {isUploading && <Loader />}
        <PublishForm handleSubmit={handleSubmit} />
      </Container>
    </Layout>
  );
};

export default Publish;
