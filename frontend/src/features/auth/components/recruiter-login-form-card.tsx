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

export default function RecruiterLoginFormCard() {
  const [showHint, setShowHint] = useState(false);

  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Recruiter login</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Use your recruiter credentials to access the company profile, JNF
              workspace, and submission tracking area.
            </Typography>
          </Stack>

          {showHint && (
            <Alert severity="info">
              Frontend login UI is ready. Wire this form to the backend login
              endpoint when you move to auth integration.
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
              <TextField
                label="Recruiter email"
                type="email"
                placeholder="recruiter@company.com"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button type="submit" variant="contained" size="large">
                  Sign in
                </Button>
                <Button
                  component={Link}
                  href={routes.recruiter.dashboard}
                  variant="outlined"
                  size="large"
                >
                  Open dashboard preview
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Typography sx={{ color: "text.secondary" }}>
            Need access?{" "}
            <Typography
              component={Link}
              href={routes.public.register}
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              Register your company
            </Typography>
            .
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
