"use client";

import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PageContainer from "@/components/layout/page-container";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { getCompanyProfileForRecruiter } from "@/features/company/lib/company-storage";
import { getStoredJnfs } from "@/features/jnf/lib/jnf-storage";
import type { JnfRecord } from "@/features/jnf/types";
import DashboardQuickActions from "./components/dashboard-quick-actions";
import DashboardReminders from "./components/dashboard-reminders";
import DashboardRecentJnfs from "./components/dashboard-recent-jnfs";
import DashboardSummaryCards from "./components/dashboard-summary-cards";

export default function RecruiterDashboardPage() {
  const [jnfs, setJnfs] = useState<JnfRecord[]>([]);
  const session = useRecruiterSession();

  const recruiterName = session?.recruiter_name?.trim() || "Recruiter";
  const companyName =
    session?.recruiter_id
      ? getCompanyProfileForRecruiter(session.recruiter_id)?.name?.trim() || "Your Company Name"
      : "Your Company Name";

  useEffect(() => {
    setJnfs(getStoredJnfs());
  }, []);

  const sortedJnfs = useMemo(() => {
    return [...jnfs].sort((a, b) => {
      const first = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const second = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return second - first;
    });
  }, [jnfs]);

  const recentJnfs = sortedJnfs.slice(0, 4);

  const summary = useMemo(() => {
    return {
      total: jnfs.length,
      draft: jnfs.filter((item) => item.status === "draft").length,
      submitted: jnfs.filter((item) => item.status === "submitted").length,
      changesRequested: jnfs.filter((item) => item.status === "changes_requested").length,
      approved: jnfs.filter((item) => item.status === "approved").length,
      rejected: jnfs.filter((item) => item.status === "rejected").length,
    };
  }, [jnfs]);

  return (
    <PageContainer>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h3">Recruiter Dashboard</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Welcome back{" "}
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              {recruiterName}
            </Box>
            . Manage your company profile and Job Notification Forms from one place.
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Company:{" "}
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              {companyName}
            </Box>
          </Typography>
        </Stack>

        <DashboardQuickActions />

        <DashboardSummaryCards summary={summary} />

        <DashboardRecentJnfs items={recentJnfs} />

        <DashboardReminders
          draftCount={summary.draft}
          changesRequestedCount={summary.changesRequested}
        />
      </Stack>
    </PageContainer>
  );
}
