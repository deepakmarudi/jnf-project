"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import AuthProvider from "./auth-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </AppRouterCacheProvider>
  );
}
