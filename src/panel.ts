enum ElementSelector {
  loadButton = "#load",
  status = "#status",
  table = "#table",
}

const setElementText = (selector: string, message: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  element.innerText = message;
};

const handleCreateEntriesList = () => {
  chrome.devtools.network.getHAR(function (harLog) {
    setElementText(ElementSelector.status, "");

    const entries = harLog.entries.filter((entry) => entry.response.status);

    if (!entries.length) {
      setElementText(ElementSelector.status, "No entries available");
      return;
    }

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
            <span class="time">
              ${new Date(entry.startedDateTime).toLocaleTimeString()}
            </span>
          </td>
          <td>${method}</td>
          <td>${target.href.replace(target.origin, "")}</td>
          <td>
            <span class="${status < 400 ? "success" : "fail"}">${status}</span>
          </td>
        </tr>`
      );
    });
  });
};

const main = () => {
  const button = document.querySelector(ElementSelector.loadButton);

  button.addEventListener("click", handleCreateEntriesList);
};

document.addEventListener("DOMContentLoaded", main);
