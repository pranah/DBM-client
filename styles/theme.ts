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
      main: "#33CCFF",
    },
    secondary: {
      main: "#373737",
    },
    tertiary: {
      main: "#9771E9",
      text: "#fff",
    },
    homeText: {
      main: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
});
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      main: string;
      text: string;
    };
    homeText: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    tertiary?: {
      main?: string;
      text?: string;
    };
    homeText: {
      main: string;
    };
  }
}

export default theme;
