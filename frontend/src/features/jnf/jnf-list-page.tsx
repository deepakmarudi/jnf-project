"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import LoadingState from "@/components/ui/loading-state";
import JnfList from "./components/jnf-list";
import JnfListFilters from "./components/jnf-list-filters";
import { deleteJnfCore, listJnfs } from "./lib/jnf-api";
import { mapBackendJnfCoreToRecord } from "./lib/jnf-mappers";
import {
  initialJnfListFilters,
  type JnfListFilterValues,
  type JnfRecord,
} from "./types";

export function getClientFlash() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  return params.get("success") ? { message: "JNF Updated successfully", severity: "success" as const } : null;
}

export default function JnfListPage() {
  const [filters, setFilters] = useState<JnfListFilterValues>(initialJnfListFilters);
  const [jnfs, setJnfs] = useState<JnfRecord[]>([]);
  const [flash, setFlash] = useState<{message: string, severity: "success" | "warning" | "error"} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const nextFlash = getClientFlash();

    if (nextFlash) {
      setFlash(nextFlash);
    }

    async function loadJnfs() {
      try {
        const response = await listJnfs();
        setJnfs(response.data.jnfs.map(mapBackendJnfCoreToRecord));
      } catch (error) {
        const apiError = error as { message?: string };
        setFlash({
          message: apiError.message ?? "Unable to load JNFs.",
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadJnfs();
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

  async function handleDeleteDraft(id: string) {
    const shouldDelete = window.confirm(
      "Do you want to delete this draft JNF?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteJnfCore(id);
      setJnfs((current) => current.filter((item) => item.id !== id));
      setFlash({
        message: "Draft deleted successfully.",
        severity: "success",
      });
    } catch (error) {
      const apiError = error as { message?: string };
      setFlash({
        message: apiError.message ?? "Unable to delete draft.",
        severity: "error",
      });
    }
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

        {isLoading ? (
          <LoadingState message="Loading JNFs..." />
        ) : (
          <JnfList items={filteredJnfs} onDeleteDraft={handleDeleteDraft} />
        )}
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
