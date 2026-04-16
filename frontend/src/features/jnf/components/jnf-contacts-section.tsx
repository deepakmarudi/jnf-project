import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import { createEmptyJnfContact, type JnfContact, type JnfRecord } from "../types";
import JnfFormGrid from "./jnf-form-grid";

type JnfContactsSectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
}>;

const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Either" },
] as const;

function createContactRow(role: JnfContact["role"]): JnfContact {
  return {
    ...createEmptyJnfContact(),
    id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    role,
  };
}

export default function JnfContactsSection({
  form,
  setForm,
  fieldErrors,
}: JnfContactsSectionProps) {
  useEffect(() => {
    if (form.contacts.length >= 2) {
      return;
    }

    setForm((current) => ({
      ...current,
      contacts: [
        createContactRow("primary_poc"),
        createContactRow("head_hr"),
      ],
    }));
  }, [form.contacts.length, setForm]);

  function handleUpdateContact(
    contactId: string,
    field: keyof JnfContact,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      contacts: current.contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              [field]: value,
            }
          : contact
      ),
    }));
  }

  function getContactError(
    role: "primary_poc" | "head_hr",
    field: "full_name" | "email" | "phone"
  ) {
    return fieldErrors[`contacts.${role}.${field}`];
  }

  return (
    <SectionCard
      title="Contacts"
      description="Fill the 2 required contacts for this JNF: Recruiter (PoC) and HR."
    >
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Both contacts are required before final submission.
        </Typography>

        {form.contacts.map((contact, index) => {
          const isRecruiterPoc = contact.role === "primary_poc";
          const isHrContact = contact.role === "head_hr";

          return (
            <Stack
              key={contact.id || index}
              spacing={2}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {isRecruiterPoc ? "Recruiter (PoC)" : isHrContact ? "HR Contact" : "Contact"}
              </Typography>

              <JnfFormGrid>
                <TextField
                  label="Full Name"
                  required
                  value={contact.full_name}
                  onChange={(event) =>
                    handleUpdateContact(contact.id, "full_name", event.target.value)
                  }
                  error={Boolean(
                    isRecruiterPoc
                      ? getContactError("primary_poc", "full_name")
                      : isHrContact
                        ? getContactError("head_hr", "full_name")
                        : undefined
                  )}
                  helperText={
                    isRecruiterPoc
                      ? getContactError("primary_poc", "full_name")
                      : isHrContact
                        ? getContactError("head_hr", "full_name")
                        : undefined
                  }
                  fullWidth
                />

                <TextField
                  label="Designation"
                  value={contact.designation}
                  onChange={(event) =>
                    handleUpdateContact(contact.id, "designation", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(event) =>
                    handleUpdateContact(contact.id, "email", event.target.value)
                  }
                  error={Boolean(
                    isRecruiterPoc
                      ? getContactError("primary_poc", "email")
                      : isHrContact
                        ? getContactError("head_hr", "email")
                        : fieldErrors[`contacts.${index}.email`]
                  )}
                  helperText={
                    isRecruiterPoc
                      ? getContactError("primary_poc", "email")
                      : isHrContact
                        ? getContactError("head_hr", "email")
                        : fieldErrors[`contacts.${index}.email`]
                  }
                  fullWidth
                />

                <TextField
                  label="Phone"
                  required
                  value={contact.phone}
                  onChange={(event) =>
                    handleUpdateContact(contact.id, "phone", event.target.value)
                  }
                  error={Boolean(
                    isRecruiterPoc
                      ? getContactError("primary_poc", "phone")
                      : isHrContact
                        ? getContactError("head_hr", "phone")
                        : undefined
                  )}
                  helperText={
                    isRecruiterPoc
                      ? getContactError("primary_poc", "phone")
                      : isHrContact
                        ? getContactError("head_hr", "phone")
                        : undefined
                  }
                  fullWidth
                />

                <TextField
                  label="Alternate Phone"
                  value={contact.alternate_phone}
                  onChange={(event) =>
                    handleUpdateContact(
                      contact.id,
                      "alternate_phone",
                      event.target.value
                    )
                  }
                  fullWidth
                />

                <TextField
                  select
                  label="Preferred Contact Method"
                  value={contact.preferred_contact_method}
                  onChange={(event) =>
                    handleUpdateContact(
                      contact.id,
                      "preferred_contact_method",
                      event.target.value
                    )
                  }
                  fullWidth
                >
                  {contactMethodOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Remarks"
                  value={contact.remarks}
                  onChange={(event) =>
                    handleUpdateContact(contact.id, "remarks", event.target.value)
                  }
                  fullWidth
                />
              </JnfFormGrid>
            </Stack>
          );
        })}
      </Stack>
    </SectionCard>
  );
}
