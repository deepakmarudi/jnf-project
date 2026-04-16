"use client";

import Link from "next/link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { getCompanyProfileForRecruiter } from "@/features/company/lib/company-storage";
import { routes } from "@/lib/routes";
import JnfFormGrid from "./jnf-form-grid";

function SummaryField({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="body2">{value || "Not provided yet"}</Typography>
    </Stack>
  );
}

export default function JnfCompanySummaryCard() {
  const session = useRecruiterSession();

  const companyProfile = session?.recruiter_id
    ? getCompanyProfileForRecruiter(session.recruiter_id)
    : null;

  if (!companyProfile) {
    return (
      <SectionCard
        title="Company Summary"
        description="A company profile is required before creating and submitting JNFs."
        actions={
          <Button
            component={Link}
            href={routes.recruiter.company}
            variant="contained"
          >
            Open Company Profile
          </Button>
        }
      >
        <Alert severity="warning">
          Company profile data is not available yet. Complete the company page
          first so this JNF can use the correct company information.
        </Alert>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Company Summary"
      description="This JNF will use the saved recruiter company profile as its company reference."
      actions={
        <Button
          component={Link}
          href={routes.recruiter.company}
          variant="outlined"
        >
          View Company Profile
        </Button>
      }
    >
      <JnfFormGrid>
        <SummaryField label="Company Name" value={companyProfile.name} />
        <SummaryField label="Website" value={companyProfile.website} />
        <SummaryField label="Sector" value={companyProfile.sector} />
        <SummaryField
          label="Organization Type"
          value={companyProfile.category_or_org_type}
        />
        <SummaryField label="Headquarters City" value={companyProfile.hq_city} />
        <SummaryField
          label="Headquarters Country"
          value={companyProfile.hq_country}
        />
        <SummaryField
          label="Employee Count"
          value={companyProfile.employee_count}
        />
        <SummaryField label="Company Description" value={companyProfile.description} />
      </JnfFormGrid>
    </SectionCard>
  );
}
