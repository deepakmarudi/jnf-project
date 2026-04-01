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
        background:
          "linear-gradient(180deg, #f4f7fb 0%, #ffffff 45%, #eef3f9 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {children}
      </Container>
    </Box>
  );
}
