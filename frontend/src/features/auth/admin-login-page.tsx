import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AdminLoginFormCard from "./components/admin-login-form-card";
import AdminLoginHeroCard from "./components/admin-login-hero-card";
import AdminLoginPageHeader from "./components/admin-login-page-header";

export default function AdminLoginPage() {
  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <AdminLoginPageHeader />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(400px, 1fr) minmax(500px, 1.2fr)",
            },
            gap: 4,
            maxWidth: 1000,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          <AdminLoginHeroCard />
          <AdminLoginFormCard />
        </Box>
      </Box>
    </Stack>
  );
}
