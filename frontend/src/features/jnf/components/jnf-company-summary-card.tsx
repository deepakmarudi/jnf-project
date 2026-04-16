"use client";

import * as React from "react";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { getMyCompanyProfile } from "@/features/company/lib/company-api";
import { routes } from "@/lib/routes";
import JnfFormGrid from "./jnf-form-grid";

type JnfCompanySummaryCardProps = Readonly<{
  embedded?: boolean;
}>;

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

export default function JnfCompanySummaryCard({
  embedded = false,
}: JnfCompanySummaryCardProps) {
  const { session, isLoading } = useRecruiterSession();
  const [companyProfile, setCompanyProfile] = React.useState<null | {
    name: string;
    website: string;
    sector: string;
    category_or_org_type: string;
    hq_city: string;
    hq_country: string;
    employee_count: string;
    description: string;
  }>(null);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (isLoading || !session?.is_logged_in) {
      return;
    }

    let isMounted = true;

    async function loadCompanyProfile() {
      try {
        const profile = await getMyCompanyProfile();

        if (!isMounted) {
          return;
        }

        setCompanyProfile({
          name: profile.name,
          website: profile.website,
          sector: profile.sector,
          category_or_org_type: profile.category_or_org_type,
          hq_city: profile.hq_city,
          hq_country: profile.hq_country,
          employee_count: profile.employee_count,
          description: profile.description,
        });
        setHasError(false);
      } catch {
        if (!isMounted) {
          return;
        }

        setCompanyProfile(null);
        setHasError(true);
      }
    }

    loadCompanyProfile();

    return () => {
      isMounted = false;
    };
  }, [isLoading, session]);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Loading company profile...
        </Typography>
      </Stack>
    );
  }

  const missingProfileContent = (
    <Stack spacing={2}>
      <Alert severity="warning">
        Company profile data is not available yet. Complete the company page
        first so this JNF can use the correct company information.
      </Alert>

      <Button
        component={Link}
        href={routes.recruiter.company}
        variant="contained"
        sx={{ alignSelf: "flex-start" }}
      >
        Open Company Profile
      </Button>
    </Stack>
  );

  if (!companyProfile || hasError) {
    if (embedded) {
      return missingProfileContent;
    }

    return (
      <SectionCard
        title="Company Summary"
        description="A company profile is required before creating and submitting JNFs."
      >
        {missingProfileContent}
      </SectionCard>
    );
  }

  const summaryContent = (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        This JNF will use the saved recruiter company profile as its company reference.
      </Typography>

      <Button
        component={Link}
        href={routes.recruiter.company}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        View Company Profile
      </Button>

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
    </Stack>
  );

  if (embedded) {
    return summaryContent;
  }

  return (
    <SectionCard
      title="Company Summary"
      description="This JNF will use the saved recruiter company profile as its company reference."
    >
      {summaryContent}
    </SectionCard>
  );
}
