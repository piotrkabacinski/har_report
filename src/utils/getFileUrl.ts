export const getFileUrl = (file: string): string =>
  `chrome-extension://${chrome.runtime.id}/${file}`;
