import { Grid, IconButton, TextField } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export const SearchWithUpload = () => (
  <Grid sx={{ width: "100%" }} container alignItems="center">
    <TextField
      label="Search"
      id="search"
      type="search"
      size="small"
      sx={{
        mr: 2,
      }}
    />
    <IconButton
      sx={{ color: "black" }}
      size="large"
      aria-label="upload"
      color="inherit"
    >
      <FileUploadOutlinedIcon />
    </IconButton>
  </Grid>
);
