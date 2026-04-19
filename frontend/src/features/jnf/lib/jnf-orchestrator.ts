import type { JnfRecord } from "../types";
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
  mapContactToBackendPayload,
  mapEligibilityResponseToRecord,
  mapBackendJnfCoreToRecord,
  mapRecordCoreToBackendPayload,
  mapRecordDeclarationToBackendPayload,
  mapRecordEligibilityToBackendPayload,
  mapRecordSalaryToBackendPayload,
  mapRoundToBackendPayload,
} from "./jnf-mappers";

export async function saveJnfFullRecord(record: JnfRecord): Promise<JnfRecord> {
  const isCreation = !record.id || isNaN(Number(record.id));
  
  const payload = {
    ...mapRecordCoreToBackendPayload(record),
    contacts: record.contacts.map(mapContactToBackendPayload),
    eligibility: mapRecordEligibilityToBackendPayload(record),
    salary_packages: mapRecordSalaryToBackendPayload(record).salary_packages,
    selection_rounds: record.selection_process.rounds.map(mapRoundToBackendPayload),
    declaration: mapRecordDeclarationToBackendPayload(record),
  };

  let response;
  if (isCreation) {
    // If it's pure creation, first we make the core shell to get the ID
    response = await createJnfCore(payload);
    if (!response.data.jnf.id) throw new Error("Failed to create JNF shell.");
    
    // Immediately stream the payload to hydration
    response = await updateJnfCore(response.data.jnf.id, payload);
  } else {
    // Standard massive monolithic Transact Upsert
    response = await updateJnfCore(record.id, payload);
  }

  // Reload the deeply hydrated native response direct from Server
  const stringJnfId = String(response.data.jnf.id);
  return fetchJnfFullRecord(stringJnfId);
}

export async function fetchJnfFullRecord(jnfId: string | number): Promise<JnfRecord> {
  const coreReq = await getJnfCore(jnfId);
  const data = coreReq.data.jnf;

  const coreFields = mapBackendJnfCoreToRecord(data);

  return {
    ...coreFields,
    contacts: data.contacts ? mapBackendContactsToRecord(data.contacts) : [],
    eligibility: data.eligibility_rule 
      ? mapEligibilityResponseToRecord({ 
          jnf_id: Number(jnfId), 
          eligibility_rule: data.eligibility_rule, 
          programme_rows: data.eligible_programmes ?? [], 
          discipline_rows: data.eligible_disciplines ?? [] 
        })
      : mapEligibilityResponseToRecord({ 
          jnf_id: Number(jnfId), 
          eligibility_rule: null, 
          programme_rows: [], 
          discipline_rows: [] 
        }),
    salary_details: data.salary_packages ? mapBackendSalaryToRecord(data.salary_packages) : mapBackendSalaryToRecord([]),
    selection_process: {
      ...coreFields.selection_process,
      rounds: data.selection_rounds ? mapBackendRoundsToRecord(data.selection_rounds) : [],
    },
    declaration: mapBackendDeclarationToRecord(data.declaration ?? null),
  };
}
