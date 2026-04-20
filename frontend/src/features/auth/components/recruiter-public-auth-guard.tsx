"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/ui/loading-state";
import { routes } from "@/lib/routes";
import useRecruiterSession from "../hooks/use-recruiter-session";

type RecruiterPublicAuthGuardProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterPublicAuthGuard({
  children,
}: RecruiterPublicAuthGuardProps) {
  const router = useRouter();
  const { session, isLoading } = useRecruiterSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session?.is_logged_in) {
      return;
    }

    router.replace(routes.recruiter.dashboard);
  }, [isLoading, router, session]);

  if (isLoading) {
    return <LoadingState message="Checking recruiter session..." />;
  }

  if (session?.is_logged_in) {
    return <LoadingState message="Redirecting..." />;
  }

  return <>{children}</>;
}
