import type { JnfRecord } from "../types";
import {
  createJnfContact,
  createJnfCore,
  createJnfRound,
  deleteJnfContact,
  deleteJnfRound,
  getJnfCore,
  getJnfDeclaration,
  getJnfEligibility,
  getJnfSalary,
  listJnfContacts,
  listJnfRounds,
  updateJnfContact,
  updateJnfCore,
  updateJnfRound,
  upsertJnfDeclaration,
  upsertJnfEligibility,
  upsertJnfSalary,
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
  const corePayload = mapRecordCoreToBackendPayload(record);

  // 1. CORE JNF
  let coreResponse;
  if (isCreation) {
    coreResponse = await createJnfCore(corePayload);
  } else {
    coreResponse = await updateJnfCore(record.id, corePayload);
  }

  const jnfId = coreResponse.data.jnf.id;
  const stringJnfId = String(jnfId);

  // 2. ELIGIBILITY
  await upsertJnfEligibility(
    jnfId,
    mapRecordEligibilityToBackendPayload(record)
  );

  // 3. SALARY
  await upsertJnfSalary(jnfId, mapRecordSalaryToBackendPayload(record));

  // 4. DECLARATION
  await upsertJnfDeclaration(
    jnfId,
    mapRecordDeclarationToBackendPayload(record)
  );

  // 5. CONTACTS SYNC
  const existingContactsRes = await listJnfContacts(jnfId);
  const existingContacts = existingContactsRes.data.contacts;
  
  // Create / Update
  for (const contact of record.contacts) {
    const payload = mapContactToBackendPayload(contact);
    if (!contact.id || isNaN(Number(contact.id))) {
      if (contact.email || contact.full_name) {
        await createJnfContact(jnfId, payload);
      }
    } else {
      await updateJnfContact(contact.id, payload);
    }
  }
  
  // Delete missing contacts
  const targetContactIds = new Set(
    record.contacts
      .map((c) => c.id)
      .filter((id) => id && !isNaN(Number(id)))
      .map(Number)
  );
  for (const ec of existingContacts) {
    if (!targetContactIds.has(ec.id)) {
      await deleteJnfContact(ec.id);
    }
  }

  // 6. ROUNDS SYNC
  const existingRoundsRes = await listJnfRounds(jnfId);
  const existingRounds = existingRoundsRes.data.selection_rounds;

  // Create / Update
  for (const round of record.selection_process.rounds) {
    const payload = mapRoundToBackendPayload(round);
    if (!round.id || isNaN(Number(round.id))) {
      if (round.round_name) {
        await createJnfRound(jnfId, payload);
      }
    } else {
      await updateJnfRound(round.id, payload);
    }
  }

  // Delete missing rounds
  const targetRoundIds = new Set(
    record.selection_process.rounds
      .map((r) => r.id)
      .filter((id) => id && !isNaN(Number(id)))
      .map(Number)
  );
  for (const er of existingRounds) {
    if (!targetRoundIds.has(er.id)) {
      await deleteJnfRound(er.id);
    }
  }

  // Finally, return the fully reconstructed record from DB
  return fetchJnfFullRecord(stringJnfId);
}

export async function fetchJnfFullRecord(jnfId: string | number): Promise<JnfRecord> {
  // Fetch massively in parallel to keep it blazing fast
  const [
    coreReq,
    contactsReq,
    eligibilityReq,
    salaryReq,
    roundsReq,
    declarationReq,
  ] = await Promise.all([
    getJnfCore(jnfId),
    listJnfContacts(jnfId),
    getJnfEligibility(jnfId),
    getJnfSalary(jnfId),
    listJnfRounds(jnfId),
    getJnfDeclaration(jnfId),
  ]);

  const coreFields = mapBackendJnfCoreToRecord(coreReq.data.jnf);

  return {
    ...coreFields,
    contacts: mapBackendContactsToRecord(contactsReq.data.contacts),
    eligibility: mapEligibilityResponseToRecord(eligibilityReq.data),
    salary_details: mapBackendSalaryToRecord(salaryReq.data.salary_packages),
    selection_process: {
      ...coreFields.selection_process,
      rounds: mapBackendRoundsToRecord(roundsReq.data.selection_rounds),
    },
    declaration: mapBackendDeclarationToRecord(declarationReq.data.declaration),
  };
}
