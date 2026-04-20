import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PageContainerProps = Readonly<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}>;

export default function PageContainer({
  title,
  description,
  children,
  action,
}: PageContainerProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        {(title || description) && (
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing={2}
          >
            <Stack spacing={1}>
              {title && <Typography variant="h3">{title}</Typography>}
              {description && (
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {description}
                </Typography>
              )}
            </Stack>
            {action && <div>{action}</div>}
          </Stack>
        )}

        {children}
      </Stack>
    </Container>
  );
}
