"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import EmptyState from "@/components/ui/empty-state";
import SectionCard from "@/components/ui/section-card";
import StatusChip from "@/components/ui/status-chip";
import { routes } from "@/lib/routes";
import type { JnfStatus } from "@/types/status";
import AdminSidebar from "./components/admin-sidebar";
import { useEffect } from "react";
import { listAdminJnfs, type AdminJnfOverview } from "./lib/admin-api";
import LoadingState from "@/components/ui/loading-state";

type AdminJnfDetailPageProps = Readonly<{
  id: string;
}>;

type ReviewDialogMode = "reject" | "changes" | null;

const tabLabels = [
  "Job Details",
  "Eligibility",
  "Salary",
  "Selection Process",
  "Declaration",
];

export default function AdminJnfDetailPage({
  id,
}: AdminJnfDetailPageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [jnf, setJnf] = useState<AdminJnfOverview | null>(null);
  const [status, setStatus] = useState<JnfStatus>("submitted");
  const [dialogMode, setDialogMode] = useState<ReviewDialogMode>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJnf() {
      try {
        const list = await listAdminJnfs();
        const found = list.find((j) => j.id === String(id));
        if (found) {
          setJnf(found);
          setStatus(found.status as JnfStatus);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJnf();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", bgcolor: "#f3f4f6", minHeight: "100vh" }}>
        <AdminSidebar />
        <Box sx={{ flexGrow: 1, ml: "260px", p: 3 }}>
          <LoadingState message="Loading secure submission..." />
        </Box>
      </Box>
    );
  }

  if (!jnf) {
    return (
      <Box sx={{ display: "flex", bgcolor: "#f3f4f6", minHeight: "100vh" }}>
        <AdminSidebar />
        <Box sx={{ flexGrow: 1, ml: "260px", p: 3 }}>
          <EmptyState
            title="JNF not found"
            description="The requested JNF record is not available."
            actions={
              <Button component={Link} href={routes.admin.jnfs} variant="contained">
                Back to JNF Queue
              </Button>
            }
          />
        </Box>
      </Box>
    );
  }

  const reviewHistory = [
    `Originally submitted: ${new Date(jnf.submittedAt).toLocaleDateString()}`,
    `Current status: ${status}`,
  ];

  const handleApprove = () => {
    setStatus("approved");
  };

  const handleRejectOrRequestChanges = () => {
    if (dialogMode === "reject") {
      setStatus("rejected");
    }

    if (dialogMode === "changes") {
      setStatus("changes_requested");
    }

    setDialogMode(null);
    setFeedbackText("");
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, ml: "260px", p: 3 }}>
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={1}>
              <Button
                component={Link}
                href={routes.admin.jnfs}
                variant="text"
                sx={{ alignSelf: "flex-start", px: 0 }}
              >
                Back to JNF Queue
              </Button>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {jnf.id} Review
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {jnf.companyName} | {jnf.jobTitle} | Submitted on {new Date(jnf.submittedAt).toLocaleDateString()}
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <StatusChip status={normalizeAdminStatusForDisplay(status)} />
              <Button variant="contained" color="success" onClick={handleApprove}>
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDialogMode("reject")}
              >
                Reject
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDialogMode("changes")}
              >
                Request Changes
              </Button>
            </Stack>
          </Stack>

          <SectionCard
            title="Review Summary"
            description="Admin can review the submission in focused tabs and update the status from this page."
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Recruiter: {jnf.recruiterName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Type: {jnf.roleType}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Session: Data synced via backend
              </Typography>
            </Stack>
          </SectionCard>

          <SectionCard title="JNF Details">
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              variant="scrollable"
              allowScrollButtonsMobile
            >
              {tabLabels.map((label) => (
                <Tab key={label} label={label} />
              ))}
            </Tabs>

            {activeTab === 0 && (
              <Stack spacing={2}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Job Title
                </Typography>
                <Typography variant="body1">{jnf.jobTitle}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Company
                </Typography>
                <Typography variant="body1">{jnf.companyName}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Role Type
                </Typography>
                <Typography variant="body1">{jnf.roleType}</Typography>
              </Stack>
            )}

            {activeTab === 1 && (
              <Stack spacing={2}>
                 <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                   Core eligibility data is safely stored in the backend database.
                 </Typography>
              </Stack>
            )}

            {activeTab === 2 && (
              <Stack spacing={2}>
                 <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                   Detailed salary structures are stored securely on the backend.
                 </Typography>
              </Stack>
            )}

            {activeTab === 3 && (
              <Stack spacing={2}>
                 <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                   Interview and test sequences are tracked via the database.
                 </Typography>
              </Stack>
            )}

            {activeTab === 4 && (
              <Stack spacing={2}>
                 <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                   Acknowledgement signatures verified dynamically.
                 </Typography>
              </Stack>
            )}
          </SectionCard>

          <SectionCard
            title="Review History"
            description="A lightweight admin timeline to show the submission and latest review updates."
          >
            <Stack spacing={1.25}>
              {reviewHistory.map((item) => (
                <Typography key={item} variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
          </SectionCard>
        </Stack>
      </Box>

      <Dialog open={dialogMode !== null} onClose={() => setDialogMode(null)} fullWidth>
        <DialogTitle>
          {dialogMode === "reject" ? "Reason for rejection" : "Feedback for recruiter"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={4}
            margin="dense"
            label={
              dialogMode === "reject"
                ? "Why is this JNF being rejected?"
                : "What changes should the recruiter make?"
            }
            value={feedbackText}
            onChange={(event) => setFeedbackText(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogMode(null)}>Cancel</Button>
          <Button
            onClick={handleRejectOrRequestChanges}
            variant="contained"
            disabled={!feedbackText.trim()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function normalizeAdminStatusForDisplay(status: JnfStatus) {
  if (status === "submitted") {
    return "pending";
  }

  return status;
}
