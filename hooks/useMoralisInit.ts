declare var window: any;

import router from "next/router";
import { useCallback, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { chain } from "../config";

export default function useMoralisInit() {
  const {
    Moralis,
    isAuthenticated,
    authenticate,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isInitialized,
    chainId,
    account,
    enableWeb3,
    user,
  } = useMoralis();
  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading)
      try {
        enableWeb3();
      } catch (e) {
        console.log(e);
      }
    if (isWeb3Enabled && isAuthenticated && !user?.get("initialized")) {
      if (router.pathname !== "/signUp")
        router.push(`/signUp?redirects=${router.pathname}`);
      // do stuff with the user
    }
    addToNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled,user]);
  const toHex = (num: number) => {
    return "0x" + num.toString(16);
  };
  const addToNetwork = () => {
    if (isWeb3Enabled && chainId && chainId !== toHex(chain.chainId)) {
      const params = {
        chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
        chainName: chain.name,
        nativeCurrency: {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol, // 2-6 characters long
          decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: chain.rpc,
        blockExplorerUrls: [
          chain.explorers &&
          chain.explorers.length > 0 &&
          chain.explorers[0].url
            ? chain.explorers[0].url
            : chain.infoURL,
        ],
      };

      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [params],
        })
        .then(() => {
          authenticate();
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const authenticateUser = useCallback(() => {
    // console.log(
    //   "authenticateUser",
    //   chainId,
    //   isAuthenticated,
    //   isWeb3Enabled,
    //   isInitialized,
    //   isWeb3EnableLoading,
    //   !window.ethereum
    // );

    if (
      !isAuthenticated &&
      isWeb3Enabled &&
      chainId &&
      chainId === toHex(chain.chainId)
    ) {
      authenticate();
    } else if (!window.ethereum) {
      router.push("/login");
    }
  }, [authenticate, chainId, isAuthenticated, isWeb3Enabled]);

  return {
    Moralis,
    isAuthenticated,
    authenticate: authenticateUser,
    isInitialized,
    chainId,
    account,
    isWeb3Enabled,
    user,
  };
}
