import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AdminSidebar from "./components/admin-sidebar";
import AdminCompaniesTable from "./components/admin-companies-table";

export default function AdminCompaniesPage() {
  return (
    <Box sx={{ display: "flex", bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, ml: "260px", p: 3 }}>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Companies Management
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Review registered companies, monitor recruiter activity, and track
              submitted JNFs by session and date.
            </Typography>
          </Stack>

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
            <AdminCompaniesTable />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
