"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingState from "@/components/ui/loading-state";
import {
  canAccessRecruiterPath,
  getRecruiterSession,
} from "../lib/mock-auth";

type RecruiterRouteGuardProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterRouteGuard({
  children,
}: RecruiterRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    const recruiterSession = getRecruiterSession();
    const accessResult = canAccessRecruiterPath(pathname, recruiterSession);

    if (!accessResult.allowed) {
      router.replace(accessResult.redirectTo);
      return;
    }

    setIsCheckingAccess(false);
  }, [pathname, router]);

  if (isCheckingAccess) {
    return <LoadingState message="Checking recruiter access..." />;
  }

  return <>{children}</>;
}
