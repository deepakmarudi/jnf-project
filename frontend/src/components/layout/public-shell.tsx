import Box from "@mui/material/Box";

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
      {children}
    </Box>
  );
}
