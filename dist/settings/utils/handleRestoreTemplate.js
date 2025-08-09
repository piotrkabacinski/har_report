import { ElementSelector } from "@/consts/ElementSelector";
import { getDefaultReportTemplate } from "@/utils/getDefaultReportTemplate";
export const handleRestoreTemplate = async () => {
    const isConfirmed = confirm("Are you sure to override current template content?");
    if (!isConfirmed)
        return;
    const template = await getDefaultReportTemplate();
    const textarea = document.querySelector(ElementSelector.reportTemplate);
    if (!textarea)
        throw `Textarea element not found`;
    textarea.value = template;
};
