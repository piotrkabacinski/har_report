import { createReport } from "./createReport";

export const appendEndpointButton = (
  index: number,
  entry: chrome.devtools.network.Request,
  template: string
): void => {
  const td = document.querySelector<HTMLTableCellElement>(`#button-${index}`);

  if (!td) throw `Button not found: "#button-${index}"`;

  const button = document.createElement("button");

  const url = new URL(entry.request.url);

  button.classList.add("href-button");
  button.setAttribute("data-index", index.toString());
  button.innerText = url.href.replace(url.origin, "");

  button.addEventListener("click", async (e: PointerEvent) => {
    const index = (e.target as HTMLButtonElement).dataset.index;

    const reportTr = document.querySelector(`#report-${index}`);

    if (!reportTr) throw `Report tr not found: "#report-${index}"`;

    const reportContent = reportTr.querySelector("pre");

    if (!reportContent) throw `Report pre element not found`;

    if (!reportContent.textContent) {
      const report = await createReport(entry, template);
      reportContent.innerHTML = report;
    }

    reportTr.classList.toggle("hidden");
  });

  td.appendChild(button);
};
