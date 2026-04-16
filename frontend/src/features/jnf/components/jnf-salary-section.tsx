import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import {
  createEmptyJnfSalaryBreakup,
  type JnfRecord,
} from "../types";
import JnfFormGrid from "./jnf-form-grid";

type JnfSalarySectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
}>;

const currencyOptions = ["INR", "USD", "EUR"] as const;

function createDefaultSalaryRow() {
  return {
    ...createEmptyJnfSalaryBreakup(),
    id: "default_salary_row",
    course_id: "all_courses",
  };
}

export default function JnfSalarySection({
  form,
  setForm,
  fieldErrors,
}: JnfSalarySectionProps) {
  useEffect(() => {
    if (form.salary_details.salary_rows.length > 0) {
      return;
    }

    setForm((current) => ({
      ...current,
      salary_details: {
        ...current.salary_details,
        salary_mode: "same_for_all",
        same_for_all_courses: true,
        salary_rows: [createDefaultSalaryRow()],
      },
    }));
  }, [form.salary_details.salary_rows.length, setForm]);

  const salaryRow =
    form.salary_details.salary_rows[0] ?? createDefaultSalaryRow();

  function handleUpdateSalaryField(
    field: keyof typeof salaryRow,
    value: string | number | ""
  ) {
    setForm((current) => ({
      ...current,
      salary_details: {
        ...current.salary_details,
        salary_mode: "same_for_all",
        same_for_all_courses: true,
        salary_rows: [
          {
            ...(current.salary_details.salary_rows[0] ?? createDefaultSalaryRow()),
            [field]: value,
          },
        ],
      },
    }));
  }

  return (
    <SectionCard
      title="Salary Details"
      description="Use one common salary structure for all eligible candidates in this JNF."
    >
      <Stack spacing={2.5}>
        <JnfFormGrid>
          <TextField
            select
            label="Currency"
            required
            value={form.salary_details.currency}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                salary_details: {
                  ...current.salary_details,
                  currency: event.target.value,
                  salary_mode: "same_for_all",
                  same_for_all_courses: true,
                },
              }))
            }
            error={Boolean(fieldErrors["salary.currency"])}
            helperText={fieldErrors["salary.currency"]}
            fullWidth
          >
            {currencyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Applicable Candidates"
            value="All selected eligible candidates"
            disabled
            fullWidth
          />

          <TextField
            label="CTC"
            required
            type="number"
            value={salaryRow.ctc}
            onChange={(event) =>
              handleUpdateSalaryField(
                "ctc",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            error={Boolean(fieldErrors["salary.ctc"])}
            helperText={fieldErrors["salary.ctc"]}
            fullWidth
          />

          <TextField
            label="Gross Salary"
            required
            type="number"
            value={salaryRow.gross_salary}
            onChange={(event) =>
              handleUpdateSalaryField(
                "gross_salary",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            error={Boolean(fieldErrors["salary.gross_salary"])}
            helperText={fieldErrors["salary.gross_salary"]}
            fullWidth
          />

          <TextField
            label="Base Salary"
            required
            type="number"
            value={salaryRow.base_salary}
            onChange={(event) =>
              handleUpdateSalaryField(
                "base_salary",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            error={Boolean(fieldErrors["salary.base_salary"])}
            helperText={fieldErrors["salary.base_salary"]}
            fullWidth
          />

          <TextField
            label="Variable Pay"
            type="number"
            value={salaryRow.variable_pay}
            onChange={(event) =>
              handleUpdateSalaryField(
                "variable_pay",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Joining Bonus"
            type="number"
            value={salaryRow.joining_bonus}
            onChange={(event) =>
              handleUpdateSalaryField(
                "joining_bonus",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Retention Bonus"
            type="number"
            value={salaryRow.retention_bonus}
            onChange={(event) =>
              handleUpdateSalaryField(
                "retention_bonus",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Performance Bonus"
            type="number"
            value={salaryRow.performance_bonus}
            onChange={(event) =>
              handleUpdateSalaryField(
                "performance_bonus",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="ESOPs"
            type="number"
            value={salaryRow.esops}
            onChange={(event) =>
              handleUpdateSalaryField(
                "esops",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Stipend"
            type="number"
            value={salaryRow.stipend}
            onChange={(event) =>
              handleUpdateSalaryField(
                "stipend",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />

          <TextField
            label="Bond Amount"
            type="number"
            value={salaryRow.bond_amount}
            onChange={(event) =>
              handleUpdateSalaryField(
                "bond_amount",
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
            fullWidth
          />
        </JnfFormGrid>

        <TextField
          label="Benefits and Perks"
          value={form.salary_details.benefits_and_perks}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              salary_details: {
                ...current.salary_details,
                benefits_and_perks: event.target.value,
                salary_mode: "same_for_all",
                same_for_all_courses: true,
              },
            }))
          }
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          label="Deductions or Notes"
          value={salaryRow.deductions_or_notes}
          onChange={(event) =>
            handleUpdateSalaryField("deductions_or_notes", event.target.value)
          }
          multiline
          minRows={3}
          fullWidth
        />

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This version uses one common salary structure for all eligible candidates.
        </Typography>
      </Stack>
    </SectionCard>
  );
}
