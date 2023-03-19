import { createTheme } from "@mui/material/styles";

const primary = "#56779E";
const secondary = "#d0ac5c";
const backgroundPaper = "#ffffff";

// const primary = '#1f1e1e'
// const secondary = '#d92335'
// const backgroundPaper = '#c4c6b5'

// const primary = "#383234";
// const secondary = "#47b39b";
// const backgroundPaper = "#e6dfd6";

const success = "#60A08E";
const error = "#EB8282";
const warning = "#f1c73f";

const theme = createTheme({
  palette: {
    background: {
      paper: backgroundPaper,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    success: {
      main: success,
    },
    error: {
      main: error,
    },
    warning: {
      main: warning,
    },
  },
});

export default theme;
