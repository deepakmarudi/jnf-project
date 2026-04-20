import Link from "next/link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmptyState from "@/components/ui/empty-state";
import SectionCard from "@/components/ui/section-card";
import StatusChip from "@/components/ui/status-chip";
import { routes } from "@/lib/routes";
import type { JnfRecord } from "@/features/jnf/types";

type DashboardRecentJnfsProps = Readonly<{
  items: JnfRecord[];
}>;

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getAction(item: JnfRecord) {
  if (item.status === "draft") {
    return {
      label: "Continue Editing",
      href: routes.recruiter.jnfDetail(item.id),
    };
  }

  if (item.status === "changes_requested") {
    return {
      label: "Continue Editing",
      href: routes.recruiter.jnfDetail(item.id),
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
    };
  }

  return {
    label: "View Preview",
    href: routes.recruiter.jnfPreview(item.id),
  };
}

export default function DashboardRecentJnfs({
  items,
}: DashboardRecentJnfsProps) {
  return (
    <SectionCard
      title="Recent JNFs"
      description="Quickly continue your latest submissions and drafts."
      actions={
        <Button component={Link} href={routes.recruiter.jnfs}>
          View All
        </Button>
      }
    >
      {items.length === 0 ? (
        <EmptyState
          title="No recent JNFs yet"
          description="Create your first JNF draft to start the recruiter workflow."
          actions={
            <Button
              component={Link}
              href={routes.recruiter.newJnf}
              variant="contained"
            >
              + New JNF
            </Button>
          }
        />
      ) : (
        <Stack spacing={2}>
          {items.map((item) => {
            const action = getAction(item);

            return (
              <Card key={item.id} variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="overline" sx={{ color: "text.secondary" }}>
                        {item.jnf_number || "Draft JNF"}
                      </Typography>
                      <Typography variant="h6">
                        {item.job_title || "Untitled Role"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Updated: {item.updated_at ? formatUpdatedAt(item.updated_at) : "-"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <StatusChip status={item.status} />
                      <Button component={Link} href={action.href} variant="outlined">
                        {action.label}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </SectionCard>
  );
}
