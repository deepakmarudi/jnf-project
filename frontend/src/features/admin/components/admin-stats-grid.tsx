import Grid from "@mui/material/Grid";
import AdminStatCard from "./admin-stat-card";

type AdminStatsGridProps = Readonly<{
  totalRecruiters: number;
  totalCompanies: number;
  totalJnfsSubmitted: number;
  approvedJnfs: number;
  pendingJnfs: number;
}>;

export default function AdminStatsGrid({
  totalRecruiters,
  totalCompanies,
  totalJnfsSubmitted,
  approvedJnfs,
  pendingJnfs,
}: AdminStatsGridProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Total Recruiters"
          value={totalRecruiters}
          icon="👨‍💼"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Total Companies"
          value={totalCompanies}
          icon="🏢"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="JNFs Submitted"
          value={totalJnfsSubmitted}
          icon="📄"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Approved JNFs"
          value={approvedJnfs}
          icon="✅"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Pending JNFs"
          value={pendingJnfs}
          icon="⏳"
        />
      </Grid>
    </Grid>
  );
}
