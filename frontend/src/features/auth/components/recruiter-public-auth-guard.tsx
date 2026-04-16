"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/ui/loading-state";
import {
  getRecruiterSession,
  shouldRedirectRecruiterFromPublicAuth,
} from "../lib/mock-auth";

type RecruiterPublicAuthGuardProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterPublicAuthGuard({
  children,
}: RecruiterPublicAuthGuardProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const session = getRecruiterSession();
    const redirectTo = shouldRedirectRecruiterFromPublicAuth(session);

    if (redirectTo) {
      router.replace(redirectTo);
      return;
    }

    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession) {
    return <LoadingState message="Checking recruiter session..." />;
  }

  return <>{children}</>;
}
