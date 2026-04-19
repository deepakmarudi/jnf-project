"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import type { AdminSession } from "../types";

export default function useAdminSession() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const adminSession = useMemo<AdminSession | null>(() => {
    if (session?.user && session.user.role === "admin") {
      return {
        admin_id: Number(session.user.id),
        admin_name: session.user.name || "",
        admin_email: session.user.email || "",
        is_logged_in: true,
      };
    }
    return null;
  }, [session?.user]);

  return {
    session: adminSession,
    isLoading,
  };
}
