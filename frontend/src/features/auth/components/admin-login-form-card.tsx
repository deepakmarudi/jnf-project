"use client";

import { useState } from "react";

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
import { adminLoginContent } from "../data/admin-login-content";
import PasswordVisibilityIcon from "./password-visibility-icon";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginFormCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCaptchaValid =
    !captchaRequired ||
    captchaValue.trim().toUpperCase() === adminLoginContent.captchaCode;

  const handleCaptchaRequiredChange = (required: boolean) => {
    setCaptchaRequired(required);

    if (!required) {
      setCaptchaValue("");
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setFormError("Please enter your email and password.");
      return;
    }

    if (!isCaptchaValid) {
      setFormError("Please complete the captcha verification to continue.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
        role: "admin",
      });

      if (response?.error) {
        setFormError(response.error);
      } else if (response?.ok) {
        router.replace(routes.admin.dashboard);
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
        <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 360, mx: "auto" }} component="form" onSubmit={handleSubmit}>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4">{adminLoginContent.formTitle}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {adminLoginContent.formDescription}
            </Typography>
          </Stack>

          {formError ? <Alert severity="error">{formError}</Alert> : null}

          <Stack spacing={2}>
            <TextField
              label="Email Address"
              type="email"
              placeholder="admin@ism.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label={adminLoginContent.captchaLabel}
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
                    {adminLoginContent.captchaCode}
                  </Typography>
                </Box>

                <TextField
                  label={adminLoginContent.captchaInputLabel}
                  placeholder={adminLoginContent.captchaInputPlaceholder}
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
            disabled={!isCaptchaValid || isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="text" sx={{ px: 0 }}>
              Forgot Password
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
