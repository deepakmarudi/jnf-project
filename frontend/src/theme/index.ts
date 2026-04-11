"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7a0b14",
      light: "#a3222d",
      dark: "#56060d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c5922f",
      light: "#dbb05a",
      dark: "#8b6318",
      contrastText: "#2d1707",
    },
    background: {
      default: "#f7f2ec",
      paper: "#ffffff",
    },
    text: {
      primary: "#2f1d17",
      secondary: "#68554b",
    },
    success: {
      main: "#1f7a4d",
    },
    warning: {
      main: "#b26a00",
    },
    error: {
      main: "#b42318",
    },
    info: {
      main: "#0b6bcb",
    },
    divider: "#e6d8cb",
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      "Manrope",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "3.2rem",
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 800,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: "1.375rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          minHeight: 44,
          paddingInline: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e6d8cb",
          boxShadow: "0 18px 40px rgba(80, 37, 18, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: 14,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e6d8cb",
        },
      },
    },
  },
});

export default theme;
