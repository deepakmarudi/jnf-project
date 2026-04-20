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
import { useEffect } from "react";
import {
  listAdminJnfs,
  getAdminJnf,
  approveJnf,
  closeJnf,
  requestChangesJnf,
  type AdminJnfOverview,
} from "./lib/admin-api";
import type { JnfRecord } from "@/features/jnf/types";
import { JnfDisplaySections } from "@/features/jnf/components/jnf-display-sections";
import LoadingState from "@/components/ui/loading-state";

type AdminJnfDetailPageProps = Readonly<{
  id: string;
}>;

type ReviewDialogMode = "reject" | "changes" | null;

export default function AdminJnfDetailPage({
  id,
}: AdminJnfDetailPageProps) {
  const [overview, setOverview] = useState<AdminJnfOverview | null>(null);
  const [fullRecord, setFullRecord] = useState<JnfRecord | null>(null);
  const [status, setStatus] = useState<JnfStatus>("submitted");
  const [dialogMode, setDialogMode] = useState<ReviewDialogMode>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchJnf() {
      try {
        const list = await listAdminJnfs();
        const found = list.find((j) => j.id === String(id));
        if (found) {
          setOverview(found);
          setStatus(found.status as JnfStatus);
          const detail = await getAdminJnf(String(id));
          setFullRecord(detail);
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
    return <LoadingState message="Loading secure submission..." />;
  }

  if (!overview || !fullRecord) {
    return (
      <EmptyState
        title="JNF not found"
        description="The requested JNF record is not available."
        actions={
          <Button component={Link} href={routes.admin.jnfs} variant="contained">
            Back to JNF Queue
          </Button>
        }
      />
    );
  }

  const reviewHistory = [
    `Originally submitted: ${new Date(overview.submittedAt).toLocaleDateString()}`,
    `Current status: ${status}`,
  ];

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await approveJnf(id, "JNF has been approved.");
      setStatus("approved");
    } catch (error) {
      console.error("Failed to approve JNF:", error);
      alert("Failed to approve JNF. Please check logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectOrRequestChanges = async () => {
    try {
      setIsSubmitting(true);
      if (dialogMode === "reject") {
        await closeJnf(id, feedbackText);
        setStatus("rejected");
      }

      if (dialogMode === "changes") {
        await requestChangesJnf(id, feedbackText);
        setStatus("changes_requested");
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Failed to process request. Please try again.");
    } finally {
      setIsSubmitting(false);
      setDialogMode(null);
      setFeedbackText("");
    }
  };

  return (
    <>
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
            {overview.id} Review
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {overview.companyName} | {overview.jobTitle} | Submitted on {new Date(overview.submittedAt).toLocaleDateString()}
          </Typography>
        </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <StatusChip status={normalizeAdminStatusForDisplay(status)} />
              {(status === "submitted" || status === "under_review") && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleApprove}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setDialogMode("reject")}
                    disabled={isSubmitting}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setDialogMode("changes")}
                    disabled={isSubmitting}
                  >
                    Request Changes
                  </Button>
                </>
              )}
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
                Recruiter: {overview.recruiterName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Type: {overview.roleType}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Session: Data synced via backend
              </Typography>
            </Stack>
          </SectionCard>

          {/* Genuine JNF Full Record Display */}
          <JnfDisplaySections record={fullRecord} companyProfile={(fullRecord as any).company || null} />

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
            disabled={!feedbackText.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function normalizeAdminStatusForDisplay(status: JnfStatus) {
  if (status === "submitted") {
    return "pending";
  }

  return status;
}
