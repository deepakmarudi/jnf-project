import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type {
  RecruiterRegisterFormErrors,
  RecruiterRegisterFormValues,
} from "../types";
import RecruiterRegisterFormGrid from "./recruiter-register-form-grid";

type RecruiterRegisterOtpSectionProps = Readonly<{
  form: RecruiterRegisterFormValues;
  errors: RecruiterRegisterFormErrors;
  isSendingOtp: boolean;
  isVerifyingOtp: boolean;
  onFieldChange: <K extends keyof RecruiterRegisterFormValues>(
    field: K,
    value: RecruiterRegisterFormValues[K]
  ) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;
}>;

export default function RecruiterRegisterOtpSection({
  form,
  errors,
  isSendingOtp,
  isVerifyingOtp,
  onFieldChange,
  onSendOtp,
  onVerifyOtp,
}: RecruiterRegisterOtpSectionProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Email Verification</Typography>

      <RecruiterRegisterFormGrid>
        <TextField
          label="OTP Code"
          value={form.otp_code}
          onChange={(event) => onFieldChange("otp_code", event.target.value)}
          error={Boolean(errors.otp_code)}
          helperText={
            errors.otp_code ??
            (form.otp_verified
              ? "Email verified successfully."
              : "Send OTP to your email, then enter it here.")
          }
          fullWidth
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onSendOtp}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={onVerifyOtp}
            disabled={isVerifyingOtp || !form.otp_code.trim()}
          >
            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
          </Button>
        </Stack>
      </RecruiterRegisterFormGrid>
    </Stack>
  );
}
