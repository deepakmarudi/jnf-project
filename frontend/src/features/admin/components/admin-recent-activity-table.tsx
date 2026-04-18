"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { listAdminActivities, type AdminActivityRow } from "../lib/admin-api";
import LoadingState from "@/components/ui/loading-state";

export default function AdminRecentActivityTable() {
  const [activities, setActivities] = useState<AdminActivityRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await listAdminActivities();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch admin activities:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "approved":
        return "#16a34a";
      case "reviewed":
        return "#2563eb";
      case "changes_requested":
        return "#f59e0b";
      case "closed":
        return "#dc2626";
      default:
        return "#64748b";
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading activity..." />;
  }

  if (activities.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">No recent activity found.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Actor</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow
              key={activity.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
                backgroundColor: index % 2 === 0 ? "inherit" : "#f9fafb",
              }}
            >
              <TableCell>{activity.actorName}</TableCell>
              <TableCell>{activity.companyName}</TableCell>
              <TableCell>
                <Chip
                  label={activity.action.replace("_", " ")}
                  sx={{
                    backgroundColor: getActionColor(activity.action),
                    color: "white",
                    fontWeight: 500,
                    borderRadius: 999,
                    textTransform: "capitalize",
                  }}
                  size="small"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activity.remarks || "-"}
              </TableCell>
              <TableCell>
                {new Date(activity.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
