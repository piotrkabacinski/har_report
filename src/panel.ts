
import { isString } from "./utils/isString";
import { createHandleCreateEntriesList } from "./createHandleCreateEntriesList";
import { allowedResourceTypes } from "./consts/allowedResourceTypes";
import { ElementSelector } from "./consts/ElementSelector";

{
  const requests: chrome.devtools.network.Request[] = [];

  const handleCreateEntriesList = createHandleCreateEntriesList(requests);

  chrome.devtools.network.onRequestFinished.addListener((request) => {
    if (!isString(request._resourceType)) throw "request._resourceType value is not string";

    if (!allowedResourceTypes.includes(request._resourceType)) return;

    requests.push(request);
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
}
