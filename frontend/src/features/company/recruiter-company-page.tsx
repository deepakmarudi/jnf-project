import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import SectionCard from "@/components/ui/section-card";

export default function RecruiterCompanyPage() {
  return (
    <PageContainer
      title="Company profile"
      description="This page is the recruiter-side workspace for maintaining organization details that support one or more JNFs."
    >
      <Stack spacing={3}>
        <SectionCard
          title="Organization snapshot"
          description="The company profile should be stable, reusable, and separate from job-specific form data."
        >
          <Stack spacing={1}>
            <Typography>Company name: Example Industries Pvt. Ltd.</Typography>
            <Typography>Sector: Core engineering and technology</Typography>
            <Typography>Website: www.example-industries.com</Typography>
            <Typography>Headquarters: Bengaluru, India</Typography>
          </Stack>
        </SectionCard>

        <SectionCard
          title="Why this matters"
          description="A complete company profile reduces repeated data entry and makes JNF submissions cleaner."
        >
          <Stack spacing={1}>
            <Typography>Used as the recruiter identity anchor across the portal.</Typography>
            <Typography>Supports better admin review context for submitted JNFs.</Typography>
            <Typography>Prepares the account for future hiring cycles.</Typography>
          </Stack>
        </SectionCard>
      </Stack>
    </PageContainer>
  );
}
