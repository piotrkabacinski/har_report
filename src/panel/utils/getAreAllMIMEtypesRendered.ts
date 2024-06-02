import { storageKey } from "../../consts/storageKey";
import type { Settings } from "../../types/Settings";

export const getAreAllMIMEtypesRendered = async () => {
  const storage = (await chrome.storage.local.get(
    storageKey
  )) as unknown as Record<typeof storageKey, Settings>;

  if (storage[storageKey] && storage[storageKey].areAllMIMEtypesRendered) {
    return storage[storageKey].areAllMIMEtypesRendered === "on";
  }

  return false;
};
