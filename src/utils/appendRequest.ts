import { getStatusClass } from "./getStatusClass";
import { appendEndpointButton } from "./appendEndpointButton";
import { ElementSelector } from "../consts/ElementSelector";

export const appendRequestEntry = (request: chrome.devtools.network.Request, index: number): void => {
  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  const { status } = request.response;
  const { method } = request.request;

  const statusClass = getStatusClass(status);

  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr>
      <td>
        <time datetime="${request.startedDateTime}" class="time">
          ${new Date(request.startedDateTime).toLocaleTimeString()}
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

  appendEndpointButton({ index, entry: request });
};
