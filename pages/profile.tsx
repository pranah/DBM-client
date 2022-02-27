import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Layout from "../components/layout";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const [editState, setEditState] = useState(false);
  const { user } = useMoralis();

  const initialValues = {
    username: user?.getUsername() || "",
    email: user?.getEmail() || "",
    age: user?.get("age") || "",
    gender: user?.get("gender") || "",
    about: user?.get("about") || "",
  };
  console.log("initialValues1", initialValues);

  const inputFields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "age", label: "age", type: "text" },
    { name: "gender", label: "gender", type: "text" },
    { name: "about", label: "about", type: "text" },
  ];

  //   useEffect(() => {
  //     console.log("initialValues", initialValues);
  //     initialValues = {
  //       username: user?.getUsername(),
  //       email: user?.getEmail(),
  //       age: user?.get("age"),
  //       gender: user?.get("gender"),
  //       about: user?.get("about"),
  //     };
  //   }, [user]);

  const handleSubmit = async (values) => {
    try {
      user.setUsername(values.username);
      user.setEmail(values.email);
      user.set("age", values.age);
      user.set("gender", values.gender);
      user.set("about", values.about);
      user.save();
    } catch (error) {
      console.log(error);
    }
    setEditState(false);
  };
  return (
    <Layout>
      {editState ? (
        <Box sx={{ margin: "auto", width: "50%", mt: 4, px: 2 }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant={"h4"}
          >
            Edit Profile
          </Typography>
          <br />
          <Formik
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={Yup.object({
              username: Yup.string().required("Required"),
              email: Yup.string().email("must be a valid email"),
              age: Yup.string(),
              gender: Yup.string(),
              about: Yup.string(),

              // .test(
              //   "check-meta-files",
              //   "Please upload not more than 1 files",
              //   (value) => {
              //     return value && value.length < 2;
              //   }
              // ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
            }}
          >
            {({
              errors,
              touched,
              setFieldValue,
              isSubmitting,
              values,
              handleChange,
            }) => (
              <Form>
                <Grid item xs={12} sm={12} md={12}>
                  {inputFields.map((field) => (
                    <TextField
                      fullWidth
                      id={field.name}
                      {...field}
                      value={values[field.name]}
                      onChange={handleChange}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                      sx={{
                        marginBottom: "1rem",
                      }}
                      size="small"
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
      ) : (
        <Box sx={{ margin: "auto", width: "50%", mt: 4, px: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {" "}
              <IconButton color="inherit" sx={{ p: 0 }}>
                <AccountCircle sx={{ fontSize: 80 }} />
              </IconButton>
              <Typography
                sx={{
                  paddingLeft: "2rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Hi {user?.getUsername()}
              </Typography>{" "}
            </Box>
            <Box>
              {" "}
              <Typography variant="h5">ABOUT</Typography>
              <Typography>
                {user?.get("about") || "Please edit this content"}{" "}
              </Typography>{" "}
            </Box>
            <Box>
              {" "}
              <Typography variant="h5">AGE</Typography>
              <Typography>
                {user?.get("age") || "Please edit this content"}{" "}
              </Typography>{" "}
            </Box>{" "}
            <Box>
              {" "}
              <Typography variant="h5">Gender</Typography>
              <Typography>
                {user?.get("gender") || "Please edit this content"}{" "}
              </Typography>{" "}
            </Box>
            <Box>
              {" "}
              <Typography variant="h5">Email</Typography>
              <Typography>
                {user?.get("email") || "Please edit this content"}{" "}
              </Typography>{" "}
            </Box>
            <Button
              onClick={() => {
                setEditState(true);
              }}
              sx={{ width: "30%" }}
              variant="contained"
            >
              Edit
            </Button>
          </Stack>
        </Box>
      )}
    </Layout>
  );
}

// -----------------------------
