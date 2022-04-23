import "@material-ui/core/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    tertiary: {
      main: string;
      text: string;
    };
    homeText: {
      main: string;
    };
    customBackground: {
      lightGray: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    tertiary?: {
      main: string;
      text: string;
    };
    homeText: {
      main: string;
    };
    customBackground: {
      lightGray: string;
    };
  }
}

{
}
