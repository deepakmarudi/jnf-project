"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

type DetailSection = "overview" | "recruiters" | "jnfs";

type AdminCompanyDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  company: Company | null;
  initialSection?: DetailSection;
};

export default function AdminCompanyDetailsModal({
  open,
  onClose,
  company,
  initialSection = "overview",
}: AdminCompanyDetailsModalProps) {
  const [activeSection, setActiveSection] = useState<DetailSection>(initialSection);

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection, open]);

  if (!company) return null;

  const getCompanyStatusStyles = (status: CompanyStatus) => {
    if (status === "approved") {
      return { backgroundColor: "#16a34a", color: "#ffffff" };
    }

    if (status === "blocked") {
      return { backgroundColor: "#dc2626", color: "#ffffff" };
    }

    return { backgroundColor: "#f59e0b", color: "#111827" };
  };

  const getRecruiterStatusStyles = (status: CompanyRecruiter["status"]) => {
    return status === "active"
      ? { backgroundColor: "#dcfce7", color: "#166534" }
      : { backgroundColor: "#fee2e2", color: "#991b1b" };
  };

  const getJnfStatusStyles = (status: CompanyJnf["status"]) => {
    if (status === "approved") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    }

    if (status === "changes_requested") {
      return { backgroundColor: "#fef3c7", color: "#92400e" };
    }

    return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: 700, fontSize: "1.25rem" }}>
        Company Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1}>
            <Button
              variant={activeSection === "overview" ? "contained" : "outlined"}
              onClick={() => setActiveSection("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeSection === "recruiters" ? "contained" : "outlined"}
              onClick={() => setActiveSection("recruiters")}
            >
              Recruiters
            </Button>
            <Button
              variant={activeSection === "jnfs" ? "contained" : "outlined"}
              onClick={() => setActiveSection("jnfs")}
            >
              JNFs
            </Button>
          </Stack>

          <Divider />

          {activeSection === "overview" && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Basic Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Company Name
                    </Typography>
                    <Typography variant="body1">{company.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Website
                    </Typography>
                    <Typography variant="body1">{company.website}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Sector
                    </Typography>
                    <Typography variant="body1">{company.sector}</Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Admin Summary
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Recruitment Session
                    </Typography>
                    <Typography variant="body1">{company.session}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Added On
                    </Typography>
                    <Typography variant="body1">{company.createdDate}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Recruiters Count
                    </Typography>
                    <Typography variant="body1">{company.recruiterCount}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Current Status
                    </Typography>
                    <Chip
                      label={company.status}
                      size="small"
                      sx={{
                        ...getCompanyStatusStyles(company.status),
                        fontWeight: 500,
                        borderRadius: 999,
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          )}

          {activeSection === "recruiters" && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recruiters Of {company.name}
              </Typography>
              {company.recruiters.map((recruiter) => (
                <Box
                  key={recruiter.id}
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {recruiter.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {recruiter.designation}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {recruiter.email}
                      </Typography>
                    </Box>
                    <Chip
                      label={recruiter.status}
                      size="small"
                      sx={{
                        ...getRecruiterStatusStyles(recruiter.status),
                        fontWeight: 500,
                        borderRadius: 999,
                        alignSelf: "flex-start",
                      }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}

          {activeSection === "jnfs" && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                JNFs Submitted By {company.name}
              </Typography>
              {company.jnfs.map((jnf) => (
                <Box
                  key={jnf.id}
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {jnf.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Submitted on {jnf.submittedAt}
                      </Typography>
                    </Box>
                    <Chip
                      label={jnf.status}
                      size="small"
                      sx={{
                        ...getJnfStatusStyles(jnf.status),
                        fontWeight: 500,
                        borderRadius: 999,
                        alignSelf: "flex-start",
                      }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
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
