"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PageContainer from "@/components/layout/page-container";
import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import { routes } from "@/lib/routes";
import JnfEditorActions from "./components/jnf-editor-actions";
import JnfForm from "./components/jnf-form";
import JnfProgressSummary from "./components/jnf-progress-summary";
import {
  createJnfId,
  getStoredJnfById,
  setJnfFlashMessage,
  upsertStoredJnf,
} from "./lib/jnf-storage";
import {
  getJnfFieldErrors,
  getJnfMissingRequiredFields,
} from "./lib/jnf-validation";
import { getJnfProgressSummary } from "./lib/jnf-section-progress";
import { emptyJnfRecord, type JnfRecord } from "./types";

type JnfEditorPageProps = Readonly<{
  mode: "create" | "edit";
  id?: string;
}>;

function buildJnfNumber(id: string) {
  const year = new Date().getFullYear();
  const shortId = id.slice(-4);
  return `JNF-${year}-${shortId}`;
}

export default function JnfEditorPage({
  mode,
  id,
}: JnfEditorPageProps) {
  const router = useRouter();

  const [form, setForm] = useState<JnfRecord>(emptyJnfRecord);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [pageError, setPageError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (mode === "create") {
      setForm(emptyJnfRecord);
      setIsLoading(false);
      return;
    }

    if (!id) {
      setPageError("Missing JNF id.");
      setIsLoading(false);
      return;
    }

    const storedJnf = getStoredJnfById(id);

    if (!storedJnf) {
      setPageError("JNF not found.");
      setIsLoading(false);
      return;
    }

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
      setForm({
        ...storedJnf,
        status: "draft",
      });
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
    setIsLoading(false);
  }, [mode, id]);

  const missingRequiredFields = useMemo(
    () => getJnfMissingRequiredFields(form),
    [form]
  );

  const fieldErrors = useMemo(() => getJnfFieldErrors(form), [form]);

  const progressSummary = useMemo(
    () => getJnfProgressSummary(form),
    [form]
  );

  function buildPersistedRecord(): JnfRecord {
    const recordId = form.id || createJnfId();
    const now = new Date().toISOString();

    return {
      ...form,
      id: recordId,
      jnf_number: form.jnf_number || buildJnfNumber(recordId),
      updated_at: now,
    };
  }

  function handleSaveDraft() {
    const nextRecord: JnfRecord = {
      ...buildPersistedRecord(),
      status: form.status === "changes_requested" ? "changes_requested" : "draft",
    };

    upsertStoredJnf(nextRecord);

    setJnfFlashMessage({
      message:
        form.status === "changes_requested"
          ? "Changes saved successfully."
          : form.id
            ? "Draft updated successfully."
            : "Draft saved successfully.",
      severity: "success",
    });

    router.push(routes.recruiter.jnfs);
  }

  function handlePreview() {
    const nextRecord = buildPersistedRecord();

    upsertStoredJnf(nextRecord);
    router.push(routes.recruiter.jnfPreview(nextRecord.id));
  }

  if (isLoading) {
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

  const saveLabel =
    form.status === "changes_requested" ? "Save Changes" : "Save as Draft";

  const previewLabel =
    form.submission_count > 0 || form.status === "changes_requested"
      ? "Preview & Resubmit"
      : "Preview & Submit";

  return (
    <PageContainer
      title={mode === "create" ? "Create New JNF" : "Edit JNF"}
      description="Fill the JNF details, save them as draft, and use preview before final submission."
    >
      <Stack spacing={3}>
        {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}

        {missingRequiredFields.length > 0 ? (
          <Alert severity="warning">
            {missingRequiredFields.length} required field
            {missingRequiredFields.length > 1 ? "s are" : " is"} still incomplete.
            You can save this as a draft or preview it now, but final submission
            will be blocked until these fields are completed.
          </Alert>
        ) : null}

        <JnfProgressSummary
          items={progressSummary.items}
          completedCount={progressSummary.completedCount}
          totalCount={progressSummary.totalCount}
        />

        <JnfForm
          form={form}
          setForm={setForm}
          fieldErrors={fieldErrors}
        />

        <JnfEditorActions
          saveLabel={saveLabel}
          previewLabel={previewLabel}
          onSaveDraft={handleSaveDraft}
          onPreview={handlePreview}
        />
      </Stack>
    </PageContainer>
  );
}
