import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function PublicHeader() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: { xs: 6, md: 8 } }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6" sx={{ color: "primary.main" }}>
          JNF Portal
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          IIT (ISM) Dhanbad Placement Office
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button variant="text">Recruiter Login</Button>
        <Button variant="contained">Register</Button>
      </Stack>
    </Stack>
  );
}
