import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";

const teamSections = [
  {
    id: "administration",
    title: "Administration",
    detail:
      "Placement office leadership, policy oversight, coordination standards, and formal recruiter communication channels.",
  },
  {
    id: "student-team",
    title: "Student team",
    detail:
      "Execution support for scheduling, day-of-interaction coordination, communication loops, and operational readiness.",
  },
  {
    id: "nucleus-team",
    title: "Nucleus team",
    detail:
      "Core student leadership responsible for process continuity, recruiter handoff, and workflow discipline.",
  },
  {
    id: "gallery",
    title: "Gallery",
    detail:
      "A public-facing visual section for future placement events, recruiter interactions, and milestone highlights.",
  },
];

export default function TeamPage() {
  return (
    <PageContainer
      title="Our team"
      description="The public team page is grouped the same way as the navigation menu so future content can scale without rewriting the information architecture."
    >
      <Stack spacing={3}>
        {teamSections.map((section) => (
          <Box key={section.id} id={section.id} sx={{ scrollMarginTop: 160 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Stack spacing={1.25}>
                  <Typography variant="h4" color="primary.main">
                    {section.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {section.detail}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </PageContainer>
  );
}
