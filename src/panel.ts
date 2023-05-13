enum ElementSelector {
  loadButton = "#load",
  status = "#status",
  list = "#list",
}

const setElementText = (selector: string, message: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  element.innerText = message;
};

const handleCreateEntriesList = () => {
  chrome.devtools.network.getHAR(function (harLog) {
    setElementText(ElementSelector.status, "");

    if (!harLog.entries.length) {
      setElementText(ElementSelector.status, "No entries available");
      return;
    }

    setElementText(ElementSelector.status, `Entries: ${harLog.entries.length}`);

    const list = document.querySelector(ElementSelector.list);

    harLog.entries.forEach((entry) => {
      list.insertAdjacentHTML(
        "beforeend",
        `<li>
          ${new Date(entry.startedDateTime).toLocaleTimeString()}
          ${entry.request.method}
          ${entry.request.url}
          [${entry.response.status}]
        </li>`
      );
    });
  });
};

const main = () => {
  const button = document.querySelector(ElementSelector.loadButton);

  button.addEventListener("click", handleCreateEntriesList);
};

document.addEventListener("DOMContentLoaded", main);
