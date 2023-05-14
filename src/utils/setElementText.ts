export const setElementText = (selector: string, message: string): void => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) throw `Element selector ${selector} not found.`;

  element.innerText = message;
};
