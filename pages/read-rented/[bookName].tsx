import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { RentedBookReader } from "../../components/RentedBookReader";
import { pranaAddress } from "../../config";
import Prana from "../../artifacts/contracts/prana.sol/prana.json";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Alert from "@mui/material/Alert";

function ReadPage() {
  let router = useRouter();
  const { tokenId } = router.query;

  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  const consumeBookContent = useCallback(async () => {
    const web3Modal = new Web3Modal();
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const pranaContract = new ethers.Contract(
        pranaAddress,
        Prana.abi,
        signer
      );
      const url = await pranaContract.consumeContent(tokenId);
      setUrl(url);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  }, [tokenId]);

  useEffect(async () => {
    if (tokenId) {
      consumeBookContent();
    }
  }, [tokenId]);
  return (
    <>
      {url && <RentedBookReader url={url} />}
      {error && (
        <Alert sx={{ textTransform: "capitalize" }} severity="error">
          {error.data.message || "Something went wrong contact the admin"}
        </Alert>
      )}
    </>
  );
}

export default ReadPage;
