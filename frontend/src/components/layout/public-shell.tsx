import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

type PublicShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f8f3ed 0%, #ffffff 35%, #f7f1eb 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {children}
      </Container>
    </Box>
  );
}
