import { appendEndpointButton } from "./appendEndpointButton";
import { ElementSelector } from "../consts/ElementSelector";

export const appendRequestEntry = (
  request: chrome.devtools.network.Request,
  index: number
): void => {
  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  const { status } = request.response;
  const { method } = request.request;

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
        <response-status status="${status}"></response-status>
      </td>
      <td class="endpoint" id="button-${index}"></td>
    </tr>
    <tr class="hidden report" id="report-${index}">
      <td colspan="4">
        <copy-button target-selector="#report-${index} pre"></copy-button>
        <pre></pre>
      </td>
    </tr>
    `
  );

  appendEndpointButton({ index, entry: request });
};
