import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import SectionCard from "@/components/ui/section-card";
import StatusChip from "@/components/ui/status-chip";

const jnfItems = [
  {
    title: "Graduate Engineer Trainee - Mining Operations",
    status: "draft" as const,
  },
  {
    title: "Data Analyst - Business Intelligence",
    status: "submitted" as const,
  },
  {
    title: "Associate Consultant - Operations Strategy",
    status: "changes_requested" as const,
  },
];

export default function RecruiterJnfsPage() {
  return (
    <PageContainer
      title="JNF workspace"
      description="The recruiter JNF area is intentionally split into sections so large job submissions stay manageable and reviewable."
    >
      <SectionCard
        title="Current JNFs"
        description="This preview list shows how the recruiter area should present a clean view of role titles and workflow status."
      >
        <Stack spacing={2}>
          {jnfItems.map((item) => (
            <Stack
              key={item.title}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1.5}
            >
              <Typography>{item.title}</Typography>
              <StatusChip status={item.status} />
            </Stack>
          ))}
        </Stack>
      </SectionCard>

      <SectionCard
        title="JNF structure"
        description="The backend already mirrors this breakdown, so the frontend should treat JNF authoring as a sectioned workflow."
      >
        <Stack spacing={1}>
          <Typography>Core JNF details</Typography>
          <Typography>Contacts and communication owners</Typography>
          <Typography>Skills, eligibility, and salary details</Typography>
          <Typography>Selection rounds, declaration, and documents</Typography>
        </Stack>
      </SectionCard>
    </PageContainer>
  );
}
