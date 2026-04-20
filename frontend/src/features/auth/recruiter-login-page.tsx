import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RecruiterPublicAuthGuard from "./components/recruiter-public-auth-guard";
import RecruiterLoginFormCard from "./components/recruiter-login-form-card";
import RecruiterLoginHeroCard from "./components/recruiter-login-hero-card";
import RecruiterLoginPageHeader from "./components/recruiter-login-page-header";

export default function RecruiterLoginPage() {
  return (
    <RecruiterPublicAuthGuard>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <RecruiterLoginPageHeader />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(300px, 0.82fr) minmax(520px, 1.18fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <RecruiterLoginHeroCard />
          <RecruiterLoginFormCard />
        </Box>
      </Stack>
    </RecruiterPublicAuthGuard>
  );
}
