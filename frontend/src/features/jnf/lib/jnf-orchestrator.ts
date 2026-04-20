import { emptyJnfRecord, type JnfRecord } from "../types";
import {
  createJnfCore,
  getJnfCore,
  updateJnfCore,
} from "./jnf-api";
import {
  mapBackendContactsToRecord,
  mapBackendDeclarationToRecord,
  mapBackendRoundsToRecord,
  mapBackendSalaryToRecord,
  mapEligibilityResponseToRecord,
  mapBackendJnfCoreToRecord,
} from "./jnf-mappers";

export async function saveJnfFullRecord(record: JnfRecord): Promise<JnfRecord> {
  const isCreation = !record.id || isNaN(Number(record.id));
  
  // Send the record directly. The backend JnfService now handles bridging.
  const payload = record as any;

  let response;
  if (isCreation) {
    response = await createJnfCore(payload);
  } else {
    response = await updateJnfCore(record.id, payload);
  }

  // The backend update/create returns the full hydrated record via show()
  // But we use fetchJnfFullRecord as a final guarantee of a clean state
  const stringJnfId = String(response.data.jnf.id);
  return fetchJnfFullRecord(stringJnfId);
}

function sanitizeNulls(obj: any): any {
  if (obj === null) return "";
  if (Array.isArray(obj)) return obj.map(sanitizeNulls);
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = sanitizeNulls(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export async function fetchJnfFullRecord(jnfId: string | number): Promise<JnfRecord> {
  const coreReq = await getJnfCore(jnfId);
  const data = coreReq.data.jnf as any;

  const coreFields = mapBackendJnfCoreToRecord(data);

  return {
    ...coreFields,
    required_skills: data.required_skills ?? [],
    contacts: data.contacts ? mapBackendContactsToRecord(data.contacts) : [],
    eligibility: Object.keys(data.eligibility ?? {}).length > 0 
      ? { ...emptyJnfRecord.eligibility, ...sanitizeNulls(data.eligibility) }
      : emptyJnfRecord.eligibility,
    salary_details: Object.keys(data.salary_details ?? {}).length > 0 
      ? { ...emptyJnfRecord.salary_details, ...sanitizeNulls(data.salary_details) }
      : emptyJnfRecord.salary_details,
    selection_process: Object.keys(data.selection_process ?? {}).length > 0
      ? { ...emptyJnfRecord.selection_process, ...sanitizeNulls(data.selection_process) }
      : emptyJnfRecord.selection_process,
    additional_details: Object.keys(data.additional_details ?? {}).length > 0 
      ? { ...emptyJnfRecord.additional_details, ...sanitizeNulls(data.additional_details) }
      : emptyJnfRecord.additional_details,
    declaration: mapBackendDeclarationToRecord(data.declaration ?? null),
  };
}
