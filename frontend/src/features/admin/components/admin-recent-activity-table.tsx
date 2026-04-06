import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

type ActivityStatus = "pending" | "approved" | "rejected";

type RecentActivity = {
  id: string;
  recruiterName: string;
  company: string;
  jobTitle: string;
  status: ActivityStatus;
  date: string;
};

const mockActivities: RecentActivity[] = [
  {
    id: "1",
    recruiterName: "John Doe",
    company: "Tech Corp",
    jobTitle: "Software Engineer",
    status: "approved",
    date: "2024-04-05",
  },
  {
    id: "2",
    recruiterName: "Jane Smith",
    company: "Data Inc",
    jobTitle: "Data Analyst",
    status: "pending",
    date: "2024-04-04",
  },
  {
    id: "3",
    recruiterName: "Bob Johnson",
    company: "Web Solutions",
    jobTitle: "Frontend Developer",
    status: "rejected",
    date: "2024-04-03",
  },
];

export default function AdminRecentActivityTable() {
  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case "approved":
        return "#16a34a";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#dc2626";
      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Recruiter Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockActivities.map((activity, index) => (
            <TableRow
              key={activity.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
                backgroundColor: index % 2 === 0 ? "inherit" : "#f9fafb",
              }}
            >
              <TableCell>{activity.recruiterName}</TableCell>
              <TableCell>{activity.company}</TableCell>
              <TableCell>{activity.jobTitle}</TableCell>
              <TableCell>
                <Chip
                  label={activity.status}
                  sx={{
                    backgroundColor: getStatusColor(activity.status),
                    color: "white",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                  size="small"
                />
              </TableCell>
              <TableCell>{activity.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
