"use client";

import Link from "next/link";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

export default function AdminDashboardHeader() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      sx={{
        px: { xs: 2, md: 2.5 },
        py: 1.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#ffffff",
        boxShadow: "0 8px 24px rgba(16,35,61,0.05)",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Button
          variant="text"
          onClick={() => {
            window.history.back();
          }}
          sx={{ px: 0 }}
        >
          Back
        </Button>
        <Button
          component={Link}
          href={routes.public.home}
          variant="text"
          sx={{ px: 0 }}
        >
          Home
        </Button>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Welcome back, Admin 👋
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Manage recruiters, companies & JNFs
        </Typography>
      </Stack>

      <Button variant="outlined" sx={{ px: 2 }}>
        Logout
      </Button>
    </Stack>
  );
}
