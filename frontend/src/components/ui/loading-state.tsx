import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type LoadingStateProps = Readonly<{
  message?: string;
}>;

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ py: 8 }}
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {message}
      </Typography>
    </Stack>
  );
}
