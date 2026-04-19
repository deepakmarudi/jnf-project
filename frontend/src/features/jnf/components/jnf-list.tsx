import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmptyState from "@/components/ui/empty-state";
import StatusChip from "@/components/ui/status-chip";
import { routes } from "@/lib/routes";
import type { JnfRecord } from "../types";

type JnfListProps = Readonly<{
  items: JnfRecord[];
  onDeleteDraft: (id: string) => void;
}>;

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getStageSummary(item: JnfRecord) {
  if (item.status === "draft" && item.submission_count === 0) {
    return "Draft not submitted yet";
  }

  if (item.status === "submitted" && item.submission_count === 1 && !item.self_edit_used) {
    return "First submission completed. One self-edit is still available.";
  }

  if (item.status === "submitted" && item.self_edit_used) {
    return "Final recruiter submission completed.";
  }

  if (item.status === "changes_requested") {
    return "Admin has requested modifications.";
  }

  if (item.status === "approved") {
    return "Approved by admin.";
  }

  if (item.status === "rejected") {
    return "Rejected by admin.";
  }

  if (item.status === "under_review") {
    return "Admin is currently reviewing the details.";
  }

  if (item.status === "closed") {
    return "The placement process for this JNF has concluded.";
  }

  return "JNF status available.";
}

function getPrimaryAction(item: JnfRecord) {
  if (item.status === "draft") {
    return {
      label: "Continue Editing",
      href: routes.recruiter.jnfDetail(item.id),
      showsPreviewButton: true,
    };
  }

  if (item.status === "changes_requested") {
    return {
      label: "Continue Editing",
      href: routes.recruiter.jnfDetail(item.id),
      showsPreviewButton: true,
    };
  }

  if (
    item.status === "submitted" &&
    item.submission_count === 1 &&
    !item.self_edit_used
  ) {
    return {
      label: "Edit Once",
      href: routes.recruiter.jnfDetail(item.id),
      showsPreviewButton: true,
    };
  }

  return {
    label: "View Preview",
    href: routes.recruiter.jnfPreview(item.id),
    showsPreviewButton: false,
  };
}

export default function JnfList({ items, onDeleteDraft }: JnfListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No JNFs found"
        description="Try changing the filters or create a new JNF draft."
      />
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Showing {items.length} {items.length === 1 ? "JNF" : "JNFs"}
      </Typography>

      {items.map((item) => {
        const primaryAction = getPrimaryAction(item);

        return (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Stack spacing={2.5}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="overline" sx={{ color: "text.secondary" }}>
                      {item.jnf_number || "Draft JNF"}
                    </Typography>
                    <Typography variant="h5">
                      {item.job_title || "Untitled Role"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.job_designation || "Designation not added yet"}
                    </Typography>
                  </Stack>

                  <StatusChip status={item.status} />
                </Stack>

                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: "action.hover",
                  }}
                >
                  <Typography variant="body2">{getStageSummary(item)}</Typography>
                </Box>

                {(item.status === "changes_requested" || item.status === "rejected") &&
                item.admin_feedback ? (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Admin Message
                    </Typography>
                    <Typography variant="body2">{item.admin_feedback}</Typography>
                  </Box>
                ) : null}

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                      lg: "repeat(4, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Recruitment Season
                    </Typography>
                    <Typography variant="body2">
                      {item.recruitment_season || "-"}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Place of Posting
                    </Typography>
                    <Typography variant="body2">
                      {item.place_of_posting || "-"}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Expected Hires
                    </Typography>
                    <Typography variant="body2">
                      {item.expected_hires || "-"}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Last Updated
                    </Typography>
                    <Typography variant="body2">
                      {item.updated_at ? formatUpdatedAt(item.updated_at) : "-"}
                    </Typography>
                  </Stack>
                </Box>

                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  <Button
                    component={Link}
                    href={primaryAction.href}
                    variant="contained"
                  >
                    {primaryAction.label}
                  </Button>

                  {primaryAction.showsPreviewButton ? (
                    <Button
                      component={Link}
                      href={routes.recruiter.jnfPreview(item.id)}
                      variant="outlined"
                    >
                      Preview
                    </Button>
                  ) : null}

                  {item.status === "draft" ? (
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => onDeleteDraft(item.id)}
                    >
                      Delete Draft
                    </Button>
                  ) : null}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
