import Box from "@mui/material/Box";
import RecruiterSidebar from "./recruiter-sidebar";
import RecruiterTopbar from "./recruiter-topbar";

type RecruiterShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterShell({ children }: RecruiterShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "230px minmax(0, 1fr)" },
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <RecruiterSidebar />
      </Box>

      <Box sx={{ minWidth: 0, minHeight: "100vh" }}>
        <RecruiterTopbar />
        <Box component="main" sx={{ p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
