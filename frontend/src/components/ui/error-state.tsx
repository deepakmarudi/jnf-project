import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type ErrorStateProps = Readonly<{
  message: string;
  actions?: React.ReactNode;
}>;

export default function ErrorState({
  message,
  actions,
}: ErrorStateProps) {
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Alert severity="error">{message}</Alert>
      {actions}
    </Stack>
  );
}
