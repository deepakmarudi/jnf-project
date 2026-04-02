import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type EmptyStateProps = Readonly<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}>;

export default function EmptyState({
  title,
  description,
  actions,
}: EmptyStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        borderStyle: "dashed",
      }}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Stack spacing={0.75}>
          <Typography variant="h6">{title}</Typography>
          {description && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          )}
        </Stack>

        {actions}
      </Stack>
    </Paper>
  );
}
