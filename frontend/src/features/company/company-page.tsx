"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import PageContainer from "@/components/layout/page-container";
import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import { routes } from "@/lib/routes";
import {
  getRecruiterSession,
  updateRecruiterCompanyCompletion,
} from "@/features/auth/lib/mock-auth";
import CompanyProfileForm from "./components/company-profile-form";
import CompanyProfileView from "./components/company-profile-view";
import {
  getCompanyProfileForRecruiter,
  upsertCompanyProfileForRecruiter,
} from "./lib/company-storage";
import {
  initialCompanyProfile,
  isCompanyProfileComplete,
  type CompanyPageMode,
  type CompanyProfile,
  type CompanyProfileErrors,
} from "./types";

function validateCompanyProfile(
  values: CompanyProfile
): CompanyProfileErrors {
  const errors: CompanyProfileErrors = {};

  if (!values.name.trim()) {
    errors.name = "Company name is required.";
  }

  if (!values.website.trim()) {
    errors.website = "Website is required.";
  }

  if (!values.postal_address.trim()) {
    errors.postal_address = "Postal address is required.";
  }

  if (!values.sector.trim()) {
    errors.sector = "Sector is required.";
  }

  if (!values.category_or_org_type.trim()) {
    errors.category_or_org_type = "Organization type is required.";
  }

  if (!values.hq_country.trim()) {
    errors.hq_country = "Headquarters country is required.";
  }

  if (!values.hq_city.trim()) {
    errors.hq_city = "Headquarters city is required.";
  }

  return errors;
}

export default function CompanyPage() {
  const router = useRouter();

  const [form, setForm] = useState<CompanyProfile>(initialCompanyProfile);
  const [errors, setErrors] = useState<CompanyProfileErrors>({});
  const [pageMode, setPageMode] = useState<CompanyPageMode>("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const recruiterSession = getRecruiterSession();

    if (!recruiterSession?.is_logged_in) {
      router.replace(routes.public.login);
      return;
    }

    const savedProfile = getCompanyProfileForRecruiter(
      recruiterSession.recruiter_id
    );

    if (!savedProfile) {
      setForm(initialCompanyProfile);
      setHasCompletedProfile(false);
      setPageMode("edit");

      if (recruiterSession.company_profile_completed) {
        updateRecruiterCompanyCompletion(recruiterSession.recruiter_id, false);
      }

      setIsLoading(false);
      return;
    }

    const completed = isCompanyProfileComplete(savedProfile);

    setForm(savedProfile);
    setHasCompletedProfile(completed);
    setPageMode(completed ? "view" : "edit");

    if (completed !== recruiterSession.company_profile_completed) {
      updateRecruiterCompanyCompletion(recruiterSession.recruiter_id, completed);
    }

    setIsLoading(false);
  }, [router]);

  function handleSave() {
    const validationErrors = validateCompanyProfile(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all required company fields before saving.");
      setSnackbarOpen(true);
      return;
    }

    const recruiterSession = getRecruiterSession();

    if (!recruiterSession?.is_logged_in) {
      router.replace(routes.public.login);
      return;
    }

    setIsSaving(true);

    upsertCompanyProfileForRecruiter(recruiterSession.recruiter_id, form);
    updateRecruiterCompanyCompletion(recruiterSession.recruiter_id, true);
    setErrors({});

    const wasFirstCompletion = !hasCompletedProfile;

    setHasCompletedProfile(true);
    setIsSaving(false);

    if (wasFirstCompletion) {
      setSnackbarSeverity("success");
      setSnackbarMessage(
        "Company profile saved successfully. Redirecting to dashboard."
      );
      setSnackbarOpen(true);

      window.setTimeout(() => {
        router.replace(routes.recruiter.dashboard);
      }, 900);

      return;
    }

    setPageMode("view");
    setSnackbarSeverity("success");
    setSnackbarMessage("Company profile updated successfully.");
    setSnackbarOpen(true);
  }

  function handleEdit() {
    setErrors({});
    setPageMode("edit");
  }

  function handleCancelEdit() {
    const recruiterSession = getRecruiterSession();

    if (!recruiterSession?.is_logged_in) {
      router.replace(routes.public.login);
      return;
    }

    const savedProfile = getCompanyProfileForRecruiter(
      recruiterSession.recruiter_id
    );

    if (savedProfile) {
      setForm(savedProfile);
    }

    setErrors({});
    setPageMode("view");
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  if (isLoading) {
    return (
      <PageContainer title="Company Profile">
        <LoadingState message="Loading company profile..." />
      </PageContainer>
    );
  }

  if (pageError) {
    return (
      <PageContainer title="Company Profile">
        <ErrorState message={pageError} />
      </PageContainer>
    );
  }

  const description =
    pageMode === "view"
      ? "Review the saved company details currently used across recruiter workflows and JNF submissions."
      : hasCompletedProfile
        ? "Update the organization details used across recruiter workflows and future JNF submissions."
        : "Complete the company profile to unlock the recruiter dashboard and JNF workflow.";

  return (
    <PageContainer title="Company Profile" description={description}>
      <Stack spacing={3}>
        {pageMode === "edit" && !hasCompletedProfile ? (
          <Alert severity="info">
            Complete and save the company profile to continue to the recruiter dashboard.
          </Alert>
        ) : null}

        {pageMode === "view" ? (
          <CompanyProfileView profile={form} onEdit={handleEdit} />
        ) : (
          <CompanyProfileForm
            form={form}
            setForm={setForm}
            errors={errors}
            onSave={handleSave}
            isSaving={isSaving}
            onCancel={hasCompletedProfile ? handleCancelEdit : undefined}
            submitLabel={
              hasCompletedProfile ? "Save Changes" : "Save Company Profile"
            }
          />
        )}
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
