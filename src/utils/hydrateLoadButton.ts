import { ElementSelector } from "../consts/ElementSelector";

export const hydrateButton = (selector: ElementSelector, callback: () => void) => {

  const button = document.querySelector(selector);

  if (!button)
    throw `Button element (${selector}) not found.`;

  document.addEventListener("DOMContentLoaded", () => {
    button.addEventListener("click", callback);
  });

  document.addEventListener("beforeunload", () => {
    button.removeEventListener("click", callback);
  });
}
