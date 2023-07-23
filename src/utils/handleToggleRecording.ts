import { ElementSelector } from "../consts/ElementSelector"
import { state } from "./state"

const toggleRecordingDot = (): void => {
  const dot = document.querySelector<HTMLDivElement>(ElementSelector.statusDot);

  if (!dot) throw `${ElementSelector.statusDot} not found`;

  const className = "status-dot--recording";

  if (state.isRecording && !dot.classList.contains(className)) {
    dot.classList.add(className);
    return;
  }

  dot.classList.remove(className);
}

export const handleToggleRecording = (e: Event & { target: HTMLButtonElement}): void => {
  state.isRecording = !state.isRecording;

  e.target.innerText = state.isRecording ? "Pause" : "Restore";

  toggleRecordingDot();
}
