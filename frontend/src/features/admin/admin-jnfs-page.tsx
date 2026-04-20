import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AdminJnfsTable from "./components/admin-jnfs-table";

export default function AdminJnfsPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              JNF Review Queue
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Review submitted JNFs, filter by status, and open each form for
              approval, rejection, or change requests.
            </Typography>
          </Stack>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "#ffffff",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 24px rgba(16,35,61,0.05)",
            }}
          >
            <AdminJnfsTable />
          </Box>
    </Stack>
  );
}
