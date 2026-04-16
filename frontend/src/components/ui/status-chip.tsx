import Chip from "@mui/material/Chip";
import type { JnfStatus, RecruiterStatus } from "@/types/status";

type StatusValue = JnfStatus | RecruiterStatus;

type StatusChipProps = Readonly<{
  status: StatusValue;
}>;

const statusLabelMap: Record<StatusValue, string> = {
  draft: "Draft",
  submitted: "Submitted",
  changes_requested: "Changes Requested",
  approved: "Approved",
  rejected: "Rejected",
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
  changes_requested: "warning",
  approved: "success",
  rejected: "error",
  pending: "warning",
  active: "success",
  blocked: "error",
};

export default function StatusChip({ status }: StatusChipProps) {
  return <Chip label={statusLabelMap[status]} color={statusColorMap[status]} />;
}
