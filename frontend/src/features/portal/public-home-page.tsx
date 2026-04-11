import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PublicShell from "@/components/layout/public-shell";
import { routes } from "@/lib/routes";

export default function PublicHomePage() {
  return (
    <PublicShell>
      <Box
        sx={{
          minHeight: { xs: "calc(100vh - 260px)", md: "calc(100vh - 300px)" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px 360px" },
            alignItems: "stretch",
          }}
        >
          <Stack spacing={2.5} sx={{ pr: { lg: 4 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "0.14em",
              }}
            >
              Recruiter access
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                maxWidth: 700,
              }}
            >
              Access the recruiter portal.
            </Typography>
            <Typography
              sx={{
                maxWidth: 620,
                fontSize: { xs: "1rem", md: "1.08rem" },
                color: "text.secondary",
              }}
            >
              This public page is only the entry point for recruiters. Use login
              if your organization already has access, or register to begin the
              onboarding process with the Career Development Centre.
            </Typography>
          </Stack>

          <Card
            sx={{
              borderRadius: 5,
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 22px 48px rgba(91, 36, 15, 0.14)",
              },
            }}
          >
            <CardContent
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h4" color="primary.main">
                  Login
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Continue with your existing recruiter account to manage the
                  company profile, JNFs, and review status.
                </Typography>
              </Stack>

              <Button
                component={Link}
                href={routes.public.login}
                variant="contained"
                size="large"
              >
                Open login
              </Button>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 5,
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 22px 48px rgba(91, 36, 15, 0.14)",
              },
            }}
          >
            <CardContent
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h4" color="primary.main">
                  Registration
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Register your organization and primary recruiter contact to
                  begin the university placement onboarding process.
                </Typography>
              </Stack>

              <Button
                component={Link}
                href={routes.public.register}
                variant="outlined"
                size="large"
              >
                Open registration
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </PublicShell>
  );
}
