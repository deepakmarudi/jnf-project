"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import JnfList from "./components/jnf-list";
import JnfListFilters from "./components/jnf-list-filters";
import {
  consumeJnfFlashMessage,
  deleteStoredJnf,
  type JnfFlashMessage,
  getStoredJnfs,
} from "./lib/jnf-storage";
import {
  initialJnfListFilters,
  type JnfListFilterValues,
  type JnfRecord,
} from "./types";

export default function JnfListPage() {
  const [filters, setFilters] = useState<JnfListFilterValues>(initialJnfListFilters);
  const [jnfs, setJnfs] = useState<JnfRecord[]>([]);
  const [flash, setFlash] = useState<JnfFlashMessage | null>(null);

  useEffect(() => {
    setJnfs(getStoredJnfs());

    const nextFlash = consumeJnfFlashMessage();

    if (nextFlash) {
      setFlash(nextFlash);
    }
  }, []);

  const seasonOptions = Array.from(
    new Set(jnfs.map((item) => item.recruitment_season).filter(Boolean))
  ).sort((a, b) => b.localeCompare(a));

  const normalizedSearch = filters.search.trim().toLowerCase();

  const filteredJnfs = jnfs.filter((item) => {
    const matchesStatus =
      filters.status === "all" || item.status === filters.status;

    const matchesSeason =
      filters.recruitment_season === "all" ||
      item.recruitment_season === filters.recruitment_season;

    const matchesSearch =
      normalizedSearch === "" ||
      item.jnf_number.toLowerCase().includes(normalizedSearch) ||
      item.job_title.toLowerCase().includes(normalizedSearch) ||
      item.job_designation.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSeason && matchesSearch;
  });

  function handleResetFilters() {
    setFilters(initialJnfListFilters);
  }

  function handleDeleteDraft(id: string) {
    const shouldDelete = window.confirm(
      "Do you want to delete this draft JNF?"
    );

    if (!shouldDelete) {
      return;
    }

    deleteStoredJnf(id);
    setJnfs(getStoredJnfs());
    setFlash({
      message: "Draft deleted successfully.",
      severity: "success",
    });
  }

  function handleCloseFlash() {
    setFlash(null);
  }

  return (
    <PageContainer>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography variant="h3">JNF Management</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Create, track, continue, preview, and submit Job Notification Forms.
            </Typography>
          </Stack>
        </Stack>

        <JnfListFilters
          filters={filters}
          seasonOptions={seasonOptions}
          onChange={setFilters}
          onReset={handleResetFilters}
        />

        <JnfList items={filteredJnfs} onDeleteDraft={handleDeleteDraft} />
      </Stack>

      <Snackbar
        open={Boolean(flash)}
        autoHideDuration={3000}
        onClose={handleCloseFlash}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseFlash}
          severity={flash?.severity ?? "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {flash?.message ?? ""}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
