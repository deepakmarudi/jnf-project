import Box from "@mui/material/Box";
import RecruiterTopbar from "./recruiter-topbar";

type RecruiterShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterShell({ children }: RecruiterShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <RecruiterTopbar />
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
