import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type {
  RecruiterRegisterFormErrors,
  RecruiterRegisterFormValues,
} from "../types";
import RecruiterRegisterFormGrid from "./recruiter-register-form-grid";

type RecruiterRegisterRecruiterFieldsProps = Readonly<{
  form: RecruiterRegisterFormValues;
  errors: RecruiterRegisterFormErrors;
  onFieldChange: <K extends keyof RecruiterRegisterFormValues>(
    field: K,
    value: RecruiterRegisterFormValues[K]
  ) => void;
}>;

export default function RecruiterRegisterRecruiterFields({
  form,
  errors,
  onFieldChange,
}: RecruiterRegisterRecruiterFieldsProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Recruiter Details</Typography>

      <RecruiterRegisterFormGrid>
        <TextField
          label="Full Name"
          required
          value={form.full_name}
          onChange={(event) => onFieldChange("full_name", event.target.value)}
          error={Boolean(errors.full_name)}
          helperText={errors.full_name}
          fullWidth
        />

        <TextField
          label="Designation"
          required
          value={form.designation}
          onChange={(event) => onFieldChange("designation", event.target.value)}
          error={Boolean(errors.designation)}
          helperText={errors.designation}
          fullWidth
        />

        <TextField
          label="Official Email Address"
          type="email"
          required
          value={form.email}
          onChange={(event) => onFieldChange("email", event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          label="Mobile Number"
          required
          value={form.mobile_number}
          onChange={(event) =>
            onFieldChange("mobile_number", event.target.value)
          }
          error={Boolean(errors.mobile_number)}
          helperText={errors.mobile_number}
          fullWidth
        />

        <TextField
          label="Alternative Mobile Number"
          value={form.alternative_mobile}
          onChange={(event) =>
            onFieldChange("alternative_mobile", event.target.value)
          }
          error={Boolean(errors.alternative_mobile)}
          helperText={errors.alternative_mobile}
          fullWidth
        />

        <Box />
      </RecruiterRegisterFormGrid>
    </Stack>
  );
}
