"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";
import { recruiterRegisterContent } from "../data/recruiter-register-content";
import {
  getRecruiterLandingPath,
  registerRecruiter,
} from "../lib/mock-auth";
import {
  initialRecruiterRegisterFormValues,
  type RecruiterRegisterFormErrors,
  type RecruiterRegisterFormValues,
} from "../types";
import PasswordVisibilityIcon from "./password-visibility-icon";

function validateRecruiterRegisterForm(
  values: RecruiterRegisterFormValues
): RecruiterRegisterFormErrors {
  const errors: RecruiterRegisterFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Official email address is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Please confirm your password.";
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = "Passwords do not match.";
  }

  return errors;
}

export default function RecruiterRegisterFormCard() {
  const router = useRouter();

  const [form, setForm] = useState<RecruiterRegisterFormValues>(
    initialRecruiterRegisterFormValues
  );
  const [errors, setErrors] = useState<RecruiterRegisterFormErrors>({});
  const [formError, setFormError] = useState("");
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
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setFormError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateRecruiterRegisterForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const result = registerRecruiter({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    if (!result.ok) {
      setFormError(result.message);
      setIsSubmitting(false);
      return;
    }

    router.replace(getRecruiterLandingPath(result.session));
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
          sx={{ width: "100%", maxWidth: 380, mx: "auto" }}
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

          <Stack spacing={2}>
            <TextField
              label="Full Name"
              required
              placeholder="Enter recruiter full name"
              value={form.name}
              onChange={(event) =>
                handleFieldChange("name", event.target.value)
              }
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
            />

            <TextField
              label="Official Email Address"
              type="email"
              required
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
              required
              placeholder="Create a password"
              value={form.password}
              onChange={(event) =>
                handleFieldChange("password", event.target.value)
              }
              error={Boolean(errors.password)}
              helperText={errors.password ?? recruiterRegisterContent.passwordHint}
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

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm your password"
              value={form.confirm_password}
              onChange={(event) =>
                handleFieldChange("confirm_password", event.target.value)
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
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                    >
                      <PasswordVisibilityIcon visible={showConfirmPassword} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Alert severity="info">
            {recruiterRegisterContent.postRegistrationNote}
          </Alert>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            fullWidth
            disabled={isSubmitting}
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
