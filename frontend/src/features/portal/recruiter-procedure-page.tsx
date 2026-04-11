import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import { routes } from "@/lib/routes";

const procedureSteps = [
  {
    title: "Create recruiter access",
    detail:
      "Start from the public recruiter entry and submit your primary recruiter contact information.",
  },
  {
    title: "Register organization details",
    detail:
      "Set up the company profile so the team does not need to repeat organizational information across roles.",
  },
  {
    title: "Complete the JNF workspace",
    detail:
      "Enter job profile, eligibility, compensation, selection rounds, and supporting documents in structured sections.",
  },
  {
    title: "Track review decisions",
    detail:
      "Follow review status from draft to submitted, under review, changes requested, approved, or closed.",
  },
];

export default function RecruiterProcedurePage() {
  return (
    <PageContainer
      title="Recruiter procedure"
      description="This page is the public guide for how recruiters move from initial contact to structured JNF submission."
    >
      <Stack spacing={3}>
        {procedureSteps.map((step, index) => (
          <Card key={step.title} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="overline"
                  sx={{ color: "secondary.dark", fontWeight: 800 }}
                >
                  Step {index + 1}
                </Typography>
                <Typography variant="h5">{step.title}</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {step.detail}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Box>
          <Button component={Link} href={routes.public.login} variant="contained">
            Continue to recruiter login
          </Button>
        </Box>
      </Stack>
    </PageContainer>
  );
}
