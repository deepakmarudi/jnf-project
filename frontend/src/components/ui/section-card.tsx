import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type SectionCardProps = Readonly<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}>;

export default function SectionCard({
  title,
  description,
  actions,
  children,
}: SectionCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Stack spacing={0.75}>
              <Typography variant="h5">{title}</Typography>
              {description && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {description}
                </Typography>
              )}
            </Stack>

            {actions}
          </Stack>

          <Divider />

          <Stack spacing={2.5}>{children}</Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
