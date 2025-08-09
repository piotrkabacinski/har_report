import { storageKey } from "@/consts/storageKey";
import { getDefaultReportTemplate } from "./getDefaultReportTemplate";
export const getReportTemplate = async () => {
    const storage = (await chrome.storage.local.get(storageKey));
    if (storage[storageKey] && storage[storageKey].template) {
        return storage[storageKey].template;
    }
    return getDefaultReportTemplate();
};
