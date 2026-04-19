"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import PageContainer from "@/components/layout/page-container";
import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import useRecruiterSession from "@/features/auth/hooks/use-recruiter-session";
import { getMyCompanyProfile } from "@/features/company/lib/company-api";
import type { CompanyProfile } from "@/features/company/types";
import { routes } from "@/lib/routes";
import JnfForm from "./components/jnf-form";
import {
  getJnfFieldErrors,
  getJnfMissingRequiredFields,
} from "./lib/jnf-validation";
import {
  getJnfSectionValidity,
  initialJnfCompletedSections,
  jnfSectionOrder,
  type JnfCompletedSections,
} from "./lib/jnf-section-validation";
import { fetchJnfFullRecord, saveJnfFullRecord } from "./lib/jnf-orchestrator";
import { submitJnf } from "./lib/jnf-api";
import { emptyJnfRecord, type JnfRecord } from "./types";
import { useAutoSave } from "./hooks/use-auto-save";

type JnfEditorPageProps = Readonly<{
  mode: "create" | "edit";
  id?: string;
}>;

export default function JnfEditorPage({
  mode,
  id,
}: JnfEditorPageProps) {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useRecruiterSession();

  const [form, setForm] = useState<JnfRecord>(emptyJnfRecord);
  const [completedSections, setCompletedSections] =
    useState<JnfCompletedSections>(initialJnfCompletedSections);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const { status, lastSavedAt } = useAutoSave({
    data: form,
    enabled: !isLoading && !isSessionLoading && form !== emptyJnfRecord,
    debounceMs: 1500,
    onSave: async (currentForm) => {
      // Sync to local storage as fallback
      if (mode === 'create') {
        localStorage.setItem('jnf_new_draft', JSON.stringify(currentForm));
      }

      // Don't auto-save if we are already in a manual save process
      setIsAutoSaving(true);
      try {
        const savedRecord = await saveJnfFullRecord(currentForm);
        
        // Clear local storage on successful backend save
        localStorage.removeItem('jnf_new_draft');

        // If we were in create mode and now have an ID, transition to edit mode
        if (mode === "create" && savedRecord.id) {
          // Replace URL without reloading to avoid losing focus if possible
          // But actually, Next.js push/replace is better for state sync
          router.replace(`${routes.recruiter.jnfs}/${savedRecord.id}`);
        }
        
        setForm(savedRecord);
      } finally {
        setIsAutoSaving(false);
      }
    },
  });

  useEffect(() => {
    if (isSessionLoading || !session?.is_logged_in) {
      return;
    }

    let isMounted = true;

    async function loadCompanyProfile() {
      try {
        const profile = await getMyCompanyProfile();

        if (!isMounted) {
          return;
        }

        setCompanyProfile(profile);
      } catch {
        if (!isMounted) {
          return;
        }

        setCompanyProfile(null);
      }
    }

    loadCompanyProfile();

    return () => {
      isMounted = false;
    };
  }, [isSessionLoading, session]);

  useEffect(() => {
    if (isSessionLoading) {
      return;
    }

    if (mode === "create") {
      const savedDraft = typeof window !== 'undefined' ? localStorage.getItem('jnf_new_draft') : null;
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          setForm(parsed);
          setCompletedSections(getJnfSectionValidity(parsed, companyProfile));
        } catch {
          setForm(emptyJnfRecord);
        }
      } else {
        setForm(emptyJnfRecord);
      }
      setIsLoading(false);
      return;
    }

    if (!id) {
      setPageError("Missing JNF id.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadJnf() {
      try {
        const storedJnf = await fetchJnfFullRecord(id as string);

        if (!isMounted) return;

        const canUseSelfEdit =
          storedJnf.status === "submitted" &&
          storedJnf.submission_count === 1 &&
          !storedJnf.self_edit_used;

        const canEditNormally =
          storedJnf.status === "draft" ||
          storedJnf.status === "changes_requested";

        if (storedJnf.status === "approved" || storedJnf.status === "rejected") {
          setPageError("This JNF is read-only. You can preview it, but not edit it.");
          setIsLoading(false);
          return;
        }

        if (canUseSelfEdit) {
          const nextRecord = {
            ...storedJnf,
            status: "draft" as const,
          };

          setForm(nextRecord);
          setCompletedSections(getJnfSectionValidity(nextRecord, companyProfile));
          setInfoMessage(
            "You are using your one-time self-edit option. After resubmission, self-edit will no longer be available."
          );
          setIsLoading(false);
          return;
        }

        if (!canEditNormally) {
          setPageError("This JNF can no longer be edited. You can still preview it.");
          setIsLoading(false);
          return;
        }

        setForm(storedJnf);
        setCompletedSections(getJnfSectionValidity(storedJnf, companyProfile));
        setIsLoading(false);
      } catch {
        if (!isMounted) return;
        setPageError("Unable to load the requested JNF.");
        setIsLoading(false);
      }
    }

    loadJnf();

    return () => {
      isMounted = false;
    };
  }, [mode, id, companyProfile, isSessionLoading]);

  const missingRequiredFields = useMemo(
    () => getJnfMissingRequiredFields(form),
    [form]
  );

  const fieldErrors = useMemo(() => getJnfFieldErrors(form), [form]);

  const sectionValidity = useMemo(
    () => getJnfSectionValidity(form, companyProfile),
    [form, companyProfile]
  );

  const allSectionsCompleted = jnfSectionOrder.every((sectionKey) =>
    sectionKey === "company_summary"
      ? sectionValidity.company_summary
      : completedSections[sectionKey] && sectionValidity[sectionKey]
  );

  async function handleSaveDraft() {
    setIsSaving(true);
    try {
      const nextRecord = await saveJnfFullRecord(form);
      setForm(nextRecord);
      
      router.push(routes.recruiter.jnfs);
    } catch {
      alert("Failed to save the draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmitJnf() {
    if (!allSectionsCompleted || missingRequiredFields.length > 0) {
      return;
    }

    setIsSaving(true);
    try {
      // First save it completely
      const nextRecord = await saveJnfFullRecord(form);
      
      // Then trigger the submit workflow
      await submitJnf(nextRecord.id);
      
      router.push(routes.recruiter.jnfs);
    } catch {
      alert("Failed to submit the JNF. Please ensure everything is valid.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isSessionLoading || isLoading) {
    return (
      <PageContainer title="JNF Editor">
        <LoadingState message="Loading JNF..." />
      </PageContainer>
    );
  }

  if (pageError) {
    return (
      <PageContainer title="JNF Editor">
        <ErrorState message={pageError} />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={mode === "create" ? "Create New JNF" : "Edit JNF"}
      description="Complete and save each accordion section one by one before submitting the JNF."
      action={
        <Stack direction="row" alignItems="center" spacing={1}>
          {status === "saving" || isAutoSaving ? (
            <CircularProgress size={16} color="inherit" />
          ) : null}
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {status === "saving" || isAutoSaving
              ? "Auto-saving..."
              : status === "saved" && lastSavedAt
              ? `Last saved at ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : "Draft ready"}
          </Typography>
        </Stack>
      }
    >
      <Stack spacing={3}>
        {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}

        {missingRequiredFields.length > 0 ? (
          <Alert severity="warning">
            Complete the required fields in each section, then click that section&apos;s
            Save Changes button to mark it as completed.
          </Alert>
        ) : (
          <Alert severity="success">
            All required fields are filled. Save each section to unlock final submission.
          </Alert>
        )}

        <JnfForm
          form={form}
          setForm={setForm}
          fieldErrors={fieldErrors}
          sectionValidity={sectionValidity}
          completedSections={completedSections}
          setCompletedSections={setCompletedSections}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitJnf}
              disabled={!allSectionsCompleted}
            >
              Submit JNF
            </Button>
          </Stack>
        </Box>
      </Stack>
    </PageContainer>
  );
}
