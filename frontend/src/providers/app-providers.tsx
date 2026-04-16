"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

import AuthProvider from "./auth-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
