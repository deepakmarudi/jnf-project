import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PublicShell from "@/components/layout/public-shell";

export default function HomePage() {
  return (
    <PublicShell>
      <Stack spacing={4} sx={{ maxWidth: 720 }}>
        <Stack spacing={2}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            IIT (ISM) Dhanbad
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4.25rem" },
              lineHeight: 1.05,
            }}
          >
            JNF Portal for structured recruiter onboarding and job submission.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 640,
              color: "text.secondary",
              fontSize: "1.1rem",
            }}
          >
            A professional placement portal for company onboarding, Job
            Notification Form submission, recruiter tracking, and admin review
            workflow.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" size="large">
            Recruiter Login
          </Button>
          <Button variant="outlined" size="large">
            Register Company
          </Button>
        </Stack>
      </Stack>
    </PublicShell>
  );
}
