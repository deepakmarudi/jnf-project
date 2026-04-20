import { useState, useEffect } from "react";
import { fetchJson } from "@/lib/fetch-json";

export type BackendProgramme = {
  id: number;
  code: string;
  name: string;
  level: "ug" | "pg" | "doctoral" | "other";
  duration_years: number;
  is_active: boolean;
};

export type BackendDiscipline = {
  id: number;
  name: string;
  short_name: string;
  is_active: boolean;
};

export type BackendDepartment = {
  id: number;
  code: string;
  name: string;
  type: string;
  is_active: boolean;
};

export function useMasterData() {
  const [programmes, setProgrammes] = useState<BackendProgramme[]>([]);
  const [disciplines, setDisciplines] = useState<BackendDiscipline[]>([]);
  const [departments, setDepartments] = useState<BackendDepartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMasterData() {
      try {
        setIsLoading(true);
        const [progRes, discRes, deptRes] = await Promise.all([
          fetchJson<BackendProgramme[]>("/portal/master/programmes"),
          fetchJson<BackendDiscipline[]>("/portal/master/disciplines"),
          fetchJson<BackendDepartment[]>("/portal/master/departments"),
        ]);

        setProgrammes(progRes.data);
        setDisciplines(discRes.data);
        setDepartments(deptRes.data);
      } catch (err: any) {
        setError(err?.message || "Failed to load master data");
        console.error("Master data load error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMasterData();
  }, []);

  return {
    programmes,
    disciplines,
    departments,
    isLoading,
    error,
  };
}
