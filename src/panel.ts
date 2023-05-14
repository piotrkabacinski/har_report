import { setElementText } from "./utils/setElementText";
import { getStatusColor } from "./utils/getStatusColor";

enum ElementSelector {
  loadButton = "#load",
  status = "#status",
  table = "#table",
}

const handleCreateEntriesList = () => {
  chrome.devtools.network.getHAR(function (harLog) {
    setElementText(ElementSelector.status, "");

    const entries = harLog.entries.filter(
      (entry) =>
        entry.response.status &&
        ["xhr", "fetch"].includes(entry._resourceType as string)
    );

    const table = document.querySelector(ElementSelector.table);

    if (!entries.length) {
      setElementText(ElementSelector.status, "No entries available");
      table.classList.add("hidden");
      return;
    }

    table.classList.remove("hidden");

    setElementText(ElementSelector.status, `Entries: ${entries.length}`);

    const tbody = document.querySelector(`${ElementSelector.table} tbody`);

    tbody.innerHTML = "";

    entries.forEach((entry) => {
      const { status } = entry.response;
      const { url, method } = entry.request;

      const target = new URL(url);

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
            <span class="status ${getStatusColor(status)}">
              ${status}
            </span>
          </td>
          <td class="endpoint">
            <button class="href-button">
              ${target.href.replace(target.origin, "")}
            </button>
          </td>
        </tr>`
      );
    });
  });
};

(() => {
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
