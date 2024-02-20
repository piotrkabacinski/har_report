import { ElementSelector } from "./consts/ElementSelector";
import { getDefaultReportTemplate } from "./utils/getDefaultReportTemplate";
import { handleFormSubmit } from "./utils/handleFormSubmit";
import { hydrateButton } from "./utils/hydrateButton";
import { handleRestoreTemplate } from "./utils/handleRestoreTemplate";

{
  const textarea = document.querySelector<HTMLTextAreaElement>(
    ElementSelector.reportTemplate
  );

  if (textarea) {
    getDefaultReportTemplate().then((report) => {
      textarea.value = report;
      textarea.removeAttribute("disabled");
      textarea.setAttribute("placeholder", "Report template");
    });
  }

  hydrateButton(ElementSelector.submitFormButton, handleFormSubmit);
  hydrateButton(ElementSelector.restoreTemplateButton, handleRestoreTemplate);
}
