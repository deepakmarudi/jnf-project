"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdminRecruiterDetailsModal from "./admin-recruiter-details-modal";

type RecruiterStatus = "active" | "blocked";

type Recruiter = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: RecruiterStatus;
  designation: string;
  alternativeMobile?: string;
};

const mockRecruiters: Recruiter[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@techcorp.com",
    phone: "+91 9876543210",
    company: "Tech Corp",
    status: "active",
    designation: "HR Manager",
    alternativeMobile: "+91 9876543211",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@datainc.com",
    phone: "+91 8765432109",
    company: "Data Inc",
    status: "active",
    designation: "Talent Acquisition Lead",
    alternativeMobile: "+91 8765432110",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@webco.com",
    phone: "+91 7654321098",
    company: "Web Solutions",
    status: "blocked",
    designation: "Recruitment Specialist",
    alternativeMobile: "+91 7654321099",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@innovate.com",
    phone: "+91 6543210987",
    company: "Innovate Labs",
    status: "active",
    designation: "Senior HR Executive",
    alternativeMobile: "+91 6543210988",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@startup.io",
    phone: "+91 5432109876",
    company: "Startup Inc",
    status: "active",
    designation: "Head of Talent",
    alternativeMobile: "+91 5432109877",
  },
];

export default function AdminRecruitersTable() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRecruiter, setMenuRecruiter] = useState<Recruiter | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, recruiter: Recruiter) => {
    setAnchorEl(event.currentTarget);
    setMenuRecruiter(recruiter);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRecruiter(null);
  };

  const handleViewDetails = (recruiter: Recruiter) => {
    setSelectedRecruiter(recruiter);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleEdit = (recruiter: Recruiter) => {
    // TODO: Implement edit functionality
    console.log("Edit recruiter:", recruiter);
    handleMenuClose();
  };

  const handleToggleBlock = (recruiter: Recruiter) => {
    setRecruiters(prevRecruiters =>
      prevRecruiters.map(r =>
        r.id === recruiter.id
          ? { ...r, status: r.status === "active" ? "blocked" : "active" }
          : r
      )
    );
    handleMenuClose();
  };

  const handleDelete = (recruiter: Recruiter) => {
    setRecruiters(prevRecruiters => prevRecruiters.filter(r => r.id !== recruiter.id));
    handleMenuClose();
  };

  const getStatusColor = (status: RecruiterStatus) => {
    return status === "active" ? "#16a34a" : "#dc2626";
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruiters.map((recruiter, index) => (
              <TableRow
                key={recruiter.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                  backgroundColor: index % 2 === 0 ? "inherit" : "#f9fafb",
                }}
              >
                <TableCell>{recruiter.name}</TableCell>
                <TableCell>{recruiter.email}</TableCell>
                <TableCell>{recruiter.phone}</TableCell>
                <TableCell>{recruiter.company}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, recruiter)}
                    size="small"
                  >
                    ⋮
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => menuRecruiter && handleViewDetails(menuRecruiter)}>
          👁️ View Details
        </MenuItem>
        <MenuItem onClick={() => menuRecruiter && handleEdit(menuRecruiter)}>
          ✏️ Edit
        </MenuItem>
        <MenuItem onClick={() => menuRecruiter && handleToggleBlock(menuRecruiter)}>
          🚫 {menuRecruiter?.status === "active" ? "Block" : "Unblock"}
        </MenuItem>
        <MenuItem onClick={() => menuRecruiter && handleDelete(menuRecruiter)} sx={{ color: "#dc2626" }}>
          🗑️ Delete
        </MenuItem>
      </Menu>

      <AdminRecruiterDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        recruiter={selectedRecruiter}
      />
    </>
  );
}
