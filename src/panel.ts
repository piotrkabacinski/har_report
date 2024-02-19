
import { appendRequestEntry } from "./utils/appendRequest";
import { ElementSelector } from "./consts/ElementSelector";
import { handleResetEntriesList } from "./utils/handleResetEntriesList";
import { hydrateButton } from "./utils/hydrateButton";
import { isString } from "./utils/isString";
import { setEntriesAmount } from "./utils/setEntriesAmount";
import { state } from "./utils/state";
import { handleToggleRecording } from "./utils/handleToggleRecording";

{
  chrome.devtools.network.onRequestFinished.addListener((request): void => {
    if (!state.isRecording) return;

    try {
      if (!isString(request._resourceType)) throw "request._resourceType value is not string";

      if (!state.allowedResourceTypes.includes(request._resourceType)) return;
  
      const entriesAmount = state.requests.push(request);
  
      appendRequestEntry(request, entriesAmount - 1);
  
      setEntriesAmount(entriesAmount);
    } catch (err) {
      document.querySelector("body").innerHTML = err.toString();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    hydrateButton(ElementSelector.resetButton, handleResetEntriesList);
    hydrateButton(ElementSelector.pauseButton, handleToggleRecording);
  });
}
