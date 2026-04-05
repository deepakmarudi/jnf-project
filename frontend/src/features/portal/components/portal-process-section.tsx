import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PortalProcessStep } from "../types";
import PortalSectionHeading from "./portal-section-heading";

type PortalProcessSectionProps = Readonly<{
  steps: PortalProcessStep[];
}>;

export default function PortalProcessSection({
  steps,
}: PortalProcessSectionProps) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <PortalSectionHeading
            eyebrow="Recruitment Process"
            title="A clear process for recruiter engagement and review."
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {steps.map((step) => (
              <Box
                key={step.step}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="overline"
                    sx={{ color: "secondary.main", fontWeight: 700 }}
                  >
                    Step {step.step}
                  </Typography>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {step.description}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
