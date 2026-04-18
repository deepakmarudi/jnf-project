"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { type AdminRecruiterOverview } from "../lib/admin-api";

type AdminRecruiterDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  recruiter: AdminRecruiterOverview | null;
};

export default function AdminRecruiterDetailsModal({
  open,
  onClose,
  recruiter,
}: AdminRecruiterDetailsModalProps) {
  if (!recruiter) return null;

  const getStatusColor = (status: string) => {
    return status === "active" ? "#16a34a" : "#dc2626";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: 700, fontSize: '1.25rem' }}>
        Recruiter Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Basic Info */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Full Name
                </Typography>
                <Typography variant="body1">{recruiter.fullName}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Email
                </Typography>
                <Typography variant="body1">{recruiter.email}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Company
                </Typography>
                <Typography variant="body1">{recruiter.companyName || "N/A"}</Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Status */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Status
            </Typography>
            <Chip
              label={recruiter.status}
              sx={{
                backgroundColor: getStatusColor(recruiter.status),
                color: "white",
                fontWeight: 500,
                padding: "4px 10px",
                borderRadius: 999,
              }}
              size="small"
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
