import { storageKey } from "../../consts/storageKey";
export const getAreAllMIMEtypesRendered = async () => {
    const storage = (await chrome.storage.local.get(storageKey));
    if (storage[storageKey] && storage[storageKey].areAllMIMEtypesRendered) {
        return storage[storageKey].areAllMIMEtypesRendered === "on";
    }
    return false;
};
