import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

const quickLinks = [
  { label: "Recruiter Login", href: routes.public.login },
  { label: "Register Company", href: routes.public.register },
];

export default function PublicFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: { xs: 6, md: 8 },
        background:
          "linear-gradient(135deg, rgba(122,11,20,1) 0%, rgba(92,7,15,1) 100%)",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.5fr) minmax(0, 1fr)",
            },
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ color: "inherit" }}>
              IIT (ISM) Dhanbad Placement Portal
            </Typography>
            <Typography sx={{ maxWidth: 620, color: "rgba(255,255,255,0.84)" }}>
              Recruiter access for company registration, login, and placement
              coordination through the Career Development Centre.
            </Typography>

            <Stack spacing={0.75}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Career Development Centre
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.84)" }}>
                Dhanbad - 826004, Jharkhand, India
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.84)" }}>
                Phone: +91-326-223-5803
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.84)" }}>
                Email: cdc@iitism.ac.in
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="h5" sx={{ color: "inherit" }}>
              Quick links
            </Typography>
            {quickLinks.map((link) => (
              <Typography
                key={link.label}
                component={Link}
                href={link.href}
                sx={{
                  width: "fit-content",
                  color: "rgba(255,255,255,0.86)",
                  transition: "color 160ms ease",
                  "&:hover": {
                    color: "secondary.light",
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
