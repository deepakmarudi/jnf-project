import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import SectionCard from "@/components/ui/section-card";
import {
  jnfProgrammeOptions,
  normalizeSelectionWithAll,
  type JnfEligibilityOption,
} from "../data/jnf-eligibility-options";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import type { JnfRecord } from "../types";
import JnfFormGrid from "./jnf-form-grid";
import { useMasterData } from "../hooks/use-master-data";

type JnfEligibilitySectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  embedded?: boolean;
}>;

const genderOptions = [
  { value: "all", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

function getSelectedOptions(
  options: JnfEligibilityOption[],
  selectedValues: string[]
) {
  return options.filter((option) => selectedValues.includes(option.value));
}

export default function JnfEligibilitySection({
  form,
  setForm,
  fieldErrors,
  embedded = false,
}: JnfEligibilitySectionProps) {
  const { programmes, disciplines, isLoading } = useMasterData();

  const degreeOptions: JnfEligibilityOption[] = isLoading
    ? []
    : [
        { value: "all", label: "All" },
        ...programmes
          .filter((p) => {
            if (form.eligibility.eligible_programme === "ug") return p.level === "ug";
            if (form.eligibility.eligible_programme === "pg") return p.level === "pg";
            if (form.eligibility.eligible_programme === "both") return true;
            return false;
          })
          .reduce((acc, p) => {
            // De-duplicate by name to prevent React key collisions
            if (!acc.some(item => item.label === p.name)) {
              acc.push({ value: String(p.id), label: p.name });
            }
            return acc;
          }, [] as JnfEligibilityOption[]),
      ];

  const branchOptions: JnfEligibilityOption[] = isLoading
    ? []
    : [
        { value: "all", label: "All" },
        ...disciplines.reduce((acc, d) => {
          if (!acc.some(item => item.label === d.name)) {
            acc.push({ value: String(d.id), label: d.name });
          }
          return acc;
        }, [] as JnfEligibilityOption[]),
      ];

  const content = (
    <Stack spacing={2.5}>
      {isLoading && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'primary.main' }}>
          <CircularProgress size={16} color="inherit" />
          <Typography variant="caption">Updating curriculum data...</Typography>
        </Stack>
      )}
      <JnfFormGrid>
        <TextField
          label="Eligible Batch"
          placeholder="e.g. 2027 passing out batch"
          value={form.eligibility.eligible_batch}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                eligible_batch: event.target.value,
              },
            }))
          }
          fullWidth
        />

        <TextField
          select
          label="Programme"
          required
          value={form.eligibility.eligible_programme}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                eligible_programme:
                  event.target.value as JnfRecord["eligibility"]["eligible_programme"],
                eligible_degree_ids: [],
                eligible_branch_ids: [],
              },
            }))
          }
          error={Boolean(fieldErrors["eligibility.eligible_programme"])}
          helperText={fieldErrors["eligibility.eligible_programme"]}
          fullWidth
        >
          {jnfProgrammeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Minimum Class 10 Percentage"
          type="number"
          value={form.eligibility.minimum_class_10_percentage}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                minimum_class_10_percentage:
                  event.target.value === "" ? "" : Number(event.target.value),
              },
            }))
          }
          fullWidth
        />

        <TextField
          label="Minimum Class 12 Percentage"
          type="number"
          value={form.eligibility.minimum_class_12_percentage}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                minimum_class_12_percentage:
                  event.target.value === "" ? "" : Number(event.target.value),
              },
            }))
          }
          fullWidth
        />

        <TextField
          select
          label="Gender Filter"
          value={form.eligibility.gender_filter}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                gender_filter:
                  event.target.value as JnfRecord["eligibility"]["gender_filter"],
              },
            }))
          }
          fullWidth
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Gap Year Allowed"
          value={form.eligibility.gap_year_allowed}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                gap_year_allowed:
                  event.target.value as JnfRecord["eligibility"]["gap_year_allowed"],
              },
            }))
          }
          fullWidth
        >
          {yesNoOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="History of Arrears Allowed"
          value={form.eligibility.history_of_arrears_allowed}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                history_of_arrears_allowed:
                  event.target.value as JnfRecord["eligibility"]["history_of_arrears_allowed"],
              },
            }))
          }
          fullWidth
        >
          {yesNoOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </JnfFormGrid>

      <Autocomplete
        multiple
        options={degreeOptions}
        value={getSelectedOptions(
          degreeOptions,
          form.eligibility.eligible_degree_ids
        )}
        onChange={(_, value) =>
          setForm((current) => ({
            ...current,
            eligibility: {
              ...current.eligibility,
              eligible_degree_ids: normalizeSelectionWithAll(
                value.map((item) => item.value)
              ),
              eligible_branch_ids: [],
            },
          }))
        }
        getOptionLabel={(option) => option.label}
        disabled={!form.eligibility.eligible_programme}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Degree"
            required
            error={Boolean(fieldErrors["eligibility.eligible_degree_ids"])}
            helperText={
              fieldErrors["eligibility.eligible_degree_ids"] ??
              "You can select one degree, multiple degrees, or All."
            }
          />
        )}
      />

      <Autocomplete
        multiple
        options={branchOptions}
        value={getSelectedOptions(
          branchOptions,
          form.eligibility.eligible_branch_ids
        )}
        onChange={(_, value) =>
          setForm((current) => ({
            ...current,
            eligibility: {
              ...current.eligibility,
              eligible_branch_ids: normalizeSelectionWithAll(
                value.map((item) => item.value)
              ),
            },
          }))
        }
        getOptionLabel={(option) => option.label}
        disabled={
          !form.eligibility.eligible_programme ||
          form.eligibility.eligible_degree_ids.length === 0
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Branches"
            required
            error={Boolean(fieldErrors["eligibility.eligible_branch_ids"])}
            helperText={
              fieldErrors["eligibility.eligible_branch_ids"] ??
              "Branch options depend on the selected programme and degrees. You can also choose All."
            }
          />
        )}
      />

      <JnfFormGrid>
        <TextField
          label="Minimum CGPA"
          required
          type="number"
          value={form.eligibility.minimum_cgpa}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                minimum_cgpa:
                  event.target.value === "" ? "" : Number(event.target.value),
              },
            }))
          }
          error={Boolean(fieldErrors["eligibility.minimum_cgpa"])}
          helperText={fieldErrors["eligibility.minimum_cgpa"]}
          fullWidth
        />

        <TextField
          select
          label="Active Backlogs Allowed"
          value={form.eligibility.active_backlog_allowed}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              eligibility: {
                ...current.eligibility,
                active_backlog_allowed:
                  event.target.value as JnfRecord["eligibility"]["active_backlog_allowed"],
                max_total_backlogs:
                  event.target.value === "yes"
                    ? current.eligibility.max_total_backlogs
                    : "",
              },
            }))
          }
          error={Boolean(fieldErrors["eligibility.active_backlog_allowed"])}
          helperText={fieldErrors["eligibility.active_backlog_allowed"]}
          fullWidth
        >
          {yesNoOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {form.eligibility.active_backlog_allowed === "yes" ? (
          <TextField
            label="Maximum Total Backlogs"
            type="number"
            value={form.eligibility.max_total_backlogs}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                eligibility: {
                  ...current.eligibility,
                  max_total_backlogs:
                    event.target.value === "" ? "" : Number(event.target.value),
                },
              }))
            }
            error={Boolean(fieldErrors["eligibility.max_total_backlogs"])}
            helperText={fieldErrors["eligibility.max_total_backlogs"]}
            fullWidth
          />
        ) : null}
      </JnfFormGrid>

      <TextField
        label="Eligibility Notes"
        value={form.eligibility.eligibility_notes}
        onChange={(event) =>
          setForm((current) => ({
            ...current,
            eligibility: {
              ...current.eligibility,
              eligibility_notes: event.target.value,
            },
          }))
        }
        multiline
        minRows={3}
        fullWidth
      />
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title="Eligibility and Courses"
      description="Define academic eligibility, programme, degree, and branch rules for this JNF."
    >
      {content}
    </SectionCard>
  );
}
