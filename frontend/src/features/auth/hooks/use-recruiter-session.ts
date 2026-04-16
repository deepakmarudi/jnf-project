"use client";

import { useSession } from "next-auth/react";
import type { RecruiterSession } from "../types";

export default function useRecruiterSession() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  let recruiterSession: RecruiterSession | null = null;

  if (session?.user && session.user.role === "recruiter") {
    recruiterSession = {
      recruiter_id: Number(session.user.id),
      recruiter_name: session.user.name || "",
      recruiter_email: session.user.email || "",
      company_id: null, // Will need to fetch company info dynamically if required on layout
      company_name: null,
      company_profile_completed: false,
      is_logged_in: true,
    };
  }

  return {
    session: recruiterSession,
    isLoading,
  };
}
