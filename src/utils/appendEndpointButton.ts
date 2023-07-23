import { createReport } from "./createReport";
import { getDefaultReportTemplate } from "./getDefaultReportTemplate";
import { hydrateButton } from "./hydrateButton";

export const appendEndpointButton = ({
  index,
  entry,
}: {
  index: number;
  entry: chrome.devtools.network.Request;
}): void => {
  const td = document.querySelector<HTMLTableCellElement>(`#button-${index}`);

  if (!td) throw `Button not found: "#button-${index}"`;

  const button = document.createElement("button");

  const url = new URL(entry.request.url);

  button.classList.add("href-button");
  button.setAttribute("data-index", index.toString());
  button.innerText = url.href.replace(url.origin, "");

  const callback = async (e: PointerEvent) => {
    const index = (e.target as HTMLButtonElement).dataset.index;

    const reportTr = document.querySelector(`#report-${index}`);

    if (!reportTr) throw `Report tr not found: "#report-${index}"`;

    const reportContent = reportTr.querySelector("pre");

    if (!reportContent) throw `Report pre element not found`;

    const template = await getDefaultReportTemplate();

    if (!reportContent.textContent) {
      const report = await createReport(entry, template);
      reportContent.innerHTML = report;
    }

    reportTr.classList.toggle("hidden");
  }

  td.appendChild(button);

  hydrateButton(`#button-${index} button`, callback);
};
