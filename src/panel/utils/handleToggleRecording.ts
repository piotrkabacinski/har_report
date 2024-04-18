import { ElementSelector } from "@/consts/ElementSelector";
import { state } from "../consts/state";
import { StatusDotAttribute } from "../consts/StatusDotAttribute";

const toggleRecordingDot = (): void => {
  const statusDot = document.querySelector<HTMLElement>(
    ElementSelector.statusDot
  );

  if (!statusDot) throw `${ElementSelector.statusDot} not found`;

  statusDot.setAttribute(
    StatusDotAttribute.isRecording,
    state.isRecording.toString()
  );
};

export const handleToggleRecording = (
  e: Event & { target: HTMLButtonElement }
): void => {
  state.isRecording = !state.isRecording;

  e.target.innerText = state.isRecording ? "Pause" : "Restore";

  toggleRecordingDot();
};
