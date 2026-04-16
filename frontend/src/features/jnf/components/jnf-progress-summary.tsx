import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfSectionProgressItem } from "../lib/jnf-section-progress";

type JnfProgressSummaryProps = Readonly<{
  items: JnfSectionProgressItem[];
  completedCount: number;
  totalCount: number;
}>;

export default function JnfProgressSummary({
  items,
  completedCount,
  totalCount,
}: JnfProgressSummaryProps) {
  const progressValue =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <SectionCard
      title="Form Progress"
      description={`${completedCount} of ${totalCount} sections completed.`}
    >
      <Stack spacing={2.5}>
        <Box>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ height: 10, borderRadius: 999 }}
          />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mt: 0.75 }}
          >
            {progressValue}% complete
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {items.map((item) => (
            <Box
              key={item.key}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: item.completed ? "success.light" : "divider",
                bgcolor: item.completed ? "success.50" : "background.paper",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1.5}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.label}
                </Typography>

                <Chip
                  label={item.completed ? "Complete" : "Incomplete"}
                  color={item.completed ? "success" : "warning"}
                  size="small"
                  variant={item.completed ? "filled" : "outlined"}
                />
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </SectionCard>
  );
}
