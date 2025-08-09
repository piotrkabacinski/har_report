import { ElementSelector } from "@/consts/ElementSelector";
import { getReportTemplate } from "@/utils/getReportTemplate";
import { handleFormSubmit } from "./utils/handleFormSubmit";
import { appendClickListener } from "@/utils/appendClickListener";
import { handleRestoreTemplate } from "./utils/handleRestoreTemplate";
import { storageKey } from "@/consts/storageKey";
{
    const form = document.querySelector("form");
    if (!form)
        throw `Form not found`;
    form.addEventListener("submit", handleFormSubmit);
    appendClickListener(ElementSelector.restoreTemplateButton, handleRestoreTemplate);
    const textarea = document.querySelector(ElementSelector.reportTemplate);
    if (!textarea)
        throw `Textarea not found`;
    (async () => {
        const storage = (await chrome.storage.local.get(storageKey));
        const template = storage[storageKey]
            ? storage[storageKey].template
            : await getReportTemplate();
        const mimeSupportCheckbox = document.querySelector(ElementSelector.mimeSupportCheckbox);
        if (mimeSupportCheckbox) {
            const areAllMIMEtypesRendered = storage[storageKey]
                ? storage[storageKey].areAllMIMEtypesRendered === "on"
                : false;
            mimeSupportCheckbox.checked = areAllMIMEtypesRendered;
        }
        textarea.value = template;
        textarea.removeAttribute("disabled");
        textarea.setAttribute("placeholder", "Report template");
    })();
}
