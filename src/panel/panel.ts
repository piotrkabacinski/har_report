import { appendRequestEntry } from "./appendRequest";
import { ElementSelector } from "../consts/ElementSelector";
import { handleResetEntriesList } from "./handleResetEntriesList";
import { hydrateButton } from "../utils/hydrateButton";
import { isString } from "../utils/isString";
import { setEntriesAmount } from "./setEntriesAmount";
import { state } from "../utils/state";
import { handleToggleRecording } from "./handleToggleRecording";
import { getFileUrl } from "../utils/getFileUrl";

{
  chrome.devtools.network.onRequestFinished.addListener((request): void => {
    if (!state.isRecording) return;

    if (!isString(request._resourceType))
      throw "request._resourceType value is not string";

    if (!state.allowedResourceTypes.includes(request._resourceType)) return;

    const entriesAmount = state.requests.push(request);

    appendRequestEntry(request, entriesAmount - 1);

    setEntriesAmount(entriesAmount);
  });

  document.addEventListener("beforeunload", () => {
    state.requests.length = 0;
  });

  document.addEventListener("DOMContentLoaded", () => {
    hydrateButton(ElementSelector.resetButton, handleResetEntriesList);
    hydrateButton(ElementSelector.pauseButton, handleToggleRecording);

    const settingsLink = document.querySelector<HTMLAnchorElement>(
      ElementSelector.settingsLink
    );

    if (settingsLink) {
      settingsLink.href = getFileUrl("settings.html");
    }
  });
}
