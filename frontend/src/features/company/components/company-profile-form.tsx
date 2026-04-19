import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import SectionCard from "@/components/ui/section-card";
import {
  organizationTypeOptions,
  sectorOptions,
} from "../data/company-form-options";
import type {
  CompanyProfile,
  CompanyProfileErrors,
} from "../types";

type CompanyProfileFormProps = Readonly<{
  form: CompanyProfile;
  setForm: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  errors: CompanyProfileErrors;
  onSave: () => void;
  isSaving: boolean;
  onCancel?: () => void;
  submitLabel?: string;
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

export default function CompanyProfileForm({
  form,
  setForm,
  errors,
  onSave,
  isSaving,
  onCancel,
  submitLabel = "Save Changes",
}: CompanyProfileFormProps) {
  const industryTagsInput = form.industry_tag_ids.join(", ");

  return (
    <Stack spacing={3}>
      <SectionCard
        title="Basic Company Details"
        description="Core organization information used across the recruiter portal."
      >
        <FormGrid>
          <TextField
            label="Company Name"
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Website"
            type="url"
            required
            placeholder="https://example.com"
            value={form.website}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                website: event.target.value,
              }))
            }
            error={Boolean(errors.website)}
            helperText={errors.website}
            fullWidth
          />

          <TextField
            label="Employee Count"
            placeholder="e.g. 5000+"
            value={form.employee_count}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                employee_count: event.target.value,
              }))
            }
            fullWidth
          />

          <TextField
            label="Logo Path"
            placeholder="/uploads/company-logo.png"
            value={form.logo_path}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                logo_path: event.target.value,
              }))
            }
            helperText="Use a simple path field for version 1. File upload can come later."
            fullWidth
          />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Classification and Industry"
        description="How the organization should be categorized for portal use and reporting."
      >
        <FormGrid>
          <TextField
            select
            label="Sector"
            required
            value={form.sector}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                sector: event.target.value,
              }))
            }
            error={Boolean(errors.sector)}
            helperText={errors.sector}
            fullWidth
          >
            {sectorOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Organization Type"
            required
            value={form.category_or_org_type}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                category_or_org_type: event.target.value,
              }))
            }
            error={Boolean(errors.category_or_org_type)}
            helperText={errors.category_or_org_type}
            fullWidth
          >
            {organizationTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>



          <FormControlLabel
            control={
              <Switch
                checked={form.is_mnc}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    is_mnc: event.target.checked,
                  }))
                }
              />
            }
            label="This company is an MNC"
          />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Headquarters and Address"
        description="Primary office and address details used for official communication."
      >
        <FormGrid>
          <TextField
            label="Postal Address"
            required
            value={form.postal_address}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                postal_address: event.target.value,
              }))
            }
            error={Boolean(errors.postal_address)}
            helperText={errors.postal_address}
            multiline
            minRows={4}
            fullWidth
          />

          <Box />

          <TextField
            label="Headquarters Country"
            required
            value={form.hq_country}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                hq_country: event.target.value,
              }))
            }
            error={Boolean(errors.hq_country)}
            helperText={errors.hq_country}
            fullWidth
          />

          <TextField
            label="Headquarters City"
            required
            value={form.hq_city}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                hq_city: event.target.value,
              }))
            }
            error={Boolean(errors.hq_city)}
            helperText={errors.hq_city}
            fullWidth
          />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Business Profile"
        description="Business background and descriptive information about the organization."
      >
        <FormGrid>
          <TextField
            label="Date of Establishment"
            type="date"
            value={form.date_of_establishment}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                date_of_establishment: event.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Annual Turnover"
            placeholder="e.g. INR 50 Cr"
            value={form.annual_turnover}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                annual_turnover: event.target.value,
              }))
            }
            fullWidth
          />

          <TextField
            label="Nature of Business"
            value={form.nature_of_business}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                nature_of_business: event.target.value,
              }))
            }
            multiline
            minRows={3}
            fullWidth
          />

          <TextField
            label="Company Description"
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            multiline
            minRows={3}
            fullWidth
          />
        </FormGrid>
      </SectionCard>

      <SectionCard
        title="Branding and Links"
        description="Public-facing links and profile information for the company."
      >
        <FormGrid>
          <TextField
            label="Social Media URL"
            type="url"
            placeholder="https://linkedin.com/company/your-company"
            value={form.social_media_url}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                social_media_url: event.target.value,
              }))
            }
            fullWidth
          />

          <TextField
            label="Logo Path"
            placeholder="/uploads/company-logo.png"
            value={form.logo_path}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                logo_path: event.target.value,
              }))
            }
            fullWidth
          />
        </FormGrid>
      </SectionCard>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1.5}>
          {onCancel ? (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}

          <Button variant="contained" onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : submitLabel}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
