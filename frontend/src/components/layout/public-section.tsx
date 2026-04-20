import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PublicSectionProps = Readonly<{
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}>;

export default function PublicSection({
  eyebrow,
  title,
  description,
  children,
}: PublicSectionProps) {
  return (
    <Stack spacing={3} sx={{ py: { xs: 5, md: 7 } }}>
      {(eyebrow || title || description) && (
        <Stack spacing={1.5} sx={{ maxWidth: 720 }}>
          {eyebrow && (
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
          )}

          {title && <Typography variant="h3">{title}</Typography>}

          {description && (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          )}
        </Stack>
      )}

      {children}
    </Stack>
  );
}
