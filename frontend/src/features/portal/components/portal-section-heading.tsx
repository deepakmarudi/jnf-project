import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PortalSectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  maxWidth?: number | string;
}>;

export default function PortalSectionHeading({
  eyebrow,
  title,
  description,
  maxWidth = 720,
}: PortalSectionHeadingProps) {
  return (
    <Stack spacing={1.25} sx={{ maxWidth }}>
      <Typography
        variant="overline"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: "0.12em",
        }}
      >
        {eyebrow}
      </Typography>

      <Typography variant="h3">{title}</Typography>

      {description ? (
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}
