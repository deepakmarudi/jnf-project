import Box from "@mui/material/Box";
import PublicShell from "@/components/layout/public-shell";
import AuthSidePanel from "@/features/auth/components/auth-side-panel";
import RecruiterLoginFormCard from "@/features/auth/components/recruiter-login-form-card";

export default function RecruiterLoginPage() {
  return (
    <PublicShell>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 480px" },
          alignItems: "stretch",
        }}
      >
        <AuthSidePanel
          eyebrow="Recruiter access"
          title="Step into the recruiter workspace."
          description="The recruiter side takes over after the public portal has established context. This is where company details, JNFs, and workflow status live."
          bullets={[
            "Manage company profile once, reuse it across hiring cycles",
            "Create and track JNFs in structured sections",
            "View workflow status without scattered email threads",
          ]}
        />
        <RecruiterLoginFormCard />
      </Box>
    </PublicShell>
  );
}
