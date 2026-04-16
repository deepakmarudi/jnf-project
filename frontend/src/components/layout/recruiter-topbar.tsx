"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { routes } from "@/lib/routes";

export default function RecruiterTopbar() {
  const session = useRecruiterSession();
  const recruiterName = session?.recruiter_name?.trim() || "Recruiter";
  const recruiterEmail = session?.recruiter_email?.trim() || "";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        px: 3,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack spacing={0.25}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Recruiter Workspace
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Company and JNF management
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Stack spacing={0.15} sx={{ textAlign: "right" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {recruiterName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {recruiterEmail || "Recruiter session active"}
            </Typography>
          </Stack>

          <Button
            component={Link}
            href={routes.recruiter.newJnf}
            variant="contained"
            sx={{
              fontSize: "0.95rem",
              fontWeight: 600,
              px: 2,
              py: 1,
            }}
          >
            + New JNF
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
