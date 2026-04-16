"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";
import { recruiterLoginContent } from "../data/recruiter-login-content";
import { signIn } from "next-auth/react";
import {
  initialRecruiterLoginFormValues,
  type RecruiterLoginFormErrors,
  type RecruiterLoginFormValues,
} from "../types";
import PasswordVisibilityIcon from "./password-visibility-icon";

function validateRecruiterLoginForm(
  values: RecruiterLoginFormValues
): RecruiterLoginFormErrors {
  const errors: RecruiterLoginFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  return errors;
}

export default function RecruiterLoginFormCard() {
  const router = useRouter();

  const [form, setForm] = useState<RecruiterLoginFormValues>(
    initialRecruiterLoginFormValues
  );
  const [errors, setErrors] = useState<RecruiterLoginFormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

  const isCaptchaValid =
    captchaRequired &&
    captchaValue.trim().toUpperCase() === recruiterLoginContent.captchaCode;

  function handleFieldChange<K extends keyof RecruiterLoginFormValues>(
    field: K,
    value: RecruiterLoginFormValues[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setFormError("");
  }

  function handleCaptchaRequiredChange(required: boolean) {
    setCaptchaRequired(required);
    setFormError("");

    if (!required) {
      setCaptchaValue("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateRecruiterLoginForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("");
      return;
    }

    if (!captchaRequired || !isCaptchaValid) {
      setFormError("Please complete the captcha verification to continue.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: form.email.trim(),
        password: form.password,
        role: "recruiter",
      });

      if (response?.error) {
        setFormError(response.error);
      } else if (response?.ok) {
        router.replace(routes.recruiter.company);
      }
    } catch {
      setFormError("Unable to sign in right now.");
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
          spacing={2.5}
          sx={{ width: "100%", maxWidth: 360, mx: "auto" }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4">{recruiterLoginContent.formTitle}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {recruiterLoginContent.formDescription}
            </Typography>
          </Stack>

          {formError ? <Alert severity="error">{formError}</Alert> : null}

          <Stack spacing={2}>
            <TextField
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(event) =>
                handleFieldChange("email", event.target.value)
              }
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(event) =>
                handleFieldChange("password", event.target.value)
              }
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      <PasswordVisibilityIcon visible={showPassword} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={captchaRequired}
                  onChange={(event) =>
                    handleCaptchaRequiredChange(event.target.checked)
                  }
                />
              }
              label={recruiterLoginContent.captchaLabel}
              sx={{ mx: 0, justifyContent: "center" }}
            />

            {captchaRequired ? (
              <Stack spacing={1.25}>
                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                    backgroundColor: "#f8fafc",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      letterSpacing: "0.28em",
                      color: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    {recruiterLoginContent.captchaCode}
                  </Typography>
                </Box>

                <TextField
                  label={recruiterLoginContent.captchaInputLabel}
                  placeholder={recruiterLoginContent.captchaInputPlaceholder}
                  value={captchaValue}
                  onChange={(event) => setCaptchaValue(event.target.value)}
                  fullWidth
                />
              </Stack>
            ) : null}
          </Stack>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Button variant="text" sx={{ px: 0 }} disabled>
              Forgot Password
            </Button>
            <Button
              component={Link}
              href={routes.public.register}
              variant="text"
              sx={{ px: 0 }}
            >
              New recruiter? Register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
