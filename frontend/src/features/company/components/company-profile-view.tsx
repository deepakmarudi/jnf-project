import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { CompanyProfile } from "../types";

type CompanyProfileViewProps = Readonly<{
  profile: CompanyProfile;
  onEdit: () => void;
}>;

function FormGrid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}

function formatValue(value: string | boolean | string[] | null | undefined) {
  if (value === null || value === undefined) {
    return "Not provided yet";
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided yet";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value).trim() ? value : "Not provided yet";
}

function ProfileField({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | boolean | string[];
}>) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="body2">{formatValue(value)}</Typography>
    </Stack>
  );
}

export default function CompanyProfileView({
  profile,
  onEdit,
}: CompanyProfileViewProps) {
  return (
    <Stack spacing={3}>
      <SectionCard
        title="Company Profile Overview"
        description="These are the saved company details currently used across recruiter workflows."
        actions={
          <Button variant="contained" onClick={onEdit}>
            Edit Company Details
          </Button>
        }
      >
        <FormGrid>
          <ProfileField label="Company Name" value={profile.name} />
          <ProfileField label="Website" value={profile.website} />
          <ProfileField label="Employee Count" value={profile.employee_count} />
          <ProfileField label="Logo Path" value={profile.logo_path} />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Classification and Industry"
        description="Saved sector, company type, and industry metadata."
      >
        <FormGrid>
          <ProfileField label="Sector" value={profile.sector} />
          <ProfileField
            label="Organization Type"
            value={profile.category_or_org_type}
          />
          <ProfileField label="Industry Tags" value={profile.industry_tag_ids} />
          <ProfileField label="Is MNC" value={profile.is_mnc} />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Headquarters and Address"
        description="Official location and address information."
      >
        <FormGrid>
          <ProfileField label="Postal Address" value={profile.postal_address} />
          <ProfileField label="Headquarters Country" value={profile.hq_country} />
          <ProfileField label="Headquarters City" value={profile.hq_city} />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Business Profile"
        description="Background information and business description."
      >
        <FormGrid>
          <ProfileField
            label="Date of Establishment"
            value={profile.date_of_establishment}
          />
          <ProfileField
            label="Annual Turnover"
            value={profile.annual_turnover}
          />
          <ProfileField
            label="Nature of Business"
            value={profile.nature_of_business}
          />
          <ProfileField
            label="Company Description"
            value={profile.description}
          />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Branding and Links"
        description="Public-facing company links and branding references."
      >
        <FormGrid>
          <ProfileField
            label="Social Media URL"
            value={profile.social_media_url}
          />
          <ProfileField label="Logo Path" value={profile.logo_path} />
        </FormGrid>
      </SectionCard>
    </Stack>
  );
}
