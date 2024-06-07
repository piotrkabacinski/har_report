import { ElementSelector } from "@/consts/ElementSelector";
import { getDefaultReportTemplate } from "@/utils/getDefaultReportTemplate";

export const handleRestoreTemplate = async (): Promise<void> => {
  const isConfirmed = confirm(
    "Are you sure to override current template content?"
  );

  if (!isConfirmed) return;

  const template = await getDefaultReportTemplate();

  const textarea = document.querySelector<HTMLTextAreaElement>(
    ElementSelector.reportTemplate
  );

  if (!textarea) throw `Textarea element not found`;

  textarea.value = template;
};
