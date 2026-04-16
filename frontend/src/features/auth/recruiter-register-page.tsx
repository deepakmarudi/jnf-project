import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RecruiterPublicAuthGuard from "./components/recruiter-public-auth-guard";
import RecruiterRegisterFormCard from "./components/recruiter-register-form-card";
import RecruiterRegisterHeroCard from "./components/recruiter-register-hero-card";
import RecruiterRegisterPageHeader from "./components/recruiter-register-page-header";

export default function RecruiterRegisterPage() {
  return (
    <RecruiterPublicAuthGuard>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <RecruiterRegisterPageHeader />

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
          <RecruiterRegisterHeroCard />
          <RecruiterRegisterFormCard />
        </Box>
      </Stack>
    </RecruiterPublicAuthGuard>
  );
}
