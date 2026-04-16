"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearRecruiterSession } from "@/features/auth/lib/mock-auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Dashboard", href: routes.recruiter.dashboard },
  { label: "Company", href: routes.recruiter.company },
  { label: "JNFs", href: routes.recruiter.jnfs },
  { label: "New JNF", href: routes.recruiter.newJnf },
] as const;

function isNavItemActive(pathname: string, href: string) {
  if (href === routes.recruiter.dashboard) {
    return pathname === href;
  }

  if (href === routes.recruiter.company) {
    return pathname === href;
  }

  if (href === routes.recruiter.jnfs) {
    return (
      pathname.startsWith(routes.recruiter.jnfs) &&
      pathname !== routes.recruiter.newJnf
    );
  }

  if (href === routes.recruiter.newJnf) {
    return pathname === routes.recruiter.newJnf;
  }

  return pathname.startsWith(href);
}

export default function RecruiterSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearRecruiterSession();
    router.replace(routes.public.home);
  }

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        overflowY: "auto",
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 700 }}>
            Recruiter Portal
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            IIT (ISM) Dhanbad
          </Typography>
        </Stack>

        <Stack spacing={1}>
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);

            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                variant={isActive ? "contained" : "text"}
                color={isActive ? "primary" : "inherit"}
                sx={{
                  justifyContent: "flex-start",
                  fontSize: "1rem",
                  fontWeight: 600,
                  py: 1.2,
                  px: 1.5,
                  borderRadius: 2,
                  color: isActive ? "primary.contrastText" : "text.primary",
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ pt: 3 }}>
        <Divider />
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="inherit"
          sx={{
            justifyContent: "flex-start",
            fontSize: "1rem",
            fontWeight: 600,
            py: 1.2,
            px: 1.5,
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
