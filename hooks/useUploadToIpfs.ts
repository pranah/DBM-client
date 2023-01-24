import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const auth =
  "Basic " +
  Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID +
      ":" +
      process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET
  ).toString("base64");

export const useUploadToIpfs = () => {
  const client = create({
    host: process.env.NEXT_PUBLIC_INFURA_IPFS_ENDPOINT,
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return {
    // should return cid
    client,
  };
};
