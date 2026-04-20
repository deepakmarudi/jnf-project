import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";

export default function PortalFooter() {
  const footerBgColor = "#720000"; // Official IIT ISM Maroon

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: footerBgColor,
        color: "white",
        py: { xs: 5, md: 7 },
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 5, md: 8 }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left Side: Logo & Contact */}
          <Stack spacing={4} sx={{ maxWidth: { md: 600 } }}>
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Box sx={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
                <Image
                  src="/iitism-logo.svg"
                  alt="IIT (ISM) Dhanbad Logo"
                  fill
                  style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                />
              </Box>
              <Stack spacing={0.25}>
                <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "1.15rem" }}>
                  Indian Institute of Technology<br />
                  (Indian School of Mines)
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Dhanbad - 826004, Jharkhand, India.
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                CDC
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Phone: +91-326-223-5803 (O)
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Email: cdc@iitism.ac.in
              </Typography>
            </Stack>
          </Stack>

          {/* Right Side: Quick Links */}
          <Stack spacing={2.5} sx={{ minWidth: { md: 200 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              Quick links
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="https://www.iitism.ac.in/"
                target="_blank"
                rel="noreferrer"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.95rem", opacity: 0.85, "&:hover": { opacity: 1 } }}
              >
                IITISM Home
              </Link>
              <Link
                href="https://www.iitism.ac.in/index.php/Links/how_to_reach"
                target="_blank"
                rel="noreferrer"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.95rem", opacity: 0.85, "&:hover": { opacity: 1 } }}
              >
                How to reach
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
