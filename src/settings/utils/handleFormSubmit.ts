import type { Settings } from "@/types/Settings";
import { storageKey } from "@/consts/storageKey";
import { ElementSelector } from "@/consts/ElementSelector";

export const handleFormSubmit = async (
  e: SubmitEvent & { target: HTMLFormElement }
): Promise<void> => {
  e.preventDefault();

  const isValid = e.target.checkValidity();

  if (!isValid) {
    e.target.reportValidity();
    return;
  }

  const formData = new FormData(e.target);
  const formProperties = Object.fromEntries(formData) as Settings;

  await chrome.storage.local.set({ [storageKey]: formProperties });

  const submitButton = document.querySelector<HTMLButtonElement>(
    ElementSelector.submitButton
  );

  if (!submitButton) return;

  submitButton.innerText = "Saved!";
  submitButton.setAttribute("disabled", "true");

  setTimeout(() => {
    submitButton.innerText = "Save";
    submitButton.removeAttribute("disabled");
  }, 750);
};
