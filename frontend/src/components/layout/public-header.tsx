"use client";

import { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

type MenuState = {
  anchorEl: HTMLElement | null;
  key: "recruiters" | "team" | null;
};

const recruiterMenuItems = [
  { label: "Recruiter Login", href: routes.public.login },
  { label: "Register Company", href: routes.public.register },
];

const teamMenuItems = [
  { label: "Administration", href: `${routes.public.team}#administration` },
  { label: "Student Team", href: `${routes.public.team}#student-team` },
  { label: "Nucleus Team", href: `${routes.public.team}#nucleus-team` },
  { label: "Gallery", href: `${routes.public.team}#gallery` },
  { label: "Admin Login", href: routes.public.adminLogin },
];

export default function PublicHeader() {
  const [menuState, setMenuState] = useState<MenuState>({
    anchorEl: null,
    key: null,
  });

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    key: MenuState["key"]
  ) => {
    setMenuState({
      anchorEl: event.currentTarget,
      key,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      anchorEl: null,
      key: null,
    });
  };

  const activeMenuItems =
    menuState.key === "recruiters" ? recruiterMenuItems : teamMenuItems;

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(120deg, rgba(122,11,20,1) 0%, rgba(97,8,16,1) 100%)",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 96, md: 112 },
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.16em", opacity: 0.9 }}
              >
                Career Development Centre
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "inherit",
                }}
              >
                IIT (ISM) Dhanbad
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.15rem" },
                  fontStyle: "italic",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Legacy that inspires the future.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                component={Link}
                href={routes.public.login}
                variant="contained"
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
              >
                Recruiter Login
              </Button>
              <Button
                component={Link}
                href={routes.public.register}
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "primary.contrastText",
                }}
              >
                Register Company
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1, md: 0.5 }}
            alignItems={{ xs: "flex-start", md: "center" }}
            sx={{ py: { xs: 1.5, md: 0 } }}
          >
            <Button component={Link} href={routes.public.home} color="inherit">
              Home
            </Button>
            <Button
              component={Link}
              href="/#placement-statistics"
              color="inherit"
            >
              Placement Statistics
            </Button>
            <Button
              color="inherit"
              onClick={(event) => handleMenuOpen(event, "recruiters")}
            >
              For Recruiters
            </Button>
            <Button component={Link} href="/#student-engagement" color="inherit">
              For Students
            </Button>
            <Button
              color="inherit"
              onClick={(event) => handleMenuOpen(event, "team")}
            >
              Our Team
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Career Development Centre
          </Typography>
        </Toolbar>
      </Container>

      <Menu
        anchorEl={menuState.anchorEl}
        open={Boolean(menuState.anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 22px 48px rgba(68, 28, 11, 0.12)",
            },
          },
        }}
      >
        {activeMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            component={Link}
            href={item.href}
            onClick={handleMenuClose}
            sx={{
              py: 1.5,
              fontWeight: 600,
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
