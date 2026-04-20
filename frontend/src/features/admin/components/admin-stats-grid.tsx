import Grid from "@mui/material/Grid";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
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
          icon={<GroupIcon />}
          iconColor="#10B981"
          iconBgColor="#ECFDF5"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Total Companies"
          value={totalCompanies}
          icon={<BusinessIcon />}
          iconColor="#6366F1"
          iconBgColor="#EEF2FF"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="JNFs Submitted"
          value={totalJnfsSubmitted}
          icon={<DescriptionIcon />}
          iconColor="#3B82F6"
          iconBgColor="#EFF6FF"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Approved JNFs"
          value={approvedJnfs}
          icon={<CheckCircleIcon />}
          iconColor="#F59E0B"
          iconBgColor="#FEF3C7"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
        <AdminStatCard
          label="Pending JNFs"
          value={pendingJnfs}
          icon={<HourglassEmptyIcon />}
          iconColor="#EC4899"
          iconBgColor="#FDF2F8"
        />
      </Grid>
    </Grid>
  );
}
