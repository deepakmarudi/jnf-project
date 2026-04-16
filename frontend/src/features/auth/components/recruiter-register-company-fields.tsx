import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { organizationTypeOptions, sectorOptions } from "@/features/company/data/company-form-options";
import type {
  RecruiterRegisterCompanyValues,
  RecruiterRegisterFormErrors,
  RecruiterRegisterFormValues,
} from "../types";
import RecruiterRegisterFormGrid from "./recruiter-register-form-grid";

type RecruiterRegisterCompanyFieldsProps = Readonly<{
  form: RecruiterRegisterFormValues;
  errors: RecruiterRegisterFormErrors;
  onCompanyFieldChange: <K extends keyof RecruiterRegisterCompanyValues>(
    field: K,
    value: RecruiterRegisterCompanyValues[K]
  ) => void;
}>;

export default function RecruiterRegisterCompanyFields({
  form,
  errors,
  onCompanyFieldChange,
}: RecruiterRegisterCompanyFieldsProps) {
  const industryTagsInput = form.company.industry_tag_ids.join(", ");

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Company Details</Typography>

      <RecruiterRegisterFormGrid>
        <TextField
          label="Company Name"
          required
          value={form.company.name}
          onChange={(event) => onCompanyFieldChange("name", event.target.value)}
          error={Boolean(errors.company?.name)}
          helperText={errors.company?.name}
          fullWidth
        />

        <TextField
          label="Website"
          type="url"
          placeholder="https://example.com"
          value={form.company.website}
          onChange={(event) =>
            onCompanyFieldChange("website", event.target.value)
          }
          error={Boolean(errors.company?.website)}
          helperText={errors.company?.website}
          fullWidth
        />

        <TextField
          label="Postal Address"
          value={form.company.postal_address}
          onChange={(event) =>
            onCompanyFieldChange("postal_address", event.target.value)
          }
          error={Boolean(errors.company?.postal_address)}
          helperText={errors.company?.postal_address}
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          label="Employee Count"
          value={form.company.employee_count}
          onChange={(event) =>
            onCompanyFieldChange("employee_count", event.target.value)
          }
          error={Boolean(errors.company?.employee_count)}
          helperText={errors.company?.employee_count}
          fullWidth
        />

        <TextField
          select
          label="Sector"
          value={form.company.sector}
          onChange={(event) => onCompanyFieldChange("sector", event.target.value)}
          error={Boolean(errors.company?.sector)}
          helperText={errors.company?.sector}
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
          value={form.company.category_or_org_type}
          onChange={(event) =>
            onCompanyFieldChange("category_or_org_type", event.target.value)
          }
          error={Boolean(errors.company?.category_or_org_type)}
          helperText={errors.company?.category_or_org_type}
          fullWidth
        >
          {organizationTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Headquarters Country"
          value={form.company.hq_country}
          onChange={(event) =>
            onCompanyFieldChange("hq_country", event.target.value)
          }
          error={Boolean(errors.company?.hq_country)}
          helperText={errors.company?.hq_country}
          fullWidth
        />

        <TextField
          label="Headquarters City"
          value={form.company.hq_city}
          onChange={(event) => onCompanyFieldChange("hq_city", event.target.value)}
          error={Boolean(errors.company?.hq_city)}
          helperText={errors.company?.hq_city}
          fullWidth
        />

        <TextField
          label="Date of Establishment"
          type="date"
          value={form.company.date_of_establishment}
          onChange={(event) =>
            onCompanyFieldChange("date_of_establishment", event.target.value)
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Annual Turnover"
          value={form.company.annual_turnover}
          onChange={(event) =>
            onCompanyFieldChange("annual_turnover", event.target.value)
          }
          error={Boolean(errors.company?.annual_turnover)}
          helperText={errors.company?.annual_turnover}
          fullWidth
        />

        <TextField
          label="Logo Path"
          value={form.company.logo_path}
          onChange={(event) =>
            onCompanyFieldChange("logo_path", event.target.value)
          }
          fullWidth
        />

        <TextField
          label="Social Media URL"
          type="url"
          value={form.company.social_media_url}
          onChange={(event) =>
            onCompanyFieldChange("social_media_url", event.target.value)
          }
          fullWidth
        />
      </RecruiterRegisterFormGrid>

      <TextField
        label="Nature of Business"
        value={form.company.nature_of_business}
        onChange={(event) =>
          onCompanyFieldChange("nature_of_business", event.target.value)
        }
        multiline
        minRows={3}
        fullWidth
      />

      <TextField
        label="Company Description"
        value={form.company.description}
        onChange={(event) =>
          onCompanyFieldChange("description", event.target.value)
        }
        multiline
        minRows={3}
        fullWidth
      />

      <TextField
        label="Industry Tag IDs"
        placeholder="1, 2, 3"
        value={industryTagsInput}
        onChange={(event) =>
          onCompanyFieldChange(
            "industry_tag_ids",
            event.target.value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          )
        }
        helperText="Use numeric tag ids for now, comma separated."
        fullWidth
      />

      <FormControlLabel
        control={
          <Switch
            checked={form.company.is_mnc}
            onChange={(event) =>
              onCompanyFieldChange("is_mnc", event.target.checked)
            }
          />
        }
        label="This company is an MNC"
      />
    </Stack>
  );
}
