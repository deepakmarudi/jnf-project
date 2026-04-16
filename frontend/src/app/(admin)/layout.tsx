"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const ADMIN_SESSION_KEY = "admin-authenticated";

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const hasAdminSession = window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";

    if (!hasAdminSession) {
      router.replace("/admin/login");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Box>{children}</Box>;
}
