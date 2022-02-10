import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#4f65a9",
    },
    secondary: {
      main: "#F2D8C2",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
