import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { portalFooterCopy } from "../data/home-content";

export default function PortalFooter() {
  return (
    <Box sx={{ pt: 1 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {portalFooterCopy.productName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {portalFooterCopy.organizationName}
        </Typography>
      </Stack>
    </Box>
  );
}
