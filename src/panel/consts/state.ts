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

let resetButton: HTMLButtonElement | null;

export const state: {
  entries: SerializedEntry[];
  isRecording: boolean;
  allowedResponseMimeTypesRegExps: RegExp[];
  allowedResourceTypes: string[];
} = {
  entries: new Proxy(entries, {
    set: function (target, property, value) {
      target[property as unknown as number] = value;

      if (!resetButton) {
        resetButton = document.querySelector<HTMLButtonElement | null>(
          ElementSelector.resetButton
        );

        if (!resetButton) return true;
      }

      if (entries.length === 0) {
        resetButton.classList.add("hidden");
      } else {
        resetButton.classList.remove("hidden");
      }

      return true;
    },
  }),
  isRecording: true,
  allowedResponseMimeTypesRegExps: [/text\/\w/, /application\/(json|csv)/],
  allowedResourceTypes: ["xhr", "fetch"],
};
