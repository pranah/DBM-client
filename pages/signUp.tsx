declare var window: any;

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";

import { NextPage } from "next";
import useMoralisInit from "../hooks/useMoralisInit";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
const inputFields = [
  { name: "username", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "email" },
];
const SignUp: NextPage = () => {
  // const { isAuthenticated, isWeb3Enabled, authenticate, user } =
  //   useMoralisInit();
  let router = useRouter();
  const { redirects } = router.query;

  const { authenticate, enableWeb3, user } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // useEffect(() => {
  //   if (isWeb3Enabled && isAuthenticated && user.get("initialized")) {
  //     router.replace(`${redirects}`);
  //     // do stuff with the user
  //   } else {
  //     authenticate();
  //   }
  //   if (user) {
  //     console.log("user.get", user.get("initialized"));
  //   }
  // }, [user, isWeb3Enabled, isAuthenticated]);
  const initialValues = {
    username: "",
    email: "",
  };

  const handleAuth = async (values) => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider: "metamask" });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error(
          "Connecting to chain failed, as no connected account was found"
        );
      }
      if (!chainId) {
        throw new Error(
          "Connecting to chain failed, as no connected chain was found"
        );
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run("requestMessage", {
        address: account,
        chain: parseInt(chainId, 16),
        network: "evm",
      });

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
      router.replace(`${redirects}`);
      // user.setUsername(values.username);
      // user.setEmail(values.email);
      // user.set("initialized", true);
      // user.save();
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     user.setUsername(values.username);
  //     user.setEmail(values.email);
  //     user.set("initialized", true);
  //     user.save();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   router.replace(`${redirects}`);

  //   user.get("initialized");
  //   console.log(user.get("initialized"));
  // };
  return (
    <Container
      sx={{
        justifyContent: "center",
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
        <Typography color={"primary.main"} variant="h4" p={"5"} component="h2">
          Enter this field to finish Signup{" "}
        </Typography>
        <br />

        <Formik
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            email: Yup.string().required("Required"),

            // .test(
            //   "check-meta-files",
            //   "Please upload not more than 1 files",
            //   (value) => {
            //     return value && value.length < 2;
            //   }
            // ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleAuth(values);
          }}
        >
          {({ errors, touched, setFieldValue, isSubmitting, values }) => (
            <Form>
              <Grid item xs={12} sm={12} md={12}>
                {inputFields.map((feild) => (
                  <Field
                    key={feild.name}
                    sx={{
                      marginBottom: "1rem",
                    }}
                    component={TextField}
                    size="small"
                    fullWidth
                    {...feild}
                    variant="outlined"
                  />
                ))}
              </Grid>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
