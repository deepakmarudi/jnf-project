"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdminStatsGrid from "./components/admin-stats-grid";
import AdminRecentActivityTable from "./components/admin-recent-activity-table";
import AdminNotificationPanel from "./components/admin-notification-panel";
import { getAdminDashboardData, type AdminDashboardStats } from "./lib/admin-api";
import LoadingState from "@/components/ui/loading-state";

const initialStats: AdminDashboardStats = {
  totalRecruiters: 0,
  totalCompanies: 0,
  totalJnfsSubmitted: 0,
  approvedJnfs: 0,
  pendingJnfs: 0,
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats>(initialStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getAdminDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading dashboard data..." />;
  }

  return (
    <Stack spacing={4}>
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
            <Grid size={{ xs: 12, lg: 8 }}>
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
            <Grid size={{ xs: 12, lg: 4 }}>
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
  );
}

