import { ElementSelector } from "../consts/ElementSelector";
import { getReportTemplate } from "../utils/getReportTemplate";
import { handleFormSubmit } from "./handleFormSubmit";
import { hydrateButton } from "../utils/hydrateButton";
import { handleRestoreTemplate } from "./handleRestoreTemplate";
import { storageKey } from "../consts/storageKey";
import type { Settings } from "../types/Settings";

{
  const form = document.querySelector<HTMLFormElement>("form");

  if (!form) throw `Form not found`;

  form.addEventListener("submit", handleFormSubmit);

  hydrateButton(ElementSelector.restoreTemplateButton, handleRestoreTemplate);

  const textarea = document.querySelector<HTMLTextAreaElement>(
    ElementSelector.reportTemplate
  );

  if (!textarea) throw `Textarea not found`;

  (async () => {
    const storage = (await chrome.storage.local.get(storageKey)) as Record<
      typeof storageKey,
      Settings
    >;

    const template = storage[storageKey]
      ? storage[storageKey].template
      : await getReportTemplate();

    textarea.value = template;
    textarea.removeAttribute("disabled");
    textarea.setAttribute("placeholder", "Report template");
  })();
}
