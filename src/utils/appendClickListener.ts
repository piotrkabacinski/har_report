export const appendClickListener = (
  selector: string,
  callback: (...params: unknown[]) => void
): void => {
  const element = document.querySelector(selector);

  if (!element) throw `Element (${selector}) not found.`;

  element.addEventListener("click", callback);

  document.addEventListener("beforeunload", () => {
    element.removeEventListener("click", callback);
  });
};
