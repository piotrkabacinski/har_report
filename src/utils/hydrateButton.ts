export const hydrateButton = (selector: string, callback: (...params: any[]) => void): void => {
  const button = document.querySelector(selector);

  if (!button)
    throw `Button element (${selector}) not found.`;

  button.addEventListener("click", callback);

  document.addEventListener("beforeunload", () => {
    button.removeEventListener("click", callback);
  });
}
