"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import SectionCard from "@/components/ui/section-card";
import StatusChip from "@/components/ui/status-chip";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { getMyCompanyProfile } from "@/features/company/lib/company-api";
import type { CompanyProfile } from "@/features/company/types";
import { routes } from "@/lib/routes";
import JnfPreviewAcknowledgement from "./components/jnf-preview-acknowledgement";
import { fetchJnfFullRecord } from "./lib/jnf-orchestrator";
import { submitJnf } from "./lib/jnf-api";
import { getJnfMissingRequiredFields } from "./lib/jnf-validation";
import type { JnfRecord } from "./types";
import { JnfDisplaySections } from "./components/jnf-display-sections";

type JnfPreviewPageProps = Readonly<{
  id: string;
}>;

function PreviewGrid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}

function toHumanLabel(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  if (value === "yes") {
    return "Yes";
  }

  if (value === "no") {
    return "No";
  }

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatPreviewValue(value: string | number | boolean | string[] | null) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided yet";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value === null || value === "") {
    return "Not provided yet";
  }

  if (typeof value === "string") {
    return toHumanLabel(value);
  }

  return String(value);
}

function formatDateOnly(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not submitted yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatRoundSchedule(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value: number | "" | null, currency: string) {
  if (value === "" || value === null) {
    return "Not provided yet";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatContactType(type: string) {
  if (type === "primary_poc") {
    return "Recruiter (PoC)";
  }

  if (type === "head_hr") {
    return "HR";
  }

  if (type === "secondary_poc") {
    return "Secondary PoC";
  }

  return toHumanLabel(type);
}

function formatCourseApplicability(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  if (value === "all_courses") {
    return "All selected eligible candidates";
  }

  return toHumanLabel(value);
}

function PreviewField({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | number | boolean | string[] | null;
}>) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="body2">{formatPreviewValue(value)}</Typography>
    </Stack>
  );
}

export default function JnfPreviewPage({ id }: JnfPreviewPageProps) {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useRecruiterSession();

  const [record, setRecord] = useState<JnfRecord | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isSessionLoading) {
      return;
    }

    let isMounted = true;

    async function loadPreviewState() {
      try {
        const storedJnf = await fetchJnfFullRecord(id);

        if (!storedJnf) {
          if (!isMounted) return;
          setPageError("JNF not found.");
          setIsLoading(false);
          return;
        }

        if (session?.is_logged_in) {
          try {
            const profile = await getMyCompanyProfile();
            if (isMounted) setCompanyProfile(profile);
          } catch {
            if (isMounted) setCompanyProfile(null);
          }
        }

        if (!isMounted) return;
        setRecord(storedJnf);
        setIsLoading(false);
      } catch {
        if (!isMounted) return;
        setPageError("JNF could not be safely loaded from server.");
        setIsLoading(false);
      }
    }

    loadPreviewState();

    return () => {
      isMounted = false;
    };
  }, [id, isSessionLoading, session]);

  const missingRequiredFields = useMemo(
    () => (record ? getJnfMissingRequiredFields(record) : []),
    [record]
  );

  async function handleFinalSubmit() {
    if (!record || !acknowledged) {
      return;
    }

    if (missingRequiredFields.length > 0) {
      setSubmitError(
        `Complete these required fields before final submission: ${missingRequiredFields.join(", ")}.`
      );
      return;
    }

    try {
      await submitJnf(record.id);
      router.push(routes.recruiter.jnfs + "?success=true");
    } catch {
      setSubmitError("Failed to submit. Check missing constraints or network connection.");
    }
  }

  if (isSessionLoading || isLoading) {
    return (
      <PageContainer title="JNF Preview">
        <LoadingState message="Loading preview..." />
      </PageContainer>
    );
  }

  if (pageError || !record) {
    return (
      <PageContainer title="JNF Preview">
        <ErrorState message={pageError || "Unable to load preview."} />
      </PageContainer>
    );
  }

  const canSubmit =
    record.status === "draft" || record.status === "changes_requested";

  return (
    <PageContainer
      title="JNF Preview"
      description="Review the JNF in read-only mode before final submission."
    >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{record.jnf_number || "Draft JNF"}</Typography>
          <StatusChip status={record.status} />
        </Stack>

        {record.admin_feedback ? (
          <Alert severity={record.status === "rejected" ? "error" : "warning"}>
            {record.admin_feedback}
          </Alert>
        ) : null}

        {canSubmit ? (
          <Alert severity="info">
            Review each section carefully. Final submission is allowed only after acknowledgement and completion of all required fields.
          </Alert>
        ) : (
          <Alert severity="info">
            This JNF is currently read-only. Preview remains available, but editing and submission are locked for this status.
          </Alert>
        )}

        {missingRequiredFields.length > 0 ? (
          <Alert severity="warning">
            Required fields still missing: {missingRequiredFields.join(", ")}.
          </Alert>
        ) : null}

        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <JnfDisplaySections record={record} companyProfile={companyProfile} />

        {canSubmit ? (
          <JnfPreviewAcknowledgement
            acknowledged={acknowledged}
            onAcknowledgedChange={setAcknowledged}
            onSubmit={handleFinalSubmit}
          />
        ) : null}
      </Stack>
    </PageContainer>
  );
}
