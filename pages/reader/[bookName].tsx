import { Reader } from "../../components/reader";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { pranaAddress } from "../../config";
import Prana from "../../artifacts/contracts/prana.sol/prana.json";
import Alert from "@mui/material/Alert";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
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

  // const consumeBookContent = async () => {
  //   // await authMeta();
  //   console.log("account", account);
  //   if (tokenId) {
  //     const options = {
  //       contractAddress: pranaAddress,
  //       functionName: "consumeContent",
  //       abi: Prana.abi.filter((fn) => fn.name === "consumeContent"),
  //       params: { tokenId: "10" },
  //     };
  //     console.log("options", options);
  //     await contractProcessor.fetch({
  //       params: options,
  //       onError: (err) => {
  //         console.log("Error _>", err);
  //       },
  //       onSuccess: async (x) => {
  //         console.log("test", x);
  //       },
  //     });
  //   }
  // };

  useEffect(async () => {
    if (tokenId) {
      consumeBookContent();
    }
  }, [tokenId]);
  return (
    <>
      {url && <Reader url={url} />}
      {error && (
        <Alert sx={{ textTransform: "capitalize" }} severity="error">
          {error.data.message || "Something went wrong contact the admin"}
        </Alert>
      )}
    </>
  );
}

export default ReadPage;
