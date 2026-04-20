import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { instituteWebsiteUrl } from "../data/home-content";

type PortalHomeHeroProps = Readonly<{
  onAccessClick: () => void;
}>;

export default function PortalHomeHero({
  onAccessClick,
}: PortalHomeHeroProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        mt: 0,
        minHeight: { xs: 480, md: 560 }, // Increased slightly for better hero impact
        display: "flex",
        alignItems: "center",
        backgroundColor: "#15345f",
      }}
    >
      <Image
        src="/iitism-cover.gif"
        alt="IIT (ISM) Dhanbad campus"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(10,20,36,0.86) 0%, rgba(10,20,36,0.62) 45%, rgba(10,20,36,0.28) 100%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          spacing={2.25}
          sx={{
            maxWidth: 720,
            py: { xs: 6, md: 8 },
          }}
        >
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.74)",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          Campus Hiring Portal
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.25rem", md: "3.85rem" },
            lineHeight: 1.05,
            color: "common.white",
          }}
        >
          Welcome to the JNF Portal of IIT (ISM) Dhanbad
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 620,
            color: "rgba(255,255,255,0.84)",
            fontSize: { xs: "1rem", md: "1.05rem" },
          }}
        >
          A simple and professional platform for recruiters and placement office
          users to manage registration, company details, and Job Notification
          Form submissions.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ pt: 1 }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onAccessClick}
          >
            Login / Register
          </Button>
          <Button
            component="a"
            href={instituteWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            variant="text"
            sx={{ color: "common.white", alignSelf: "flex-start" }}
          >
            Visit Institute Website
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
  );
}
