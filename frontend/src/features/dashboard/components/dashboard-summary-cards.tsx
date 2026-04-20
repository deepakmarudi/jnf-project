import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type DashboardSummaryCardsProps = Readonly<{
  summary: {
    total: number;
    draft: number;
    submitted: number;
    changesRequested: number;
    approved: number;
    rejected: number;
  };
}>;

export default function DashboardSummaryCards({
  summary,
}: DashboardSummaryCardsProps) {
  const cards = [
    {
      label: "Total JNFs",
      value: summary.total,
      note: "All JNFs created for this recruiter workspace.",
    },
    {
      label: "Drafts",
      value: summary.draft,
      note: "Draft JNFs still pending final submission.",
    },
    {
      label: "Submitted",
      value: summary.submitted,
      note: "Submitted JNFs currently waiting in review flow.",
    },
    {
      label: "Changes Requested",
      value: summary.changesRequested,
      note: "JNF submissions needing recruiter updates.",
    },
    {
      label: "Approved",
      value: summary.approved,
      note: "JNF submissions approved by admin.",
    },
    {
      label: "Rejected",
      value: summary.rejected,
      note: "JNF submissions rejected by admin.",
    },
  ] as const;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      useFlexGap
      flexWrap="wrap"
    >
      {cards.map((card) => (
        <Card key={card.label} variant="outlined" sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.label}
              </Typography>
              <Typography variant="h4">{card.value}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {card.note}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
