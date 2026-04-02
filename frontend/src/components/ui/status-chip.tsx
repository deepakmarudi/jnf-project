import Chip from "@mui/material/Chip";
import type { JnfStatus, RecruiterStatus } from "@/types/status";

type StatusValue = JnfStatus | RecruiterStatus;

type StatusChipProps = Readonly<{
  status: StatusValue;
}>;

const statusLabelMap: Record<StatusValue, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  changes_requested: "Changes Requested",
  approved: "Approved",
  closed: "Closed",
  pending: "Pending",
  active: "Active",
  blocked: "Blocked",
};

const statusColorMap: Record<
  StatusValue,
  "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"
> = {
  draft: "default",
  submitted: "info",
  under_review: "warning",
  changes_requested: "secondary",
  approved: "success",
  closed: "default",
  pending: "warning",
  active: "success",
  blocked: "error",
};

export default function StatusChip({ status }: StatusChipProps) {
  return <Chip label={statusLabelMap[status]} color={statusColorMap[status]} />;
}
