
import { isString } from "./utils/isString";
import { createHandleCreateEntriesList } from "./createHandleCreateEntriesList";
import { allowedResourceTypes } from "./consts/allowedResourceTypes";
import { ElementSelector } from "./consts/ElementSelector";
import { hydrateButton } from "./utils/hydrateLoadButton";

{
  const requests: chrome.devtools.network.Request[] = [];
  let isRecording = true;

  const handleCreateEntriesList = createHandleCreateEntriesList(requests);

  const handleResetEntriesList = async () => {
    requests.length = 0;
    await handleCreateEntriesList();
  }

  chrome.devtools.network.onRequestFinished.addListener(async (request) => {
    if (!isRecording) return;

    if (!isString(request._resourceType)) throw "request._resourceType value is not string";

    if (!allowedResourceTypes.includes(request._resourceType)) return;

    requests.push(request);
  });

  hydrateButton(ElementSelector.loadButton, handleCreateEntriesList);
  hydrateButton(ElementSelector.resetButton, handleResetEntriesList);
}
