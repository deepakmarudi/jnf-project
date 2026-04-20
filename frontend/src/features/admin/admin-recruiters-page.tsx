import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AdminRecruitersTable from "./components/admin-recruiters-table";

export default function AdminRecruitersPage() {
  return (
    <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Recruiters Management
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Manage and oversee all registered recruiters
            </Typography>
          </Stack>

          {/* Recruiters Table */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "#ffffff",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 24px rgba(16,35,61,0.05)",
            }}
          >
            <AdminRecruitersTable />
          </Box>
    </Stack>
  );
}
