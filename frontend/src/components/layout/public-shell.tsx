import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

type PublicShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {children}
      </Container>
    </Box>
  );
}
