import { Grid } from "@mui/material";
import { InputLabel, TextField } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";

const OtherInfoForm = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel htmlFor="author-name">Author Name</InputLabel>
            <TextField variant="outlined" size="small" id="author-name" />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="author-name"> &nbsp; </InputLabel>

            <TextField variant="outlined" size="small" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="contributers">Contributers</InputLabel>
            <TextField variant="outlined" size="small" id="contributers" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="add-keyword">Add Keywords</InputLabel>
            <TextField variant="outlined" size="small" id="add-keyword" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="age-range">Age Range</InputLabel>
            <TextField variant="outlined" size="small" id="age-range" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="self-publish">Self Publish</InputLabel>
            <TextField variant="outlined" size="small" id="self-publish" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const OtherInfo = ({ tabIndex, setTab }) => {
  return (
    <PublishFormWrapper tab={tabIndex} setTab={setTab}>
      <OtherInfoForm />
    </PublishFormWrapper>
  );
};
