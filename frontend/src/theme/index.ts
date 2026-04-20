"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#163a6b",
      light: "#2a5a9b",
      dark: "#0f2747",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f766e",
      light: "#2a9d93",
      dark: "#0a534d",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#10233d",
      secondary: "#52637a",
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
    divider: "#d8e0ea",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
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
          borderRadius: 14,
          minHeight: 46,
          paddingInline: 24,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "0.01em",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 6px 20px rgba(22, 58, 107, 0.12)",
          },
          "&:active": {
            transform: "translateY(1px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(216, 224, 234, 0.6)",
          boxShadow: "0 12px 40px rgba(16, 35, 61, 0.04)",
          transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 16px 50px rgba(16, 35, 61, 0.08)",
            borderColor: "rgba(216, 224, 234, 0.9)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "medium",
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: 12,
          transition: "all 0.2s ease-in-out",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a6b9cc",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(22, 58, 107, 0.1)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
        },
        notchedOutline: {
          borderColor: "#d8e0ea",
          transition: "border-color 0.2s ease-in-out",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(216, 224, 234, 0.6)",
          color: "#10233d",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
