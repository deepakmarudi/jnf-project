import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import SectionCard from "@/components/ui/section-card";

const summaryCards = [
  { label: "Company profile", value: "82%", detail: "completion readiness" },
  { label: "Active JNFs", value: "3", detail: "currently in progress" },
  { label: "Review actions", value: "1", detail: "awaiting recruiter update" },
];

export default function RecruiterDashboardPage() {
  return (
    <PageContainer
      title="Recruiter dashboard"
      description="This is the recruiter-side control room for profile readiness, JNF activity, and review follow-up."
    >
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={0.75}>
                <Typography sx={{ color: "text.secondary" }}>
                  {card.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.4rem" },
                    fontWeight: 800,
                    color: "primary.main",
                  }}
                >
                  {card.value}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {card.detail}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <SectionCard
        title="Next actions"
        description="A recruiter dashboard should tell the user what to do next, not just show numbers."
      >
        <Stack spacing={1.5}>
          <Typography>Complete remaining company profile fields.</Typography>
          <Typography>Review the JNF flagged for requested changes.</Typography>
          <Typography>Prepare round details before submission.</Typography>
        </Stack>
      </SectionCard>
    </PageContainer>
  );
}
