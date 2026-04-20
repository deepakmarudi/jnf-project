"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import type { RecruiterSession } from "../types";

export default function useRecruiterSession() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const recruiterSession = useMemo<RecruiterSession | null>(() => {
    if (session?.user && session.user.role === "recruiter") {
      return {
        recruiter_id: Number(session.user.id),
        recruiter_name: session.user.name || "",
        recruiter_email: session.user.email || "",
        company_id: session.user.company_id ? Number(session.user.company_id) : null,
        company_name: session.user.company_name || null,
        is_logged_in: true,
        company_profile_completed: (session.user as any).company_profile_completed ?? false,
      };
    }
    return null;
  }, [session?.user]);

  return {
    session: recruiterSession,
    isLoading,
  };
}
