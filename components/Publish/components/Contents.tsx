import { Grid } from "@mui/material";
import { InputLabel, TextField, FileUpload } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";

export const ContentsForm = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <FileUpload labelName="Upload Ebook file" />
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <FileUpload labelName="Upload Cover Images" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                size="small"
                placeholder="Write description here.."
                id="description"
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="reviews">Reviews</InputLabel>
              <TextField
                multiline
                fullWidth
                variant="outlined"
                placeholder="Write description here.."
                size="small"
                id="reviews"
                rows={8}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const Contents = ({ tabIndex, setTab }) => {
  return (
    <PublishFormWrapper tab={tabIndex} setTab={setTab}>
      <ContentsForm />
    </PublishFormWrapper>
  );
};
