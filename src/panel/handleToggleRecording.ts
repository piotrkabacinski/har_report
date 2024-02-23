import { ElementSelector } from "../consts/ElementSelector";
import { state } from "../utils/state";

const toggleRecordingDot = (): void => {
  const statusDot = document.querySelector<HTMLElement>(
    ElementSelector.statusDot
  );

  if (!statusDot) throw `${ElementSelector.statusDot} not found`;

  statusDot.setAttribute("is-recording", state.isRecording.toString());
};

export const handleToggleRecording = (
  e: Event & { target: HTMLButtonElement }
): void => {
  state.isRecording = !state.isRecording;

  e.target.innerText = state.isRecording ? "Pause" : "Restore";

  toggleRecordingDot();
};
