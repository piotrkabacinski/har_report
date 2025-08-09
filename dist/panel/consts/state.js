import { ElementSelector } from "@/consts/ElementSelector";
const entries = [];
let resetButton;
export const state = {
    entries: new Proxy(entries, {
        set: function (target, property, value) {
            target[property] = value;
            if (!resetButton) {
                resetButton = document.querySelector(ElementSelector.resetButton);
                if (!resetButton)
                    return true;
            }
            if (entries.length === 0) {
                resetButton.classList.add("hidden");
            }
            else {
                resetButton.classList.remove("hidden");
            }
            return true;
        },
    }),
    isRecording: true,
    allowedResponseMimeTypesRegExps: [/text\/\w/, /application\/(json|csv)/],
    allowedResourceTypes: ["xhr", "fetch"],
};
