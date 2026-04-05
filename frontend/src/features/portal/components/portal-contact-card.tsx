import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PortalContactDetails } from "../types";

type PortalContactCardProps = Readonly<{
  contact: PortalContactDetails;
}>;

export default function PortalContactCard({
  contact,
}: PortalContactCardProps) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Box sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            Contact
          </Typography>
          <Typography variant="h3">{contact.title}</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {contact.description}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {contact.organization}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {contact.website}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
