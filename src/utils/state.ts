export const state: {
  requests: chrome.devtools.network.Request[],
  isRecording: boolean;
  allowedResourceTypes: string[];
} = {
  requests: [],
  isRecording: true,
  allowedResourceTypes: ["xhr", "fetch"],
};

