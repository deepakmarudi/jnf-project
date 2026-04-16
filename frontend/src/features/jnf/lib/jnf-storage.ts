import { getRecruiterSession } from "@/features/auth/lib/mock-auth";
import { mockJnfs } from "../data/mock-jnfs";
import { normalizeJnfRecord, normalizeJnfRecords } from "./jnf-normalize";
import type { JnfRecord } from "../types";

const STORAGE_KEY = "jnf_records";
const FLASH_KEY = "jnf_flash_message";

export type JnfFlashMessage = {
  message: string;
  severity: "success" | "info" | "error";
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function getCurrentRecruiterId() {
  return getRecruiterSession()?.recruiter_id ?? "";
}

function getAllStoredJnfs(): JnfRecord[] {
  if (!canUseStorage()) {
    return normalizeJnfRecords(mockJnfs);
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  return normalizeJnfRecords(JSON.parse(rawValue) as Partial<JnfRecord>[]);
}

function saveAllStoredJnfs(items: JnfRecord[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getStoredJnfs(): JnfRecord[] {
  const recruiterId = getCurrentRecruiterId();

  if (!recruiterId) {
    return [];
  }

  return getAllStoredJnfs().filter((item) => item.recruiter_id === recruiterId);
}

export function saveStoredJnfs(items: JnfRecord[]) {
  const recruiterId = getCurrentRecruiterId();

  if (!recruiterId) {
    return;
  }

  const remainingItems = getAllStoredJnfs().filter(
    (item) => item.recruiter_id !== recruiterId
  );

  saveAllStoredJnfs([...items, ...remainingItems]);
}

export function getStoredJnfById(id: string) {
  const recruiterId = getCurrentRecruiterId();

  if (!recruiterId) {
    return null;
  }

  return (
    getAllStoredJnfs().find(
      (item) => item.id === id && item.recruiter_id === recruiterId
    ) ?? null
  );
}

export function upsertStoredJnf(record: JnfRecord) {
  const recruiterId = getCurrentRecruiterId();

  if (!recruiterId) {
    return;
  }

  const normalizedRecord = normalizeJnfRecord({
    ...record,
    recruiter_id: record.recruiter_id || recruiterId,
  });

  const items = getAllStoredJnfs();
  const existingIndex = items.findIndex(
    (item) =>
      item.id === normalizedRecord.id &&
      item.recruiter_id === normalizedRecord.recruiter_id
  );

  if (existingIndex >= 0) {
    items[existingIndex] = normalizedRecord;
  } else {
    items.unshift(normalizedRecord);
  }

  saveAllStoredJnfs(items);
}

export function deleteStoredJnf(id: string) {
  const recruiterId = getCurrentRecruiterId();

  if (!recruiterId) {
    return;
  }

  const remainingItems = getAllStoredJnfs().filter(
    (item) => !(item.id === id && item.recruiter_id === recruiterId)
  );

  saveAllStoredJnfs(remainingItems);
}

export function createJnfId() {
  return Date.now().toString();
}

export function setJnfFlashMessage(value: JnfFlashMessage) {
  if (!canUseStorage()) {
    return;
  }

  window.sessionStorage.setItem(FLASH_KEY, JSON.stringify(value));
}

export function consumeJnfFlashMessage(): JnfFlashMessage | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(FLASH_KEY);

  if (!rawValue) {
    return null;
  }

  window.sessionStorage.removeItem(FLASH_KEY);
  return JSON.parse(rawValue) as JnfFlashMessage;
}
