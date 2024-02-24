export type SerializedEntry = {
  id: string;
  dateTime: string;
  method: string;
  status: number;
  url: string;
  report: string;
}

export const state: {
  entries: SerializedEntry[];
  isRecording: boolean;
  allowedResourceTypes: string[];
} = {
  entries: [],
  isRecording: true,
  allowedResourceTypes: ["xhr", "fetch"],
};
