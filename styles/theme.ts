import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Playfair Display",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#7842E7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#373737",
      contrastText: "#000",
    },
    tertiary: {
      main: "#7842E7",
      text: "#fff",
    },

    homeText: {
      main: "#fff",
    },
    landingPageDarkPurple: {
      main: "#362558",
    },
    error: {
      main: red.A400,
    },

    customBackground: {
      lightGray: "#F8F8F8",
    },
  },
});

export default theme;
