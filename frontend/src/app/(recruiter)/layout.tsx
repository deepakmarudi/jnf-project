import RecruiterShell from "@/components/layout/recruiter-shell";
import RecruiterRouteGuard from "@/features/auth/components/recruiter-route-guard";

type RecruiterLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterLayout({
  children,
}: RecruiterLayoutProps) {
  return (
    <RecruiterRouteGuard>
      <RecruiterShell>{children}</RecruiterShell>
    </RecruiterRouteGuard>
  );
}
