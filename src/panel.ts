import { setElementText } from "./utils/setElementText";
import { getStatusClass } from "./utils/getStatusClass";
import { appendEndpointButton } from "./utils/appendEndpointButton";
import { getReportTemplate } from "./utils/getReportTemplate";
import { isString } from "./utils/isString";

enum ElementSelector {
  loadButton = "#load",
  status = "#status",
  table = "#table",
}

const requests: chrome.devtools.network.Request[] = [];
const allowedResourceTypes: string[] = ["xhr", "fetch"];

const handleCreateEntriesList = async () => {
  const table = document.querySelector(ElementSelector.table);

  if (!requests.length) {
    setElementText(ElementSelector.status, "No requests available");
    table.classList.add("hidden");
    return;
  }

  setElementText(ElementSelector.status, "");

  table.classList.remove("hidden");

  setElementText(ElementSelector.status, `Entries: ${requests.length}`);

  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  tbody.innerHTML = "";

  const template = await getReportTemplate();

  requests.forEach(async (entry, index) => {
    const { status } = entry.response;
    const { method } = entry.request;

    const statusClass = getStatusClass(status);

    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr>
          <td>
            <time datetime="${entry.startedDateTime}" class="time">
              ${new Date(entry.startedDateTime).toLocaleTimeString()}
            </time>
          </td>
          <td>${method}</td>
          <td>
            <span class="status ${statusClass}">
              ${status}
            </span>
          </td>
          <td class="endpoint" id="button-${index}"></td>
        </tr>
        <tr class="hidden report ${statusClass}" id="report-${index}">
          <td colspan="4">
            <pre></pre>
          </td>
        </tr>
        `
    );

    appendEndpointButton(index, entry, template);
  });
};

(() => {
  chrome.devtools.network.onRequestFinished.addListener((request) => {
    if (isString(request._resourceType)) {
      if (allowedResourceTypes.includes(request._resourceType)) {
        requests.push(request);
      }

      return;
    }

    throw "request._resourceType value is not string";
  });

  const button = document.querySelector(ElementSelector.loadButton);

  if (!button)
    throw `Button element (#${ElementSelector.loadButton}) not found.`;

  document.addEventListener("DOMContentLoaded", () => {
    button.addEventListener("click", handleCreateEntriesList);
  });

  document.addEventListener("beforeunload", () => {
    button.removeEventListener("click", handleCreateEntriesList);
  });
})();
