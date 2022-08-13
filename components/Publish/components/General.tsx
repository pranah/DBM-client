import { Autocomplete, Grid } from "@mui/material";
import { InputLabel, TextField } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";

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

const GeneralForm = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={8}>
              <InputLabel htmlFor="book-title">Book Title</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                id="book-title"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="sub-title">Sub Title (Optional)</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                id="sub-title"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="genre">Genre</InputLabel>
              {/* <TextField
                variant="outlined"
                size="small"
                type="text"
                id="genre"
              /> */}
              <Autocomplete
                id="genre"
                options={genres}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>

            <Grid item xs={8}>
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                id="price"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="royalty">Royalty</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                id="royalty"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="isbn">ISBN</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                id="isbn"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="number-of-pages">Number of Pages</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                id="number-of-pages"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="edition-number">Edition Number</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                id="edition-number"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="region">Region</InputLabel>
              <TextField variant="outlined" size="small" id="region" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const General = ({ tabIndex, setTab }) => {
  return (
    <PublishFormWrapper tab={tabIndex} setTab={setTab}>
      <GeneralForm />
    </PublishFormWrapper>
  );
};
