"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
