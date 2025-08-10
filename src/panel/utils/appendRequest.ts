import { appendEndpointButton } from "./appendEndpointButton";
import { ElementSelector } from "@/consts/ElementSelector";
import { state, type SerializedEntry } from "../consts/state";
import { isRowHidden } from "./filterTableRow";

export const appendRequestEntry = (entry: SerializedEntry): void => {
  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr id="tr-${entry.id}" class="${isRowHidden(entry.url, state.filter) ? "hidden" : ""}">
      <td>
        <time datetime="${entry.dateTime}" class="time">
          ${new Date(entry.dateTime).toLocaleTimeString()}
        </time>
      </td>
      <td>${entry.method}</td>
      <td>
        <response-status status="${entry.status}"></response-status>
      </td>
      <td class="endpoint" id="button-${entry.id}"></td>
    </tr>
    <tr class="hidden report" id="report-${entry.id}">
      <td colspan="4">
        <copy-button target-selector="#report-${entry.id} pre"></copy-button>
        <pre>${entry.report}</pre>
      </td>
    </tr>
    `,
  );

  appendEndpointButton(entry);
};
