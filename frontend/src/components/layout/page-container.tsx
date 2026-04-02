import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PageContainerProps = Readonly<{
  title?: string;
  description?: string;
  children: React.ReactNode;
}>;

export default function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        {(title || description) && (
          <Stack spacing={1}>
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
    </Container>
  );
}
