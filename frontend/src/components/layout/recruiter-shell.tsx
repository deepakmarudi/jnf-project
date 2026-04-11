"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatusChip from "@/components/ui/status-chip";
import { routes } from "@/lib/routes";

type RecruiterShellProps = Readonly<{
  children: React.ReactNode;
}>;

const recruiterNavItems = [
  { label: "Dashboard", href: routes.recruiter.dashboard },
  { label: "Company Profile", href: routes.recruiter.company },
  { label: "JNF Workspace", href: routes.recruiter.jnfs },
];

export default function RecruiterShell({ children }: RecruiterShellProps) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f5efe8 0%, #fffaf7 34%, #f6efe9 100%)",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(120deg, rgba(122,11,20,1) 0%, rgba(96,8,16,1) 100%)",
          color: "primary.contrastText",
          py: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Stack spacing={0.75}>
              <Typography
                variant="overline"
                sx={{ color: "rgba(255,255,255,0.8)", letterSpacing: "0.14em" }}
              >
                Recruiter workspace
              </Typography>
              <Typography variant="h4" sx={{ color: "inherit" }}>
                JNF Portal
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.84)" }}>
                Public-to-recruiter flow preview built on the shared frontend
                architecture.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <StatusChip status="active" />
              <Button
                component={Link}
                href={routes.public.home}
                variant="outlined"
                sx={{
                  color: "primary.contrastText",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                Back to public portal
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", lg: "280px minmax(0, 1fr)" },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              position: { lg: "sticky" },
              top: { lg: 120 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
              backgroundColor: "background.paper",
              p: 2,
              boxShadow: "0 18px 42px rgba(89, 40, 18, 0.08)",
            }}
          >
            <Stack spacing={1}>
              {recruiterNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== routes.recruiter.dashboard &&
                    pathname.startsWith(item.href));

                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    variant={isActive ? "contained" : "text"}
                    color={isActive ? "primary" : "inherit"}
                    sx={{
                      justifyContent: "flex-start",
                      px: 1.5,
                      color: isActive ? undefined : "text.primary",
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          <Box>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}
