import { ElementSelector } from "@/consts/ElementSelector";

export type SerializedEntry = {
  id: string;
  dateTime: string;
  method: string;
  status: number;
  url: string;
  report: string;
};

const entries: SerializedEntry[] = [];

const filter: string = "";

let resetButton: HTMLButtonElement | null;

type State = {
  entries: SerializedEntry[];
  filter: string;
  isRecording: boolean;
  allowedResponseMimeTypesRegExps: RegExp[];
  allowedResourceTypes: string[];
};

export const state: State = {
  entries: new Proxy(entries, {
    set: setEntriesProxy,
  }),
  isRecording: true,
  allowedResponseMimeTypesRegExps: [/text\/\w/, /application\/(json|csv)/],
  allowedResourceTypes: ["xhr", "fetch"],
  filter,
};

function setEntriesProxy(
  target: SerializedEntry[],
  property: string | symbol,
  value: SerializedEntry,
): boolean {
  target[property as unknown as number] = value;

  if (!resetButton) {
    resetButton = document.querySelector<HTMLButtonElement | null>(
      ElementSelector.resetButton,
    );

    if (!resetButton) return true;
  }

  if (entries.length === 0) {
    resetButton.classList.add("hidden");
  } else {
    resetButton.classList.remove("hidden");
  }

  return true;
}
