export const state: {
  requests: chrome.devtools.network.Request[],
  isRecording: boolean;
  allowedResourceTypes: string[];
} = {
  requests: [],
  isRecording: true,
  allowedResourceTypes: ["xhr", "fetch"],
};

document.addEventListener("beforeunload", () => {
  state.requests.length = 0;
});
