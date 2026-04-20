import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import type { JnfRecord } from "../types";
import JnfFormGrid from "./jnf-form-grid";
import { jnfFunctionalAreaOptions } from "../data/jnf-functional-areas";

type JnfJobProfileSectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  embedded?: boolean;
}>;

const roleTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "internship", label: "Internship" },
  { value: "internship_ppo", label: "Internship + PPO" },
  { value: "contract", label: "Contract" },
  { value: "other", label: "Other" },
] as const;

const workModeOptions = [
  { value: "on_site", label: "Onsite" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
] as const;

export default function JnfJobProfileSection({
  form,
  setForm,
  fieldErrors,
  embedded = false,
}: JnfJobProfileSectionProps) {
  const content = (
    <Stack spacing={2.5}>
      <JnfFormGrid>
        <TextField
          label="Recruitment Season"
          required
          placeholder="e.g. 2026-27"
          value={form.recruitment_season}
          error={Boolean(fieldErrors["recruitment_season"])}
          helperText={fieldErrors["recruitment_season"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              recruitment_season: event.target.value,
            }))
          }
          fullWidth
        />

        <TextField
          label="Job Title"
          required
          placeholder="e.g. Software Development Engineer"
          value={form.job_title}
          error={Boolean(fieldErrors["job_title"])}
          helperText={fieldErrors["job_title"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              job_title: event.target.value,
            }))
          }
          fullWidth
        />

        <TextField
          label="Job Designation"
          required
          placeholder="e.g. SDE-1"
          value={form.job_designation}
          error={Boolean(fieldErrors["job_designation"])}
          helperText={fieldErrors["job_designation"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              job_designation: event.target.value,
            }))
          }
          fullWidth
        />

        <TextField
          select
          label="Department / Function"
          value={form.department_or_function}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              department_or_function: event.target.value,
            }))
          }
          fullWidth
        >
          {jnfFunctionalAreaOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          select
          label="Role Type"
          required
          value={form.role_type}
          error={Boolean(fieldErrors["role_type"])}
          helperText={fieldErrors["role_type"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              role_type: event.target.value as JnfRecord["role_type"],
            }))
          }
          fullWidth
        >
          {roleTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Work Mode"
          required
          value={form.work_location_mode}
          error={Boolean(fieldErrors["work_location_mode"])}
          helperText={fieldErrors["work_location_mode"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              work_location_mode: event.target.value as JnfRecord["work_location_mode"],
            }))
          }
          fullWidth
        >
          {workModeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Place of Posting"
          required
          placeholder="e.g. Bengaluru"
          value={form.place_of_posting}
          error={Boolean(fieldErrors["place_of_posting"])}
          helperText={fieldErrors["place_of_posting"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              place_of_posting: event.target.value,
            }))
          }
          fullWidth
        />

        <TextField
          label="Tentative Joining Month"
          required
          type="month"
          value={form.tentative_joining_month}
          error={Boolean(fieldErrors["tentative_joining_month"])}
          helperText={fieldErrors["tentative_joining_month"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              tentative_joining_month: event.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Expected Hires"
          required
          type="number"
          value={form.expected_hires}
          error={Boolean(fieldErrors["expected_hires"])}
          helperText={fieldErrors["expected_hires"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              expected_hires:
                event.target.value === "" ? "" : Number(event.target.value),
            }))
          }
          fullWidth
        />

        <TextField
          label="Minimum Hires"
          type="number"
          value={form.minimum_hires}
          error={Boolean(fieldErrors["minimum_hires"])}
          helperText={fieldErrors["minimum_hires"]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              minimum_hires:
                event.target.value === "" ? "" : Number(event.target.value),
            }))
          }
          fullWidth
        />

        <TextField
          label="Required Skills"
          placeholder="React, Node.js, SQL"
          value={form.required_skills.join(", ")}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              required_skills: event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            }))
          }
          helperText="Enter comma-separated skills."
          fullWidth
        />
      </JnfFormGrid>

      <TextField
        label="Job Description"
        required
        value={form.job_description_html}
        error={Boolean(fieldErrors["job_description_html"])}
        helperText={
          fieldErrors["job_description_html"] ??
          "This field is required before final submission."
        }
        onChange={(event) =>
          setForm((current) => ({
            ...current,
            job_description_html: event.target.value,
          }))
        }
        multiline
        minRows={5}
        fullWidth
      />

      <TextField
        label="Additional Job Information"
        value={form.additional_job_info}
        onChange={(event) =>
          setForm((current) => ({
            ...current,
            additional_job_info: event.target.value,
          }))
        }
        multiline
        minRows={4}
        fullWidth
      />
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title="Job Profile"
      description="Add the role details, hiring plan, skills, and core job description."
    >
      {content}
    </SectionCard>
  );
}
