"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PublicShell from "@/components/layout/public-shell";

export default function AdminLoginPage() {
  const [showHint, setShowHint] = useState(false);

  return (
    <PublicShell>
      <Box sx={{ maxWidth: 560, mx: "auto" }}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h4">Admin login</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  This public-facing route is reserved for placement office
                  administrators and review coordinators.
                </Typography>
              </Stack>

              {showHint && (
                <Alert severity="info">
                  Admin login UI is ready. Connect it to the admin auth endpoint
                  in the backend integration step.
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
                  <TextField label="Admin email" type="email" fullWidth />
                  <TextField label="Password" type="password" fullWidth />
                  <Button type="submit" variant="contained" size="large">
                    Sign in as admin
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </PublicShell>
  );
}
