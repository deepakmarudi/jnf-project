import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type {
  RecruiterRegisterFormErrors,
  RecruiterRegisterFormValues,
} from "../types";
import PasswordVisibilityIcon from "./password-visibility-icon";
import RecruiterRegisterFormGrid from "./recruiter-register-form-grid";

type RecruiterRegisterPasswordFieldsProps = Readonly<{
  form: RecruiterRegisterFormValues;
  errors: RecruiterRegisterFormErrors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onFieldChange: <K extends keyof RecruiterRegisterFormValues>(
    field: K,
    value: RecruiterRegisterFormValues[K]
  ) => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
}>;

export default function RecruiterRegisterPasswordFields({
  form,
  errors,
  showPassword,
  showConfirmPassword,
  onFieldChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
}: RecruiterRegisterPasswordFieldsProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Set Password</Typography>

      <RecruiterRegisterFormGrid>
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(event) => onFieldChange("password", event.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password ?? "Use at least 8 characters."}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={onTogglePasswordVisibility}
                >
                  <PasswordVisibilityIcon visible={showPassword} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirm_password}
          onChange={(event) =>
            onFieldChange("confirm_password", event.target.value)
          }
          error={Boolean(errors.confirm_password)}
          helperText={errors.confirm_password}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={onToggleConfirmPasswordVisibility}
                >
                  <PasswordVisibilityIcon visible={showConfirmPassword} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </RecruiterRegisterFormGrid>
    </Stack>
  );
}
