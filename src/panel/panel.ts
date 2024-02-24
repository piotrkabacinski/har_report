import { appendRequestEntry } from "./appendRequest";
import { ElementSelector } from "@/consts/ElementSelector";
import { handleResetEntriesList } from "./handleResetEntriesList";
import { hydrateButton } from "@/utils/hydrateButton";
import { isString } from "@/utils/isString";
import { setEntriesAmount } from "./setEntriesAmount";
import { state } from "./state";
import { handleToggleRecording } from "./handleToggleRecording";
import { createSerializedEntry } from "./createSerializedEntry";
import "./components/StatusDot";
import "./components/SettingsLink";
import "./components/CopyButton";
import "./components/ResponseStatus";

{
  chrome.devtools.network.onRequestFinished.addListener(
    async (request): Promise<void> => {
      if (!state.isRecording) return;

      if (!isString(request._resourceType))
        throw "request._resourceType value is not string";

      if (!state.allowedResourceTypes.includes(request._resourceType)) return;

      const entry = await createSerializedEntry(request);

      const entriesAmount = state.entries.push(entry);

      appendRequestEntry(entry);

      setEntriesAmount(entriesAmount);
    }
  );

  document.addEventListener("beforeunload", () => {
    state.entries.length = 0;
  });

  document.addEventListener("DOMContentLoaded", () => {
    hydrateButton(ElementSelector.resetButton, handleResetEntriesList);
    hydrateButton(ElementSelector.pauseButton, handleToggleRecording);
  });
}
