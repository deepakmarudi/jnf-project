import Box from "@mui/material/Box";
import AdminTopbar from "./admin-topbar";

type AdminShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <AdminTopbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
