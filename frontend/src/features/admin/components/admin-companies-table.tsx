"use client";

import { useState } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AdminCompanyDetailsModal from "./admin-company-details-modal";

type CompanyStatus = "approved" | "blocked" | "pending";

type CompanyRecruiter = {
  id: string;
  name: string;
  designation: string;
  email: string;
  status: "active" | "blocked";
};

type CompanyJnf = {
  id: string;
  title: string;
  status: "approved" | "pending" | "changes_requested";
  submittedAt: string;
};

type Company = {
  id: string;
  name: string;
  website: string;
  sector: string;
  recruiterCount: number;
  status: CompanyStatus;
  session: string;
  createdDate: string;
  recruiters: CompanyRecruiter[];
  jnfs: CompanyJnf[];
};

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Corp",
    website: "www.techcorp.com",
    sector: "Software",
    recruiterCount: 3,
    status: "approved",
    session: "2025-26",
    createdDate: "12 Aug 2025",
    recruiters: [
      {
        id: "r1",
        name: "John Doe",
        designation: "HR Manager",
        email: "john.doe@techcorp.com",
        status: "active",
      },
      {
        id: "r2",
        name: "Meera Singh",
        designation: "Talent Partner",
        email: "meera.singh@techcorp.com",
        status: "active",
      },
      {
        id: "r3",
        name: "Arun Roy",
        designation: "Recruitment Lead",
        email: "arun.roy@techcorp.com",
        status: "blocked",
      },
    ],
    jnfs: [
      {
        id: "j1",
        title: "Software Engineer",
        status: "approved",
        submittedAt: "18 Aug 2025",
      },
      {
        id: "j2",
        title: "Data Analyst",
        status: "pending",
        submittedAt: "02 Sep 2025",
      },
    ],
  },
  {
    id: "2",
    name: "Data Inc",
    website: "www.datainc.ai",
    sector: "Analytics",
    recruiterCount: 2,
    status: "pending",
    session: "2025-26",
    createdDate: "03 Sep 2025",
    recruiters: [
      {
        id: "r4",
        name: "Jane Smith",
        designation: "Talent Acquisition Lead",
        email: "jane.smith@datainc.ai",
        status: "active",
      },
      {
        id: "r5",
        name: "Nikhil Jain",
        designation: "Hiring Specialist",
        email: "nikhil.jain@datainc.ai",
        status: "active",
      },
    ],
    jnfs: [
      {
        id: "j3",
        title: "Business Analyst",
        status: "pending",
        submittedAt: "09 Sep 2025",
      },
    ],
  },
  {
    id: "3",
    name: "Innovate Labs",
    website: "www.innovatelabs.io",
    sector: "Research",
    recruiterCount: 1,
    status: "blocked",
    session: "2024-25",
    createdDate: "21 Jul 2024",
    recruiters: [
      {
        id: "r6",
        name: "Alice Brown",
        designation: "Senior HR Executive",
        email: "alice.brown@innovatelabs.io",
        status: "blocked",
      },
    ],
    jnfs: [
      {
        id: "j4",
        title: "R&D Associate",
        status: "changes_requested",
        submittedAt: "25 Jul 2024",
      },
      {
        id: "j5",
        title: "Embedded Engineer",
        status: "pending",
        submittedAt: "29 Jul 2024",
      },
    ],
  },
  {
    id: "4",
    name: "FinEdge Systems",
    website: "www.finedge.com",
    sector: "FinTech",
    recruiterCount: 4,
    status: "approved",
    session: "2025-26",
    createdDate: "28 Aug 2025",
    recruiters: [
      {
        id: "r7",
        name: "Rahul Kapoor",
        designation: "Head of Talent",
        email: "rahul.kapoor@finedge.com",
        status: "active",
      },
      {
        id: "r8",
        name: "Priya Das",
        designation: "HR Business Partner",
        email: "priya.das@finedge.com",
        status: "active",
      },
      {
        id: "r9",
        name: "Sana Ali",
        designation: "Campus Recruiter",
        email: "sana.ali@finedge.com",
        status: "active",
      },
      {
        id: "r10",
        name: "Vikram Rao",
        designation: "Recruitment Coordinator",
        email: "vikram.rao@finedge.com",
        status: "active",
      },
    ],
    jnfs: [
      {
        id: "j6",
        title: "Quant Analyst",
        status: "approved",
        submittedAt: "04 Sep 2025",
      },
      {
        id: "j7",
        title: "Backend Developer",
        status: "approved",
        submittedAt: "11 Sep 2025",
      },
      {
        id: "j8",
        title: "Risk Associate",
        status: "pending",
        submittedAt: "16 Sep 2025",
      },
    ],
  },
];

type DetailSection = "overview" | "recruiters" | "jnfs";

export default function AdminCompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialSection, setInitialSection] = useState<DetailSection>("overview");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCompany, setMenuCompany] = useState<Company | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    company: Company,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuCompany(company);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCompany(null);
  };

  const openDetails = (company: Company, section: DetailSection = "overview") => {
    setSelectedCompany(company);
    setInitialSection(section);
    setModalOpen(true);
    handleMenuClose();
  };

  const updateCompanyStatus = (company: Company, status: CompanyStatus) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((item) =>
        item.id === company.id ? { ...item, status } : item,
      ),
    );

    if (selectedCompany?.id === company.id) {
      setSelectedCompany({ ...company, status });
    }

    handleMenuClose();
  };

  const getStatusStyles = (status: CompanyStatus) => {
    if (status === "approved") {
      return { backgroundColor: "#16a34a", color: "#ffffff" };
    }

    if (status === "blocked") {
      return { backgroundColor: "#dc2626", color: "#ffffff" };
    }

    return { backgroundColor: "#f59e0b", color: "#111827" };
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Recruiters</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow
                key={company.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                  backgroundColor: index % 2 === 0 ? "inherit" : "#f9fafb",
                }}
              >
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell>{company.recruiterCount}</TableCell>
                <TableCell>
                  <Chip
                    label={company.status}
                    size="small"
                    sx={{
                      ...getStatusStyles(company.status),
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  />
                </TableCell>
                <TableCell>{company.session}</TableCell>
                <TableCell>{company.createdDate}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, company)}
                    size="small"
                  >
                    ...
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => menuCompany && openDetails(menuCompany)}>
          View Company Details
        </MenuItem>
        <MenuItem
          onClick={() => menuCompany && updateCompanyStatus(menuCompany, "approved")}
        >
          Approve Company
        </MenuItem>
        <MenuItem
          onClick={() => menuCompany && updateCompanyStatus(menuCompany, "blocked")}
        >
          Reject / Block Company
        </MenuItem>
        <MenuItem onClick={() => menuCompany && openDetails(menuCompany, "recruiters")}>
          View Company Recruiters
        </MenuItem>
        <MenuItem onClick={() => menuCompany && openDetails(menuCompany, "jnfs")}>
          View Company JNFs
        </MenuItem>
      </Menu>

      <AdminCompanyDetailsModal
        company={selectedCompany}
        initialSection={initialSection}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      />
    </>
  );
}
