"use client";

import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import EmptyState from "@/components/ui/empty-state";
import StatusChip from "@/components/ui/status-chip";
import { routes } from "@/lib/routes";
import type { JnfStatus } from "@/types/status";
import { useEffect } from "react";
import { listAdminJnfs, type AdminJnfOverview } from "../lib/admin-api";
import LoadingState from "@/components/ui/loading-state";

type QueueFilterStatus = "all" | "submitted" | "under_review" | "approved" | "rejected";
type SortOrder = "newest" | "oldest";

export default function AdminJnfsTable() {
  const [statusFilter, setStatusFilter] = useState<QueueFilterStatus>("submitted");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [adminJnfRecords, setAdminJnfRecords] = useState<AdminJnfOverview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJnfs() {
      try {
        const jnfs = await listAdminJnfs();
        setAdminJnfRecords(jnfs);
      } catch (error) {
        console.error("Failed to load admin JNFs: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJnfs();
  }, []);

  const filteredJnfs = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    const filtered = adminJnfRecords.filter((jnf) => {
      const matchesStatus =
        statusFilter === "all" ? true : jnf.status === statusFilter;
      const matchesSearch =
        lowerSearch.length === 0
          ? true
          : jnf.companyName.toLowerCase().includes(lowerSearch) ||
            jnf.jobTitle.toLowerCase().includes(lowerSearch);

      return matchesStatus && matchesSearch;
    });

    return filtered.sort((first, second) => {
      const firstDate = new Date(first.submittedAt).getTime();
      const secondDate = new Date(second.submittedAt).getTime();

      return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
    });
  }, [searchTerm, sortOrder, statusFilter, adminJnfRecords]);

  if (isLoading) {
    return <LoadingState message="Loading submissions..." />;
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as QueueFilterStatus)
          }
          sx={{ minWidth: { xs: "100%", md: 180 } }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="submitted">Pending</MenuItem>
          <MenuItem value="under_review">Under Review</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>

        <TextField
          label="Search company or job title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ flex: 1 }}
        />

        <TextField
          select
          label="Sort by date"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
          sx={{ minWidth: { xs: "100%", md: 180 } }}
        >
          <MenuItem value="newest">Newest first</MenuItem>
          <MenuItem value="oldest">Oldest first</MenuItem>
        </TextField>
      </Stack>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Default queue view is pending submissions so admin can focus on review first.
      </Typography>

      {filteredJnfs.length === 0 ? (
        <EmptyState
          title="No JNFs match the current filters"
          description="Try changing the status filter or search term to see more submissions."
        />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>JNF ID</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Recruiter</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJnfs.map((jnf, index) => (
                <TableRow
                  key={jnf.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    backgroundColor: index % 2 === 0 ? "inherit" : "#f9fafb",
                  }}
                >
                  <TableCell>{jnf.id}</TableCell>
                  <TableCell>{jnf.companyName}</TableCell>
                  <TableCell>{jnf.recruiterName}</TableCell>
                  <TableCell>{jnf.jobTitle}</TableCell>
                  <TableCell>{jnf.roleType}</TableCell>
                  <TableCell>{new Date(jnf.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusChip status={normalizeStatusForDisplay(jnf.status as JnfStatus)} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      href={routes.admin.jnfDetail(jnf.id)}
                      variant="outlined"
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

function normalizeStatusForDisplay(status: JnfStatus) {
  if (status === "submitted") {
    return "pending";
  }

  return status;
}
