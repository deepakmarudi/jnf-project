import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import SectionCard from "@/components/ui/section-card";

type DashboardRemindersProps = Readonly<{
  draftCount: number;
  changesRequestedCount: number;
}>;

export default function DashboardReminders({
  draftCount,
  changesRequestedCount,
}: DashboardRemindersProps) {
  const reminders: string[] = [];

  if (draftCount > 0) {
    reminders.push(
      `${draftCount} draft JNF${draftCount > 1 ? "s are" : " is"} still pending final submission.`
    );
  }

  if (changesRequestedCount > 0) {
    reminders.push(
      `${changesRequestedCount} JNF${changesRequestedCount > 1 ? "s require" : " requires"} recruiter updates after admin review.`
    );
  }

  return (
    <SectionCard
      title="Attention Needed"
      description="Important reminders for the recruiter workspace."
    >
      <Stack spacing={2}>
        {reminders.length === 0 ? (
          <Alert severity="success">
            No immediate pending actions. Your recruiter workspace looks up to date.
          </Alert>
        ) : (
          reminders.map((reminder) => (
            <Alert key={reminder} severity="warning">
              {reminder}
            </Alert>
          ))
        )}
      </Stack>
    </SectionCard>
  );
}
