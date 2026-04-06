import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdminDashboardHeader from "./components/admin-dashboard-header";
import AdminSidebar from "./components/admin-sidebar";
import AdminStatsGrid from "./components/admin-stats-grid";
import AdminRecentActivityTable from "./components/admin-recent-activity-table";
import AdminNotificationPanel from "./components/admin-notification-panel";

export default function AdminDashboardPage() {
  // TODO: Replace these with actual API calls
  const stats = {
    totalRecruiters: 24,
    totalCompanies: 18,
    totalJnfsSubmitted: 42,
    approvedJnfs: 32,
    pendingJnfs: 10,
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, ml: "260px", p: 3 }}>
        <Stack spacing={4}>
          {/* Header */}
          <AdminDashboardHeader />

          {/* Dashboard Title */}
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Overview of recruiters, companies, and JNF submissions
            </Typography>
          </Stack>

          {/* Stats Section */}
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
            <AdminStatsGrid
              totalRecruiters={stats.totalRecruiters}
              totalCompanies={stats.totalCompanies}
              totalJnfsSubmitted={stats.totalJnfsSubmitted}
              approvedJnfs={stats.approvedJnfs}
              pendingJnfs={stats.pendingJnfs}
            />
          </Box>

          {/* Recent Activity and Notifications */}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
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
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <AdminRecentActivityTable />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
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
                <AdminNotificationPanel />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}

