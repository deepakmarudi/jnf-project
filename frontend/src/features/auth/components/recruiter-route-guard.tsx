"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingState from "@/components/ui/loading-state";
import { routes } from "@/lib/routes";
import useRecruiterSession from "../hooks/use-recruiter-session";

type RecruiterRouteGuardProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterRouteGuard({
  children,
}: RecruiterRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, isLoading } = useRecruiterSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session?.is_logged_in) {
      router.replace(routes.public.login);
      return;
    }

  }, [isLoading, pathname, router, session]);

  if (isLoading) {
    return <LoadingState message="Checking recruiter access..." />;
  }

  if (!session?.is_logged_in) {
    return <LoadingState message="Redirecting to login..." />;
  }

  return <>{children}</>;
}
