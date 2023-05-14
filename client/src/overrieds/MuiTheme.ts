import { createTheme } from "@mui/material/styles";

export const primary = "#D9D9D9";
export const secondary = "#BE9E45";
export const background = "#1A1A1A";

const success = "#50dc63";
const error = "#EB8282";
const warning = "#f1c73f";

const theme = createTheme({
  palette: {
    tonalOffset: 0.4,
    background: {
      default: background,
      paper: primary,
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
    action: {
      active: primary,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "2px",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: ({ theme }) => ({
          margin: theme.spacing(1.5),
          border: 0,
          "&.Mui-disabled": {
            border: 0,
          },
          "&:not(:first-of-type)": {
            borderRadius: theme.shape.borderRadius,
          },
          "&:first-of-type": {
            borderRadius: theme.shape.borderRadius,
          },
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
            ":hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          },
          ":hover": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
          },
        }),
      },
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    },
  },
});

export default theme;
