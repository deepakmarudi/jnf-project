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
  { value: "Resume Shortlisting", label: "Resume Shortlisting" },
  { value: "Written Test", label: "Written Test" },
  { value: "Personal / Technical Interview", label: "Personal / Technical Interview" },
  { value: "Psychometric Test", label: "Psychometric Test" },
  { value: "Pre-Placement Talk", label: "Pre-Placement Talk" },
] as const;

const selectionModeOptions = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "hybrid", label: "Hybrid" },
] as const;

function createRoundRow(order: number): JnfSelectionRound {
  return {
    ...createEmptyJnfSelectionRound(),
    id: `round_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    order,
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
    field: keyof JnfSelectionRound,
    value: string | number | ""
  ) {
    setForm((current) => ({
      ...current,
      selection_process: {
        ...current.selection_process,
        rounds: current.selection_process.rounds.map((round) =>
          round.id === roundId
            ? {
                ...round,
                [field]: value,
              }
            : round
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
            order: index + 1,
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
              label="Round No"
              required
              type="number"
              value={round.order}
              onChange={(event) =>
                handleUpdateRound(
                  round.id,
                  "order",
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
              error={Boolean(fieldErrors[`selection.rounds.${index}.order`])}
              helperText={fieldErrors[`selection.rounds.${index}.order`]}
              fullWidth
            />

            <TextField
              select
              label="Selection / Hiring Stage"
              required
              value={round.round_name}
              onChange={(event) =>
                handleUpdateRound(round.id, "round_name", event.target.value)
              }
              error={Boolean(fieldErrors[`selection.rounds.${index}.round_name`])}
              helperText={fieldErrors[`selection.rounds.${index}.round_name`]}
              fullWidth
            >
              {roundStageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Mode"
              required
              value={round.mode}
              onChange={(event) =>
                handleUpdateRound(round.id, "mode", event.target.value)
              }
              error={Boolean(fieldErrors[`selection.rounds.${index}.mode`])}
              helperText={fieldErrors[`selection.rounds.${index}.mode`]}
              fullWidth
            >
              {selectionModeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Date & Time of the Round"
              required
              type="datetime-local"
              value={round.scheduled_at ? String(round.scheduled_at).replace(' ', 'T').substring(0, 16) : ""}
              onChange={(event) =>
                handleUpdateRound(round.id, "scheduled_at", event.target.value)
              }
              error={Boolean(fieldErrors[`selection.rounds.${index}.scheduled_at`])}
              helperText={fieldErrors[`selection.rounds.${index}.scheduled_at`]}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Duration (minutes)"
              required
              type="number"
              value={round.duration_minutes}
              onChange={(event) =>
                handleUpdateRound(
                  round.id,
                  "duration_minutes",
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
              error={Boolean(fieldErrors[`selection.rounds.${index}.duration_minutes`])}
              helperText={fieldErrors[`selection.rounds.${index}.duration_minutes`]}
              fullWidth
            />
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
      description="Add the hiring rounds, their stage, mode, date and time, and duration."
    >
      {content}
    </SectionCard>
  );
}
