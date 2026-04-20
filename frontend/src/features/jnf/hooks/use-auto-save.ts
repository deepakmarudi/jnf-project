import { useEffect, useRef, useState } from "react";

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  debounceMs?: number;
  enabled?: boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  debounceMs = 2000,
  enabled = true,
}: UseAutoSaveOptions<T>) {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const lastSavedDataRef = useRef<string>(JSON.stringify(data));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const currentDataJson = JSON.stringify(data);
    
    // Don't trigger if data hasn't changed from what we last tried to save
    if (currentDataJson === lastSavedDataRef.current) {
      return;
    }

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setStatus("idle"); // Indicate pending change

    timerRef.current = setTimeout(async () => {
      setStatus("saving");
      setError(null);
      
      try {
        await onSave(data);
        lastSavedDataRef.current = currentDataJson;
        setLastSavedAt(new Date());
        setStatus("saved");
      } catch (err: any) {
        setError(err?.message || "Failed to auto-save");
        setStatus("error");
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, onSave, debounceMs, enabled]);

  return {
    status,
    lastSavedAt,
    error,
  };
}
