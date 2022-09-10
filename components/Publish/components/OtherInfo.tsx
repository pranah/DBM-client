import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { SpecialPerksFileUpload } from "../../FileUpload/FileUpload";
import { InputLabel, TextField } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";

const ageRanges = ["8-10 Years", "11-15 Years", "15-18 Years", "18 +"];

const OtherInfoForm = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel htmlFor="author-name">Author Name</InputLabel>
            <TextField
              placeholder="Enter First Name"
              variant="outlined"
              size="small"
              id="author-name"
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="author-name"> &nbsp; </InputLabel>

            <TextField
              placeholder="Enter Second Name"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="contributers">Contributers</InputLabel>
            <TextField
              placeholder="Add Contributers"
              variant="outlined"
              size="small"
              id="contributers"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="add-keyword">Add Keywords</InputLabel>
            <TextField
              placeholder="Keywords Eg. Politics, Etc."
              variant="outlined"
              size="small"
              id="add-keyword"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel id="age-range">Age Range</InputLabel>
            <Select
              placeholder="Select Age Range"
              variant="outlined"
              size="small"
              labelId="age-range"
              id="age-range"
              fullWidth
              sx={{ mb: 3 }}
            >
              {ageRanges.map((ageRange, index) => (
                <MenuItem key={index} value={10}>
                  {ageRange}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={8}>
            <FormControlLabel
              sx={{ mb: 3 }}
              value="start-publish"
              control={<Checkbox />}
              label="Self Publish"
              // labelPlacement="start"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <FormControlLabel
              sx={{ mb: 3 }}
              value="limited-edition"
              control={<Checkbox />}
              label="Limited Edition"
              // labelPlacement="start"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <InputLabel htmlFor="no-of-copies">No of Copies</InputLabel>
            <TextField
              placeholder="Enter No of Copies"
              variant="outlined"
              size="small"
              id="no-of-copies"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <SpecialPerksFileUpload />
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
