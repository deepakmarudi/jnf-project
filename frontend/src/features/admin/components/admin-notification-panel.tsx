import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type Notification = {
  id: string;
  type: "recruiter_registered" | "jnf_submitted" | "approval_needed";
  message: string;
  timestamp: string;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "recruiter_registered",
    message: "New recruiter registered: Alice Brown from XYZ Corp",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "jnf_submitted",
    message: "New JNF submitted for Software Engineer position",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "approval_needed",
    message: "Approval needed for JNF from Tech Solutions",
    timestamp: "1 day ago",
  },
];

export default function AdminNotificationPanel() {
  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "recruiter_registered":
        return "#1e3a8a";
      case "jnf_submitted":
        return "#16a34a";
      case "approval_needed":
        return "#f59e0b";
      default:
        return "default";
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "recruiter_registered":
        return "🔔";
      case "jnf_submitted":
        return "📄";
      case "approval_needed":
        return "⚠️";
      default:
        return "📢";
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
            Notifications
          </Typography>
          <Stack spacing={1.5}>
            {mockNotifications.map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Typography variant="h6">{getNotificationIcon(notification.type)}</Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">{notification.message}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {notification.timestamp}
                    </Typography>
                  </Stack>
                </Stack>
                <Chip
                  label={notification.type.replace("_", " ")}
                  sx={{
                    backgroundColor: getNotificationColor(notification.type),
                    color: "white",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                  size="small"
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
