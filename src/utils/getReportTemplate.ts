import { storageKey } from "@/consts/storageKey";
import type { Settings } from "@/types/Settings";
import { getDefaultReportTemplate } from "./getDefaultReportTemplate";

export const getReportTemplate = async () => {
  const storage = (await chrome.storage.local.get(storageKey)) as Record<
    typeof storageKey,
    Settings
  >;

  if (storage[storageKey] && storage[storageKey].template) {
    return storage[storageKey].template;
  }

  return getDefaultReportTemplate();
};
