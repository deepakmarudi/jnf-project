"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { listAdminNotifications, type AdminNotificationRow } from "../lib/admin-api";
import LoadingState from "@/components/ui/loading-state";

export default function AdminNotificationPanel() {
  const [notifications, setNotifications] = useState<AdminNotificationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await listAdminNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch admin notifications:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "info":
        return "#1e3a8a";
      case "success":
        return "#16a34a";
      case "warning":
        return "#f59e0b";
      default:
        return "#64748b";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "info":
        return "🔔";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      default:
        return "📢";
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading notifications..." />;
  }

  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No new notifications.
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
            Notifications
          </Typography>
          <Stack spacing={1.5}>
            {notifications.map((notification) => (
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
                  <Typography variant="h6">
                    {getNotificationIcon(notification.type)}
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">{notification.message}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
                <Chip
                  label={notification.type}
                  sx={{
                    backgroundColor: getNotificationColor(notification.type),
                    color: "white",
                    fontWeight: 500,
                    borderRadius: 999,
                    textTransform: "capitalize",
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
