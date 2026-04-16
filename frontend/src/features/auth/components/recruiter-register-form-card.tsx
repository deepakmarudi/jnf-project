"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";
import { recruiterRegisterContent } from "../data/recruiter-register-content";
import {
  registerRecruiter,
  sendRecruiterOtp,
  verifyRecruiterOtp,
} from "../lib/auth-api";
import { normalizeRecruiterRegisterCompanyPayload } from "../lib/recruiter-register-mappers";
import {
  isRecruiterRegisterEmailValid,
  validateRecruiterRegisterForm,
} from "../lib/recruiter-register-validation";
import {
  initialRecruiterRegisterFormValues,
  type RecruiterRegisterCompanyValues,
  type RecruiterRegisterFormErrors,
  type RecruiterRegisterFormValues,
} from "../types";
import RecruiterRegisterCompanyFields from "./recruiter-register-company-fields";
import RecruiterRegisterOtpSection from "./recruiter-register-otp-section";
import RecruiterRegisterPasswordFields from "./recruiter-register-password-fields";
import RecruiterRegisterRecruiterFields from "./recruiter-register-recruiter-fields";

function setCompanyFieldError(
  currentErrors: RecruiterRegisterFormErrors,
  field: keyof RecruiterRegisterCompanyValues
) {
  return {
    ...currentErrors,
    company: {
      ...currentErrors.company,
      [field]: undefined,
    },
  };
}

export default function RecruiterRegisterFormCard() {
  const router = useRouter();

  const [form, setForm] = useState<RecruiterRegisterFormValues>(
    initialRecruiterRegisterFormValues
  );
  const [errors, setErrors] = useState<RecruiterRegisterFormErrors>({});
  const [formError, setFormError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleFieldChange<K extends keyof RecruiterRegisterFormValues>(
    field: K,
    value: RecruiterRegisterFormValues[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "email" ? { otp_verified: false, otp_code: "" } : {}),
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    setFormError("");

    if (field === "email") {
      setOtpMessage("");
    }
  }

  function handleCompanyFieldChange<K extends keyof RecruiterRegisterCompanyValues>(
    field: K,
    value: RecruiterRegisterCompanyValues[K]
  ) {
    setForm((current) => ({
      ...current,
      company: {
        ...current.company,
        [field]: value,
      },
    }));

    setErrors((current) => setCompanyFieldError(current, field));
    setFormError("");
  }

  async function handleSendOtp() {
    if (!form.email.trim()) {
      setErrors((current) => ({
        ...current,
        email: "Official email address is required before sending OTP.",
      }));
      return;
    }

    if (!isRecruiterRegisterEmailValid(form.email)) {
      setErrors((current) => ({
        ...current,
        email: "Enter a valid email address.",
      }));
      return;
    }

    setIsSendingOtp(true);
    setFormError("");
    setOtpMessage("");

    try {
      await sendRecruiterOtp({
        recruiter_email: form.email.trim(),
      });

      setForm((current) => ({
        ...current,
        otp_verified: false,
      }));
      setOtpMessage("OTP sent to your official email address.");
    } catch (error) {
      const apiError = error as { message?: string };
      setFormError(apiError.message ?? "Unable to send OTP right now.");
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (!form.otp_code.trim()) {
      setErrors((current) => ({
        ...current,
        otp_code: "Enter the OTP sent to your email.",
      }));
      return;
    }

    setIsVerifyingOtp(true);
    setFormError("");
    setOtpMessage("");

    try {
      await verifyRecruiterOtp({
        recruiter_email: form.email.trim(),
        otp_code: form.otp_code.trim(),
      });

      setForm((current) => ({
        ...current,
        otp_verified: true,
      }));
      setErrors((current) => ({
        ...current,
        otp_code: undefined,
      }));
      setOtpMessage("Email verified successfully. You can now create the account.");
    } catch (error) {
      const apiError = error as { message?: string };
      setForm((current) => ({
        ...current,
        otp_verified: false,
      }));
      setFormError(apiError.message ?? "OTP verification failed.");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateRecruiterRegisterForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await registerRecruiter({
        full_name: form.full_name.trim(),
        designation: form.designation.trim(),
        email: form.email.trim(),
        mobile_number: form.mobile_number.trim(),
        alternative_mobile: form.alternative_mobile.trim(),
        password: form.password,
        confirm_password: form.confirm_password,
        company: normalizeRecruiterRegisterCompanyPayload(form.company),
      });

      router.replace(routes.public.login);
    } catch (error) {
      const apiError = error as { message?: string };
      setFormError(apiError.message ?? "Unable to create recruiter account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <Box
        sx={{
          height: "100%",
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          component="form"
          spacing={3}
          sx={{ width: "100%", maxWidth: 760, mx: "auto" }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              {recruiterRegisterContent.formTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {recruiterRegisterContent.formDescription}
            </Typography>
          </Stack>

          {formError ? <Alert severity="error">{formError}</Alert> : null}
          {otpMessage ? <Alert severity="success">{otpMessage}</Alert> : null}

          <RecruiterRegisterRecruiterFields
            form={form}
            errors={errors}
            onFieldChange={handleFieldChange}
          />

          <Divider />

          <RecruiterRegisterOtpSection
            form={form}
            errors={errors}
            isSendingOtp={isSendingOtp}
            isVerifyingOtp={isVerifyingOtp}
            onFieldChange={handleFieldChange}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleVerifyOtp}
          />

          <Divider />

          <RecruiterRegisterCompanyFields
            form={form}
            errors={errors}
            onCompanyFieldChange={handleCompanyFieldChange}
          />

          <Divider />

          <RecruiterRegisterPasswordFields
            form={form}
            errors={errors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onFieldChange={handleFieldChange}
            onTogglePasswordVisibility={() =>
              setShowPassword((current) => !current)
            }
            onToggleConfirmPasswordVisibility={() =>
              setShowConfirmPassword((current) => !current)
            }
          />

          <Alert severity="info">
            {recruiterRegisterContent.postRegistrationNote}
          </Alert>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting || !form.otp_verified}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Already registered?
            </Typography>
            <Button
              component={Link}
              href={routes.public.login}
              variant="text"
              sx={{ px: 0 }}
            >
              Sign in to continue
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
