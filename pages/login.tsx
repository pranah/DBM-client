declare var window: any;

import { Box, Button, Container, Link, Typography } from "@mui/material";
import Image from "next/image";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useRouter } from "next/router";

import { NextPage } from "next";
import useMoralisInit from "../hooks/useMoralisInit";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { isWeb3Enabled, authenticate } = useMoralisInit();
  let router = useRouter();
  useEffect(() => {
    if (isWeb3Enabled) {
      authenticate();
      router.push("/signUp");
    }
  }, [isWeb3Enabled]);
  const handleSubmit = () => {
    if (isWeb3Enabled) {
      authenticate();
      router.push("/signUp");
    }
    // eslint-disable-next-line no-console
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        bgcolor: "secondary.main",
      }}
      component="main"
      maxWidth="sm"
    >
      <Box
        sx={{
          height: 500,
          p: "57px",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image alt="Next.js logo" src="/Pranah2.png" width={200} height={100} />{" "}
        {isWeb3Enabled ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Sign In
          </Button>
        ) : (
          <a
            target="_blank"
            href="https://metamask.io/download/"
            rel="noopener noreferrer"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Click here to install MetaMask!
            </Button>
          </a>
        )}
      </Box>
    </Container>
  );
};

export default Login;
