import { appendRequestEntry } from "./utils/appendRequest";
import { ElementSelector } from "@/consts/ElementSelector";
import { handleResetEntriesList } from "./utils/handleResetEntriesList";
import { appendClickListener } from "@/utils/appendClickListener";
import { isString } from "./utils/isString";
import { state } from "./consts/state";
import { handleToggleRecording } from "./utils/handleToggleRecording";
import { createSerializedEntry } from "./utils/createSerializedEntry";
import "./components/StatusDot";
import "./components/SettingsLink";
import "./components/CopyButton";
import "./components/ResponseStatus";

{
  chrome.devtools.network.onRequestFinished.addListener(
    async (request): Promise<void> => {
      if (!state.isRecording) return;

      if (!isString(request._resourceType))
        throw "request._resourceType value is not a string";

      if (!state.allowedResourceTypes.includes(request._resourceType))
        throw `Resource type "${request._resourceType}" is not supported`;

      const entry = await createSerializedEntry(request);

      state.entries.push(entry);

      appendRequestEntry(entry);
    }
  );

  document.addEventListener("beforeunload", () => {
    state.entries.length = 0;
  });

  document.addEventListener("DOMContentLoaded", () => {
    appendClickListener(ElementSelector.resetButton, handleResetEntriesList);
    appendClickListener(ElementSelector.pauseButton, handleToggleRecording);
  });
}
