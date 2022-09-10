import { Autocomplete, Button, Grid } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { InputLabel, TextField } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";

const schema = yup
  .object()
  .shape({
    bookTitle: yup.string().required("Please enter a value"),
    subTitle: yup.string().required("Please enter a value"),
    genre: yup.string().required("Please enter a value"),
    language: yup.string().required("Please enter a value"),
    price: yup
      .number()
      .typeError("Please enter a value")
      .positive("Please enter a positve value")
      .required("Please enter a value"),
    royalty: yup
      .number()
      .typeError("Please enter a value")
      .positive("Please enter a positve value")
      .required("Please enter a value"),
    isbn: yup
      .number()
      .typeError("Please enter a value")
      .positive("Please enter a positve value")
      .required("Please enter a value"),
    numberOfPages: yup
      .number()
      .typeError("Please enter a value")
      .positive("Please enter a positve value")
      .required("Please enter a value"),
    editionNumber: yup
      .number()
      .typeError("Please enter a value")
      .positive("Please enter a positve value")
      .required("Please enter a value"),
    region: yup.string().required("Please enter a value"),
  })
  .required();

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

export const General = ({ setTab }) => {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bookTitle: "",
      subTitle: "",
      genre: "",
      language: "",
      price: "",
      royalty: "",
      isbn: "",
      numberOfPages: "",
      editionNumber: "",
      region: "",
    },
  });

  const onSubmit = () => {
    setTab((prevState) => {
      return prevState < 2 ? prevState + 1 : prevState;
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={8}>
              <InputLabel htmlFor="book-title">Book Title</InputLabel>
              <TextField
                {...register("bookTitle")}
                error={!!errors.bookTitle}
                helperText={errors.bookTitle ? errors.bookTitle.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter Book Title"
                type="text"
                id="book-title"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="sub-title">Sub Title (Optional)</InputLabel>
              <TextField
                {...register("subTitle")}
                error={!!errors.subTitle}
                helperText={errors.subTitle ? errors.subTitle.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter Sub Title"
                type="text"
                id="sub-title"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="genre">Genre</InputLabel>

              <Controller
                control={control}
                name="genre"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="genre"
                    options={genres}
                    onChange={(e, item) => {
                      onChange(item);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Genre"
                        error={!!errors.genre}
                        helperText={errors.genre ? errors.genre.message : ""}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={8}>
              <InputLabel htmlFor="language">Language</InputLabel>
              <TextField
                {...register("language")}
                error={!!errors.language}
                helperText={errors.language ? errors.language.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter Language"
                type="text"
                id="language"
              />
            </Grid>

            <Grid item xs={8}>
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
                {...register("price", { valueAsNumber: true })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter Price"
                type="number"
                inputProps={{ min: 0 }}
                id="price"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="royalty">Royalty</InputLabel>
              <TextField
                {...register("royalty", { valueAsNumber: true })}
                error={!!errors.royalty}
                helperText={errors.royalty ? errors.royalty.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter Royalty"
                type="number"
                inputProps={{ min: 0 }}
                id="royalty"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="isbn">ISBN</InputLabel>
              <TextField
                {...register("isbn", { valueAsNumber: true })}
                error={!!errors.isbn}
                helperText={errors.isbn ? errors.isbn.message : ""}
                variant="outlined"
                size="small"
                placeholder="Enter ISBN Number"
                type="number"
                inputProps={{ min: 0 }}
                id="isbn"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="number-of-pages">Number of Pages</InputLabel>
              <TextField
                {...register("numberOfPages", { valueAsNumber: true })}
                error={!!errors.numberOfPages}
                helperText={
                  errors.numberOfPages ? errors.numberOfPages.message : ""
                }
                variant="outlined"
                size="small"
                placeholder="Enter Number of Pages"
                type="number"
                inputProps={{ min: 0 }}
                id="number-of-pages"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="edition-number">Edition Number</InputLabel>
              <TextField
                {...register("editionNumber", { valueAsNumber: true })}
                error={!!errors.editionNumber}
                helperText={
                  errors.editionNumber ? errors.editionNumber.message : ""
                }
                variant="outlined"
                size="small"
                placeholder="Enter Edition Number"
                type="number"
                inputProps={{ min: 0 }}
                id="edition-number"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="region">Region</InputLabel>
              <TextField
                {...register("region")}
                error={!!errors.region}
                helperText={errors.region ? errors.region.message : ""}
                variant="outlined"
                placeholder="Enter Region"
                size="small"
                id="region"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Proceed
        </Button>
      </Grid>
    </>
  );
};

//  const General = ({ tabIndex, setTab }) => {
//   return (
//     <PublishFormWrapper tab={tabIndex} setTab={setTab}>
//       <GeneralForm />
//     </PublishFormWrapper>
//   );
// };
