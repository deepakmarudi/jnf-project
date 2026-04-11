import Box from "@mui/material/Box";
import PublicShell from "@/components/layout/public-shell";
import AuthSidePanel from "@/features/auth/components/auth-side-panel";
import RecruiterRegisterFormCard from "@/features/auth/components/recruiter-register-form-card";

export default function RecruiterRegisterPage() {
  return (
    <PublicShell>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 540px" },
          alignItems: "stretch",
        }}
      >
        <AuthSidePanel
          eyebrow="Recruiter onboarding"
          title="Register your company with a cleaner intake flow."
          description="This page is the public handoff into the recruiter system. It should feel operational, trustworthy, and structured from the first interaction."
          bullets={[
            "Capture recruiter and company details in one flow",
            "Prepare the company profile for downstream JNF work",
            "Reduce repeated coordination with the placement office",
          ]}
        />
        <RecruiterRegisterFormCard />
      </Box>
    </PublicShell>
  );
}
