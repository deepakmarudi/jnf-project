import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";

const recruiterSectors = [
  {
    title: "Product and technology",
    detail:
      "Roles across software, data, infrastructure, analytics, product operations, and digital systems.",
  },
  {
    title: "Core engineering",
    detail:
      "Hiring interest across mining, manufacturing, process industries, energy, infrastructure, and project operations.",
  },
  {
    title: "Consulting and strategy",
    detail:
      "Business analysis, operations consulting, transformation, research, and strategic advisory roles.",
  },
  {
    title: "Finance and risk",
    detail:
      "Recruitment for finance, markets, analytics, operations control, and governance-focused roles.",
  },
];

export default function PastRecruitersPage() {
  return (
    <PageContainer
      title="Past recruiters"
      description="This public page is intentionally structured as a recruiter-confidence page. Once backend data is connected, it can be fed with real recruiter history."
    >
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        {recruiterSectors.map((sector) => (
          <Card key={sector.title} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={1.25}>
                <Typography variant="h5" color="primary.main">
                  {sector.title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {sector.detail}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </PageContainer>
  );
}
