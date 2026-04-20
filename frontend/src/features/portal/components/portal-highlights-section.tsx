import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PortalHighlight } from "../types";
import PortalSectionHeading from "./portal-section-heading";

type PortalHighlightsSectionProps = Readonly<{
  highlights: PortalHighlight[];
}>;

export default function PortalHighlightsSection({
  highlights,
}: PortalHighlightsSectionProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "320px minmax(0, 1fr)" },
        gap: 3,
        alignItems: "start",
      }}
    >
      <PortalSectionHeading
        eyebrow="Why Recruit At IIT (ISM)"
        title="A strong academic and professional talent base for industry roles."
        description="The institute offers a structured environment for recruiters to connect with students through an official and reliable process."
        maxWidth="100%"
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {highlights.map((highlight) => (
          <Card key={highlight.title} sx={{ borderRadius: 3, height: "100%" }}>
            <Box sx={{ p: 3 }}>
              <Stack spacing={1.25}>
                <Typography variant="h5">{highlight.title}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {highlight.description}
                </Typography>
              </Stack>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
