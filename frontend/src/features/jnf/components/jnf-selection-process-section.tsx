import { useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import {
  createEmptyJnfSelectionRound,
  type JnfRecord,
  type JnfSelectionRound,
} from "../types";
import JnfFormGrid from "./jnf-form-grid";

type JnfSelectionProcessSectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  embedded?: boolean;
}>;

const roundStageOptions = [
  { value: "resume_shortlisting", label: "Resume Shortlisting" },
  { value: "written_test", label: "Written Test" },
  { value: "online_test", label: "Online Test" },
  { value: "technical_interview", label: "Technical Interview" },
  { value: "personal_interview", label: "Personal Interview" },
  { value: "psychometric_test", label: "Psychometric Test" },
  { value: "ppt", label: "Pre-Placement Talk" },
  { value: "group_discussion", label: "Group Discussion" },
  { value: "other", label: "Other" },
] as const;

const selectionModeOptions = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "hybrid", label: "Hybrid" },
] as const;

function createRoundRow(round_order: number): JnfSelectionRound {
  return {
    ...createEmptyJnfSelectionRound(),
    id: `round_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    round_order,
  };
}

export default function JnfSelectionProcessSection({
  form,
  setForm,
  fieldErrors,
  embedded = false,
}: JnfSelectionProcessSectionProps) {
  useEffect(() => {
    if (form.selection_process.rounds.length > 0) {
      return;
    }

    setForm((current) => ({
      ...current,
      selection_process: {
        ...current.selection_process,
        rounds: [createRoundRow(1)],
      },
    }));
  }, [form.selection_process.rounds.length, setForm]);

  function handleAddRound() {
    const nextOrder = form.selection_process.rounds.length + 1;

    setForm((current) => ({
      ...current,
      selection_process: {
        ...current.selection_process,
        rounds: [...current.selection_process.rounds, createRoundRow(nextOrder)],
      },
    }));
  }

  function handleUpdateRound(
    roundId: string,
    updates: Partial<JnfSelectionRound>
  ) {
    setForm((current) => ({
      ...current,
      selection_process: {
        ...current.selection_process,
        rounds: current.selection_process.rounds.map((round) =>
          round.id === roundId ? { ...round, ...updates } : round
        ),
      },
    }));
  }

  function handleRemoveRound(roundId: string) {
    setForm((current) => ({
      ...current,
      selection_process: {
        ...current.selection_process,
        rounds: current.selection_process.rounds
          .filter((round) => round.id !== roundId)
          .map((round, index) => ({
            ...round,
            round_order: index + 1,
          })),
      },
    }));
  }

  const content = (
    <Stack spacing={2.5}>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddRound}>
          Add Round
        </Button>
      </Stack>

      {form.selection_process.rounds.map((round, index) => (
        <Stack
          key={round.id || index}
          spacing={2}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Round {index + 1}
            </Typography>

            <Button
              variant="text"
              color="error"
              onClick={() => handleRemoveRound(round.id)}
              disabled={form.selection_process.rounds.length === 1}
            >
              Remove
            </Button>
          </Stack>

          <JnfFormGrid>
            <TextField
              select
              label="Selection / Hiring Stage"
              required
              value={round.round_category}
              onChange={(event) => {
                const selectedOption = roundStageOptions.find(o => o.value === event.target.value);
                handleUpdateRound(round.id, { 
                  round_category: event.target.value,
                  round_name: selectedOption?.label || event.target.value
                });
              }}
              error={Boolean(fieldErrors[`selection.rounds.${index}.round_category`])}
              helperText={fieldErrors[`selection.rounds.${index}.round_category`]}
              fullWidth
            >
              {roundStageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {round.round_category !== "resume_shortlisting" && (
              <>
                <TextField
                  select
                  label="Mode"
                  required
                  value={round.selection_mode}
                  onChange={(event) =>
                    handleUpdateRound(round.id, { selection_mode: event.target.value as any })
                  }
                  error={Boolean(fieldErrors[`selection.rounds.${index}.selection_mode`])}
                  helperText={fieldErrors[`selection.rounds.${index}.selection_mode`]}
                  fullWidth
                >
                  {selectionModeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Duration (minutes)"
                  required
                  type="number"
                  value={round.duration_minutes}
                  onChange={(event) =>
                    handleUpdateRound(round.id, { 
                      duration_minutes: event.target.value === "" ? "" : Number(event.target.value) 
                    })
                  }
                  error={Boolean(fieldErrors[`selection.rounds.${index}.duration_minutes`])}
                  helperText={fieldErrors[`selection.rounds.${index}.duration_minutes`]}
                  fullWidth
                />
              </>
            )}
          </JnfFormGrid>
        </Stack>
      ))}
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title="Selection Process"
      description="List the hiring stages and rounds your recruitment process will follow."
    >
      {content}
    </SectionCard>
  );
}
