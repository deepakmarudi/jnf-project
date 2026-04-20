import Link from "next/link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";

type PortalAccessDialogProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export default function PortalAccessDialog({
  open,
  onClose,
}: PortalAccessDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Choose Access</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Recruiter
          </Typography>
          <Button
            component={Link}
            href={routes.public.login}
            variant="contained"
            onClick={onClose}
          >
            Recruiter Login
          </Button>
          <Button
            component={Link}
            href={routes.public.register}
            variant="outlined"
            onClick={onClose}
          >
            Recruiter Register
          </Button>

          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Admin
          </Typography>
          <Button
            component={Link}
            href={routes.public.adminLogin}
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Admin Login
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
