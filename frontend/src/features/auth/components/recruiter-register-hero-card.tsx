import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { recruiterRegisterContent } from "../data/recruiter-register-content";

export default function RecruiterRegisterHeroCard() {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        minHeight: { xs: 360, md: 460 },
        backgroundColor: "#ffffff",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 4 },
          py: { xs: 4, md: 5 },
          maxWidth: 420,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box
            sx={{
              position: "relative",
              width: { xs: 130, md: 170 },
              height: { xs: 130, md: 170 },
            }}
          >
            <Image
              src="/iitism-logo.svg"
              alt="IIT (ISM) Dhanbad logo"
              fill
              sizes="170px"
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Stack spacing={0.5} alignItems="center">
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              {recruiterRegisterContent.eyebrow}
            </Typography>
            <Typography variant="h4">
              {recruiterRegisterContent.heroTitle}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: 420 }}
        >
          {recruiterRegisterContent.heroDescription}
        </Typography>

        <Stack spacing={1.25} alignItems="center">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {recruiterRegisterContent.organizationName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {recruiterRegisterContent.supportDescription}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
