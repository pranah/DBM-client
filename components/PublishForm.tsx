import MuiTextFeild from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FormHelperText from "@mui/material/FormHelperText";

import styled from "@emotion/styled";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import React from "react";
import { Formik, Form, Field } from "formik";
import { Autocomplete, TextField } from "formik-mui";
import * as Yup from "yup";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { FileList } from "./FileList";

import styles from "./PublishForm.module.css";

const inputFeilds = [
  { name: "name", label: "Name of the book", type: "text" },
  { name: "author", label: "Author Name", type: "text" },
  { name: "publisher", label: "Publisher Name", type: "text" },
  { name: "isbn", label: "ISBN or Prana Identifier Number", type: "number" },
  { name: "price", label: "Price of the book in Eth", type: "number" },
  {
    name: "royalty",
    label: "Royalty for the Author/Publisher",
    type: "number",
  },
];

const initialValues = {
  name: "",
  author: "",
  publisher: "",
  isbn: "",
  price: "",
  royalty: "",
  genre: null,
  language: null,
  content: null,
  metaData: null,
  description: "",
  // metaData: [],
};

const languages = ["English", "Malayalam"];

const genres = [
  "Action",
  "Anthology",
  "Autobiography",
  "Chick lit",
  "Classic",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Philosophy",
  "Poetry",
  "Thriller",
  "Travel",
];

const Input = styled("input")({
  display: "none",
});

export const Publish = ({ handleSubmit }) => {
  return (
    <Grid sx={{ padding: "1rem" }} container justifyContent="center">
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant="h2" component="h2">
          Publish
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container>
          <Formik
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              author: Yup.string().required("Required"),
              description: Yup.string().required("Please add a description"),
              publisher: Yup.string().required("Required"),
              isbn: Yup.number().required("Required"),
              price: Yup.number().required("Required"),
              royalty: Yup.number().required("Required"),
              genre: Yup.string()
                .nullable()
                .required("Please select the genre"),
              language: Yup.string()
                .nullable()
                .required("Please select the language"),
              content: Yup.mixed().required("A file is required"),
              metaData: Yup.mixed()
                .nullable()
                .required("Required")
                .test(
                  "check-meta-files-exists",
                  "Please upload files",
                  (value) => {
                    return value && value.length !== 0;
                  }
                ),
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
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form>
                <Grid item xs={12} sm={12} md={12}>
                  {inputFeilds.map((feild) => (
                    <Field
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

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    component={Autocomplete}
                    options={genres}
                    size="small"
                    fullWidth
                    sx={{
                      marginBottom: "1rem",
                    }}
                    id="genre"
                    name="genre"
                    renderInput={(params) => (
                      <MuiTextFeild
                        helperText={touched.genre && errors.genre}
                        error={touched.genre && errors.genre}
                        size="small"
                        {...params}
                        label="Genre"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    component={Autocomplete}
                    options={languages}
                    fullWidth
                    sx={{
                      marginBottom: "1rem",
                    }}
                    size="small"
                    id="language"
                    name="language"
                    renderInput={(params) => (
                      <MuiTextFeild
                        helperText={touched.language && errors.language}
                        error={touched.language && errors.language}
                        size="small"
                        {...params}
                        label="Language"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <label htmlFor="content">
                    Upload Ebook
                    {/* <Field name='content' component={Input} accept=".epub" id="content" type="file" /> */}
                    {/* <Field label={} id="content" sx={{ display: 'none' }} component={SimpleFileUpload} name="content" />; */}
                    <Input
                      accept=".epub, "
                      name="content"
                      type="file"
                      id="content"
                      onChange={(event) => {
                        setFieldValue("content", event.currentTarget.files[0]);
                      }}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload ebup"
                      component="span"
                    >
                      <FileUploadOutlinedIcon />
                    </IconButton>
                    {/* <Input /> */}
                    {values.content && values.content.name}
                    {
                      <FormHelperText error>
                        {errors.content || " "}{" "}
                      </FormHelperText>
                    }
                  </label>
                  {/* <Field component={SimpleFileUpload} name="file" label="Simple File Upload" />; */}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{
                    borderBottom: "1px solid lightgray",
                    marginBottom: "0.75rem",
                    marginTop: "0.75rem",
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span>Add files</span>
                    <label htmlFor="icon-button-meta-file">
                      <Input
                        accept="image/png, image/gif, image/jpeg"
                        name="metaData"
                        // multiple
                        id="icon-button-meta-file"
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "metaData",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      {/* <IconButton component="span" {disabled={formValue.metaData.length >= 3}}> */}
                      <IconButton component="span">
                        <AddCircleOutlineRoundedIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  {/* {Array.from(values.metaData).map((file, index) => (
                    <FileList key={index} fileName={file.name} />
                  ))} */}
                  {values.metaData && (
                    <FileList fileName={values.metaData.name} />
                  )}

                  {touched.metaData && (
                    <FormHelperText error>
                      {errors.metaData || " "}{" "}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <label htmlFor="description">Description</label>
                  <Field
                    className={styles.description}
                    sx={{
                      marginBottom: "1rem",
                    }}
                    // component={TextField}
                    as="textarea"
                    aria-label="Description"
                    rows={4}
                    placeholder="Description"
                    name="description"
                    id="description"
                  />

                  {
                    <FormHelperText error>
                      {errors.description || " "}{" "}
                    </FormHelperText>
                  }
                </Grid>

                <Button type="submit" variant="contained" fullWidth>
                  Publish
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};
