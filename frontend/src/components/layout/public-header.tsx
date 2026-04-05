import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PublicHeaderProps = Readonly<{
  onAccessClick: () => void;
}>;

export default function PublicHeader({ onAccessClick }: PublicHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      spacing={2}
      sx={{
        mb: { xs: 4, md: 5 },
        px: { xs: 2, md: 2.5 },
        py: 1.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#ffffff",
        boxShadow: "0 8px 24px rgba(16,35,61,0.05)",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            position: "relative",
            width: 56,
            height: 56,
            flexShrink: 0,
          }}
        >
          <Image
            src="/iitism-logo.svg"
            alt="IIT (ISM) Dhanbad logo"
            fill
            sizes="52px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Stack spacing={0.25}>
          <Typography variant="h6" sx={{ color: "primary.main", lineHeight: 1.2 }}>
            Career Development Center (CDC)
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            IIT (ISM) Dhanbad
          </Typography>
        </Stack>
      </Stack>

      <Button variant="contained" onClick={onAccessClick}>
        Login / Register
      </Button>
    </Stack>
  );
}
