import { RecruiterRegisterPage } from "@/features/auth";
import Container from "@mui/material/Container";

export default function RecruiterRegisterRoute() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <RecruiterRegisterPage />
    </Container>
  );
}
