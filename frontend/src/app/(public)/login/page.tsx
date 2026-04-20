import { RecruiterLoginPage } from "@/features/auth";
import Container from "@mui/material/Container";

export default function RecruiterLoginRoute() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <RecruiterLoginPage />
    </Container>
  );
}
