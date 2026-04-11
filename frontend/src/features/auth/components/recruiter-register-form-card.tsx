"use client";

import { useState } from "react";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

export default function RecruiterRegisterFormCard() {
  const [showHint, setShowHint] = useState(false);

  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Company registration</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Register your recruiting organization and primary contact to start
              the recruiter onboarding workflow.
            </Typography>
          </Stack>

          {showHint && (
            <Alert severity="info">
              Frontend registration UI is ready. Connect this form to the
              backend register endpoint in the API integration step.
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              setShowHint(true);
            }}
          >
            <Stack spacing={2}>
              <TextField label="Recruiter name" fullWidth />
              <TextField label="Designation" fullWidth />
              <TextField label="Recruiter email" type="email" fullWidth />
              <TextField label="Mobile number" fullWidth />
              <TextField label="Company name" fullWidth />
              <TextField label="Company website" fullWidth />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button type="submit" variant="contained" size="large">
                  Submit registration
                </Button>
                <Button
                  component={Link}
                  href={routes.public.login}
                  variant="outlined"
                  size="large"
                >
                  Back to login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
