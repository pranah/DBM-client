import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Layout from "../components/layout";
import { MoralisProvider } from "react-moralis";

import createEmotionCache from "../styles/createEmotionsCache";
import theme from "../styles/theme";
import BookDetailsProvider from "../context/providers/book-details.provider";
import "../styles/global.css";

// material

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_ID}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BookDetailsProvider>
            <Component {...pageProps} />
          </BookDetailsProvider>
        </ThemeProvider>
      </CacheProvider>
    </MoralisProvider>
  );
}
