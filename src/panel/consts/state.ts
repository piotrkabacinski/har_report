export type SerializedEntry = {
  id: string;
  dateTime: string;
  method: string;
  status: number;
  url: string;
  report: string;
};

export const state: {
  entries: SerializedEntry[];
  isRecording: boolean;
  allowedResponseMimeTypesRegExps: RegExp[];
  allowedResourceTypes: string[];
} = {
  entries: [],
  isRecording: true,
  allowedResponseMimeTypesRegExps: [/text\/\w/, /application\/(json|csv)/],
  allowedResourceTypes: ["xhr", "fetch"],
};
