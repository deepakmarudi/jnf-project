"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import LoadingState from "@/components/ui/loading-state";
import useAdminSession from "@/features/auth/hooks/use-admin-session";
import { routes } from "@/lib/routes";
import AdminShell from "@/components/layout/admin-shell";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { session, isLoading } = useAdminSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session?.is_logged_in) {
      router.replace(routes.public.adminLogin);
      return;
    }
  }, [isLoading, router, session]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingState message="Checking admin access..." />
      </Box>
    );
  }

  if (!session?.is_logged_in) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingState message="Redirecting to admin login..." />
      </Box>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
