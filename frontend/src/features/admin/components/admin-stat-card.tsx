import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type AdminStatCardProps = Readonly<{
  label: string;
  value: string | number;
  icon?: string;
}>;

export default function AdminStatCard({
  label,
  value,
  icon,
}: AdminStatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        },
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {icon && (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {icon}
            </Typography>
          )}
          <Stack spacing={0.5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

